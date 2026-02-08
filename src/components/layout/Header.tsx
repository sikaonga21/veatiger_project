import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const solutionsMenu = [
  {
    title: 'We Empower',
    subtitle: 'Productivity',
    href: '/empower',
    items: ['Microsoft 365', 'Microsoft 365 Plus', 'Exchange Online', 'Dynamics 365', 'Microsoft Copilot'],
  },
  {
    title: 'We Communicate',
    subtitle: 'Voice & Collaboration',
    href: '/communicate',
    items: ['OneVoice Calling', 'OneVoice Cloud PBX', 'OneVoice Operator Connect', 'Cloud Contact Centre'],
  },
  {
    title: 'We Connect',
    subtitle: 'Cloud Connectivity',
    href: '/connect',
    items: ['Microsoft 365 Direct', 'ExpressRoute', 'Azure Peering Service', 'AWS Direct Connect'],
  },
  {
    title: 'We Expand',
    subtitle: 'Cloud Platforms',
    href: '/expand',
    items: ['Microsoft Azure', 'Amazon Web Services', 'Google Cloud', 'Edge Platform-On-Demand'],
  },
  {
    title: 'We Secure',
    subtitle: 'Cyber Security',
    href: '/secure',
    items: ['Governance, Risk & Compliance', 'Cyber Risk Assurance', 'Cyber Defence Services', 'Cloudflare'],
  },
  {
    title: 'We Advise',
    subtitle: 'Professional Services',
    href: '/advise',
    items: ['Discovery Services', 'Planning Services', 'Deployment Services', 'Support Services'],
  },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '#', label: 'Solutions', hasDropdown: true },
  { href: '/shop', label: 'Shop Now' },
  { href: '/newsroom', label: 'Newsroom' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact an Expert' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <svg viewBox="0 0 40 40" className="w-10 h-10 text-secondary">
                <circle cx="12" cy="20" r="8" fill="currentColor" />
                <circle cx="28" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="ml-2 text-xl font-bold text-navy">
                LIQUID<span className="text-muted-foreground text-sm ml-1">Cloud & Cyber Security</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <button
                    className="nav-link flex items-center gap-1"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link to={link.href} className="nav-link">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Search */}
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Solutions Mega Menu */}
      <AnimatePresence>
        {solutionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block absolute left-0 right-0 bg-background border-b border-border shadow-lg"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <div className="container mx-auto px-4 py-8">
              <h3 className="text-lg font-semibold text-navy mb-6">Intelligent Solutions</h3>
              <div className="grid grid-cols-3 gap-8">
                {solutionsMenu.map((category) => (
                  <div key={category.title}>
                    <Link
                      to={category.href}
                      className="text-secondary font-semibold hover:underline"
                    >
                      {category.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">{category.subtitle}</p>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item}>
                          <Link
                            to="#"
                            className="text-sm text-foreground hover:text-secondary transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="py-2 text-foreground hover:text-secondary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
