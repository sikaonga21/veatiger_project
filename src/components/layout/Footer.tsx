import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Veatiger Logo" className="h-16 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-secondary-foreground/80 leading-relaxed text-sm">
              Veatiger General Dealers Limited provides top-tier services in mining support, civil engineering, and logistics across Southern Africa.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors text-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors text-primary">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="text-secondary-foreground/80 hover:text-primary transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/careers" className="text-secondary-foreground/80 hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 text-primary">Our Services</h3>
            <ul className="space-y-4 text-sm text-secondary-foreground/80">
              <li>Mining Support</li>
              <li>Transport & Logistics</li>
              <li>Civil Engineering</li>
              <li>Building Construction</li>
              <li>General Supply</li>
              <li>Hardware Supplies</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 text-primary">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80">
                  Head Office: Plot No. 251 Ngwerere Rd, Longacres - Lusaka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/80">+260 95 6431291</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/80">info@veatiger.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Veatiger General Dealers Ltd. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
