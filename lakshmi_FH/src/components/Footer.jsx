import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
    { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaWhatsapp, url: 'https://wa.me/9347314512', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-gray-100 mt-0 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Floating Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3 z-50">
          <a
            href="https://wa.me/9347314512"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={32} />
          </a>
          <a
            href="tel:+9347314512"
            className="bg-amber-500 hover:bg-amber-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
            aria-label="Call Us"
          >
            <Phone size={28} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                L
              </div>
              <span className="font-bold text-2xl text-gray-800 tracking-tight">Lakshmi Function Hall</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm mx-auto md:mx-0">
              Lakshmi Function Hall has been a trusted name in the industry, creating unforgettable memories for every celebration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-6 text-gray-900">Follow Us</h3>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-12 h-12 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-gray-100"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-indigo-600 font-semibold">Lakshmi Function Hall</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
