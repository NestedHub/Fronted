import mysql from "mysql2/promise";

let pool = null;

// Retry logic for database operations
async function executeWithRetry(query, params, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      if (error.code === "ER_CON_COUNT_ERROR" && attempt < retries) {
        console.warn(`Attempt ${attempt} failed with Too Many Connections error, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay)));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}

export async function initializeDatabase() {
  if (pool) return;

  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "nesthub",
      waitForConnections: true,
      connectionLimit: 20, // Increased from 10 to handle more requests
      queueLimit: 0,
      connectTimeout: 10000,
      maxIdle: 10, // Max idle connections
      idleTimeout: 60000, // Close idle connections after 60s
    });

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        phoneNumber VARCHAR(20),
        location VARCHAR(255),
        image VARCHAR(255),
        provider VARCHAR(20) DEFAULT 'credentials'
      )
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

const db = {
  async findUserByEmail(email) {
    if (!pool) await initializeDatabase();
    try {
      const rows = await executeWithRetry(
        "SELECT id, name, email, phoneNumber, location, image, provider, password FROM users WHERE email = ?",
        [email]
      );
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  async findUserById(id) {
    if (!pool) await initializeDatabase();
    try {
      const rows = await executeWithRetry(
        "SELECT id, name, email, phoneNumber, location, image, provider FROM users WHERE id = ?",
        [id]
      );
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw error;
    }
  },

  async createUser(user) {
    if (!pool) await initializeDatabase();
    try {
      const [result] = await pool.execute(
        "INSERT INTO users (name, email, password, phoneNumber, location, image, provider) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          user.name,
          user.email,
          user.password || null,
          user.phoneNumber || null,
          user.location || null,
          user.image || null,
          user.provider || "credentials",
        ]
      );
      const insertedId = result.insertId || null;
      return insertedId ? await this.findUserById(insertedId) : null;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async closePool() {
    if (pool) {
      await pool.end();
      pool = null;
      console.log("Database connection pool closed");
    }
  },

  initializeDatabase,
};

export default db;