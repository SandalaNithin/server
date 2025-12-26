import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Main from "../assets/Main.jpg";
import SEOWrapper from '../components/SEOWrapper';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOWrapper
        title="Contact Us"
        description="Get in touch with Lakshmi Function Hall in BuchiReddyPalem to book your event. Phone, email, and location details."
      />

      {/* Hero Header */}
      <div className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Image Grid */}
            <div className="w-full md:w-1/2 flex items-center justify-center gap-4">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                <img src={Main} alt="Hall Exterior" className="w-full h-full object-cover" />
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg mt-12 transform rotate-3 hover:rotate-0 transition-transform bg-gray-200">
                {/* Placeholder for secondary image */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs text-center p-2">
                  Event Setup Image
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Plan Your Perfect Event <span className="text-indigo-600">With Us</span>
              </h1>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Thank you for considering Lakshmi Function Hall. Our team is ready to assist you with pricing, availability, and tour scheduling.
              </p>
              <button
                onClick={() => navigate("/booking")}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
              >
                Book Online Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info & Map */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Get In Touch</h2>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Contact Details */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition">
              <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Phone</p>
                <a href="tel:7981862253" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition">
                  +91 79818 62253
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition">
              <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Email</p>
                <a href="mailto:Lakshmifunctionhall@gmail.com" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition break-all">
                  Lakshmifunctionhall@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition">
              <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Address</p>
                <p className="text-lg font-medium text-gray-900">
                  Ramakrishnanager, BuchiReddyPalem,<br /> Nellore, A.P., India
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2 h-[500px] bg-white p-4 rounded-2xl shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.610667!2d79.875!3d14.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c922a8a8209b3%3A0x8a1a4e32b6e4c59e!2sS%20S%20Kalyana%20Mandapam!5e0!3m2!1sen!2sin!4v1761805294698!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}