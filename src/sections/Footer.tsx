import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function SoloPharmaLogoLight({ className = '' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="SoloPharma Logo"
      className={`${className} object-contain`}
    />
  );
}

export function Footer() {
  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/products' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const categories = ['Skin Care', 'Body Care', 'Face Care', 'Oral Care', 'Personal Care'];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/citypharmaeg?mibextid=b06tZ0', label: 'Facebook', color: '#1877f2' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1da1f2' },
    { icon: Instagram, href: 'https://www.instagram.com/solopharma?igshid=MzRlODBiNWFlZA%3D%3D', label: 'Instagram', color: '#e1306c' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0077b5' },
  ];

  return (
    <footer id="contact" className="bg-[#030f1e] text-white relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0077b6] via-[#00b4d8] to-[#0077b6]" />
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0077b6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Newsletter strip */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0077b6]/20 to-[#00b4d8]/10 rounded-2xl px-8 py-6 border border-white/5">
            <div>
              <h3 className="text-xl font-bold text-white">Stay in the know</h3>
              <p className="text-slate-400 text-sm mt-1">Get new products & exclusive deals delivered to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00b4d8] transition-colors"
              />
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-opacity">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <SoloPharmaLogoLight className="h-20 w-auto" />
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner in pharmaceutical cosmetics. Committed to quality,
              safety, and your well-being since 2009.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/20 hover:bg-white/10 transition-all group"
                >
                  <social.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00b4d8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${encodeURIComponent(category)}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00b4d8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#0077b6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#38bdf8]" />
                </div>
                <a href="https://www.google.com/maps/place/Solopharma/@30.0045124,31.2022084,21z/data=!4m6!3m5!1s0x145847996b57e86f:0x931a4fe78956d2fd!8m2!3d30.0045713!4d31.2022614!16s%2Fg%2F11tdlfyz1w?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm leading-relaxed transition-colors">
                  4B bank misr buildings , Khatem el Morsalin,<br />Giza, Egypt
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0077b6]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#38bdf8]" />
                </div>
                <a href="https://wa.me/201000889707" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-colors">
                  +201000889707
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0077b6]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#38bdf8]" />
                </div>
                <a href="mailto:info@esolopharma.com" className="text-slate-400 hover:text-white text-sm transition-colors">
                  info@esolopharma.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} SoloPharma. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
