import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark') ||
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'About me', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'My Work', href: '#work' },
    { label: 'Contact me', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 px-5 z-[1000] lg:px-8 xl:px-[8%] py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme/90 dark:shadow-white/20'
            : 'bg-transparent'
        }`}
      >
        {/* Brand Name in signature Ovo font */}
        <a className="text-2xl font-bold cursor-pointer" href="#top">
          <span className="font-ovo text-3xl md:text-4xl text-neutral-900 dark:text-white">
            Manikanth
          </span>
        </a>

        {/* Center Floating Pill Navigation (Resume removed) */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 font-Ovo transition-all duration-300 ${
            isScrolled
              ? 'bg-transparent shadow-none dark:border-transparent'
              : 'bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/30 dark:bg-transparent'
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                className="hover:text-gray-500 dark:hover:text-gray-300 transition text-neutral-800 dark:text-white text-sm md:text-base font-Ovo"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions: Dark Mode Toggle & Contact Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="cursor-pointer flex items-center justify-center p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
          >
            <img
              src="/assets/moon_icon.png"
              alt="Toggle Dark Mode"
              className="w-6 dark:hidden"
            />
            <img
              src="/assets/sun_icon.png"
              alt="Toggle Light Mode"
              className="w-6 hidden dark:block"
            />
          </button>

          {/* Contact Pill Button */}
          <a
            className="hidden lg:flex items-center gap-3 px-8 py-1.5 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full ml-4 font-Ovo dark:border-white/30 text-neutral-900 dark:text-white transition"
            href="#contact"
          >
            <span>Contact</span>
            <img
              alt="Arrow Icon"
              className="w-3 dark:hidden"
              src="/assets/arrow-icon.png"
            />
            <img
              alt="Arrow Icon"
              className="w-3 hidden dark:block"
              src="/assets/arrow-icon-dark.png"
            />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="block md:hidden ml-3 focus:outline-none cursor-pointer"
            aria-label="Open navigation menu"
          >
            <img
              alt="Menu Icon"
              className="w-6 dark:hidden"
              src="/assets/menu-black.png"
            />
            <img
              alt="Menu Icon"
              className="w-6 hidden dark:block"
              src="/assets/menu-white.png"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer Navigation (Resume removed) */}
      <ul
        style={{
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(16rem)',
        }}
        className="flex md:hidden flex-col gap-4 py-20 px-10 fixed right-0 top-0 bottom-0 w-64 z-[2000] h-screen bg-rose-50 transition-transform duration-500 font-Ovo dark:bg-darkHover dark:text-white shadow-2xl"
      >
        <div
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img
            alt="Close Icon"
            className="w-5 dark:hidden"
            src="/assets/close-black.png"
          />
          <img
            alt="Close Icon"
            className="w-5 hidden dark:block"
            src="/assets/close-white.png"
          />
        </div>

        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition text-lg block py-1"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
