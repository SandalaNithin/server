import React from 'react';
import { Heart, Users, Award, Diamond } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';

export default function AboutUs() {
  const features = [
    {
      icon: Diamond,
      title: 'Versatile Elegance',
      description: 'Our thoughtfully designed spaces adapt seamlessly to any occasion, offering both grandeur and intimacy exactly when you need it.',
    },
    {
      icon: Award,
      title: 'Uncompromising Quality',
      description: 'From state-of-the-art facilities to carefully curated amenities, every detail is crafted with excellence in mind.',
    },
    {
      icon: Users,
      title: 'Dedicated Service',
      description: 'Our experienced team works tirelessly to ensure your event unfolds flawlessly, allowing you to be fully present.',
    },
    {
      icon: Heart,
      title: 'Complete Solutions',
      description: 'Comprehensive event support from planning and coordination to catering and decoration.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOWrapper
        title="About Us"
        description="Learn about Lakshmi Function Hall's story, values, and commitment to making your events unforgettable."
      />

      {/* Hero Section */}
      <div className="bg-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 pattern-grid-lg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            About Lakshmi Function Hall
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto font-light">
            Where Every Celebration Finds Its Perfect Home
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Introduction */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <p className="text-xl text-gray-700 leading-relaxed">
            At Lakshmi Function Hall, we believe that life's most cherished moments deserve extraordinary spaces. Whether you're celebrating a wedding, hosting a corporate event, or gathering loved ones for a milestone occasion, we provide the perfect backdrop for memories that last a lifetime.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-indigo-600 pl-4">Our Story</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Lakshmi Function Hall was born from a simple yet profound realization: every celebration is unique, and the venue should reflect that individuality. What began as a dream to create versatile, elegant spaces has blossomed into a premier destination.
              </p>
              <p>
                Founded on the principles of hospitality, attention to detail, and genuine care for our clients, we've transformed countless visions into reality.
              </p>
            </div>
          </div>
          <div className="bg-indigo-100 rounded-2xl p-8 h-full flex items-center justify-center">
            {/* Placeholder for an About Image if needed, or maintain the clean text look */}
            <div className="text-indigo-800 text-center">
              <Heart size={64} className="mx-auto mb-4 opacity-50" />
              <p className="font-serif italic text-2xl">"Creating Memories, Celebrating Life"</p>
            </div>
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Icon className="text-indigo-600" size={28} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Celebration Awaits</h2>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Come visit us, explore our spaces, and let's begin creating something beautiful together.
          </p>
          <a href="/contact" className="inline-block bg-white text-indigo-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
}