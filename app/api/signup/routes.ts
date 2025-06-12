import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nesthub",
});

export async function POST(request: Request) {
  try {
    const { fullName, email, password, phoneNumber, provider } = await request.json();

    // Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        phoneNumber VARCHAR(20),
        location VARCHAR(255),
        image VARCHAR(255),
        provider VARCHAR(20) DEFAULT 'credentials'
      )
    `);

    // Check for existing user
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password if credentials provider
    const hashedPassword = provider === "credentials" 
      ? await bcrypt.hash(password, 10) 
      : null;

    // Insert new user
    const [result]: any = await pool.query(
      `INSERT INTO users (id, name, email, password, phoneNumber, provider)
       VALUES (UUID(), ?, ?, ?, ?, ?)`,
      [fullName, email, hashedPassword, phoneNumber, provider]
    );

    return NextResponse.json(
      { 
        message: "User created successfully",
        userId: result.insertId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}