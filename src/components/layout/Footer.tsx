import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Veatiger Logo" className="h-20 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Veatiger General Dealers Limited provides top-tier services in mining support, civil engineering, and logistics across Southern Africa.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-primary hover:text-black rounded-sm transition-all duration-300 text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary hover:text-black rounded-sm transition-all duration-300 text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary hover:text-black rounded-sm transition-all duration-300 text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-white uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-primary transition-colors cursor-default">Mining Support</li>
              <li className="hover:text-primary transition-colors cursor-default">Transport & Logistics</li>
              <li className="hover:text-primary transition-colors cursor-default">Civil Engineering</li>
              <li className="hover:text-primary transition-colors cursor-default">Building Construction</li>
              <li className="hover:text-primary transition-colors cursor-default">General Supply</li>
              <li className="hover:text-primary transition-colors cursor-default">Hardware Supplies</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Head Office: Plot No. 251 Ngwerere Rd, Longacres - Lusaka
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">+260 95 6431291</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">info@veatiger.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Veatiger General Dealers Ltd. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6 text-center text-xs text-gray-600">
          <p>
            Created by{' '}
            <a 
              href="https://sikaonga.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Sikaonga
            </a>
            {' '}and{' '}
            <a 
              href="https://wazama.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Wazama
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
