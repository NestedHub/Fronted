// components/Footer.tsx
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side */}
        <div>
          <img src="/logo.png" alt="NestedHub Logo" className="w-32 mb-4" />
          <div className="text-sm space-y-1">
            <p><strong>Customer support:</strong> contact@nestedhub.com</p>
            <p><strong>Email:</strong> romdul@gmail.com</p>
            <p><strong>Contact number:</strong> 097668876</p>
            <p><strong>Location:</strong> Royal University of Phnom Penh, Russian Federation Blvd (110)</p>
          </div>
          <div className="flex space-x-4 mt-4 text-2xl text-blue-600">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram className="text-pink-600" /></a>
            <a href="#"><FaTelegram className="text-sky-500" /></a>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end text-sm space-y-2">
          <p className="text-lg font-semibold">Discover your dream home with <span className="text-black">NestedHub</span></p>
          <div className="border-t w-full mt-4"></div>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:underline">HOME</a>
            <a href="#" className="hover:underline">RENT</a>
            <a href="#" className="hover:underline">SALES</a>
            <a href="#" className="hover:underline">ABOUT US</a>
            <a href="#" className="hover:underline">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
