import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12 text-white">
                <circle cx="12" cy="20" r="8" fill="currentColor" />
                <circle cx="28" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white">LIQUID</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/LiquidCloudAfrica"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/C2Africa_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/showcase/liquid-cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="hover:underline">
              Privacy Notice
            </Link>
            <Link to="/cookies" className="hover:underline">
              Cookies Policy
            </Link>
          </div>
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">A business of</span>
            <span className="font-semibold">Cassava Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
