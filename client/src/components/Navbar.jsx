import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from '../assets/portfolio logo 2.png'; // adjust path as needed


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-30 px-6 py-4 flex items-center justify-between bg-darkOverlay/80 backdrop-blur-md text-white shadow-md">
        {/* Left: Logo / Brand */}
        <NavLink to="/" className="inline-block">
          <img src={logo} alt="Logo" className="h-10 w-auto rounded-lg" />
        </NavLink>

        {/* Center: Desktop Nav Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 items-center">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-accent font-medium border-b-2 border-accent pb-1"
                  : "text-white hover:text-accent transition"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right: Social Icons + Theme Toggle (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <a
            href="https://github.com/prathikbp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/prathik-bp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/shot_from_my_lens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition"
          >
            <Instagram size={24} />
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-white/10 hover:bg-accent hover:text-white transition rounded-md text-sm text-white"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>

        {/* Hamburger Button - Mobile */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-darkOverlay/90 backdrop-blur-md flex flex-col items-center space-y-4 py-6 z-20">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="text-white hover:text-accent text-lg transition"
            >
              {label}
            </NavLink>
          ))}
          <div className="flex space-x-6 mt-4">
            <a
              href="https://github.com/prathikbp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/prathik-b-p-26b2771a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.instagram.com/shot_from_my_lens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition"
            >
              <Instagram size={24} />
            </a>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-accent hover:text-white transition rounded-md text-sm text-white"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>
      )}
    </>
  );
}
