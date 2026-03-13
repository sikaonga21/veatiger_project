import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass, CaretDown } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
};

const navLinks: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    label: 'What We Offer',
    children: [
      { href: '/services', label: 'Services' },
      { href: '/commodities', label: 'Commodities' },
    ],
  },
  { href: '/projects', label: 'Projects' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
];

const DropdownMenu = ({ items, visible }: { items: { href: string; label: string }[]; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18 }}
        className="absolute top-full left-0 mt-2 min-w-[180px] bg-black border border-white/10 shadow-xl z-50"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block px-6 py-3 text-sm font-medium uppercase tracking-wider text-white/80 hover:text-primary hover:bg-white/5 transition-colors duration-200 font-heading border-b border-white/5 last:border-0"
          >
            {item.label}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Veatiger Logo"
              className={`h-28 lg:h-40 w-auto object-contain transition-all duration-500 ${
                scrolled ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.children) {
                const isOpen = openDropdown === link.label;
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 text-base font-medium uppercase tracking-wider font-heading text-white"
                      onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    >
                      {link.label}
                      <CaretDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        weight="bold"
                      />
                    </button>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    <DropdownMenu items={link.children} visible={isOpen} />
                  </div>
                );
              }

              return (
                <div key={link.label} className="relative group">
                  <Link
                    to={link.href!}
                    className="text-base font-medium uppercase tracking-wider font-heading text-white"
                  >
                    {link.label}
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </div>
              );
            })}

            {/* Search */}
            <button className="p-2 rounded-full transition-colors group">
              <MagnifyingGlass className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
            </button>

            {/* CTA Button */}
            <Link to="/contact" className="btn-primary text-sm">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-8 h-8" weight="bold" />
            ) : (
              <List className="w-8 h-8" weight="bold" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.children) {
                  const isExpanded = mobileExpanded === link.label;
                  return (
                    <div key={link.label}>
                      <button
                        className="w-full flex items-center justify-between py-3 text-lg font-bold uppercase tracking-wider font-heading text-white border-b border-white/10"
                        onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                      >
                        {link.label}
                        <CaretDown
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          weight="bold"
                        />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-white/5"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="block py-3 pl-6 text-base font-medium uppercase tracking-wider text-white/70 hover:text-primary border-b border-white/5 last:border-0 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href!}
                    className="py-3 text-lg font-bold uppercase tracking-wider font-heading text-white border-b border-white/10 last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="py-3 text-lg font-bold uppercase tracking-wider font-heading text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
