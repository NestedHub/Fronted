// components/Header.tsx
import { FaHeart } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';

export default function Header() {
  return (
    <header className="bg-[#344f24] text-white px-6 py-3 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <img src="/logo.png" alt="NestedHub Logo" className="h-10" />

          {/* Navigation */}
          <nav className="flex space-x-6 text-lg font-light">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="" className="hover:text-gray-300">Rent</a>
            <a href="/about_us" className="hover:text-gray-300">About us</a>
            <a href="#" className="hover:text-gray-300">FAQ</a>
          </nav>
        </div>

        {/* Right side: Language, Favorites, User */}
        <div className="flex items-center space-x-6 text-sm">
          {/* Language selector */}
          <div className="flex items-center space-x-1">
            <img src="/flags/uk.png" alt="English" className="h-4 w-6 object-cover" />
            <span>English</span>
            <MdArrowDropDown />
          </div>

          {/* Favorite icon */}
          <FaHeart className="text-white text-lg hover:text-red-400" />

          {/* User profile */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-gray-300" />
            <div>
              <div className="text-sm">Nara</div>
              <div className="text-xs text-gray-300">User</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
