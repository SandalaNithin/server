import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, UtensilsCrossed, Camera, Music } from "lucide-react";
import Hall from "../assets/Hall.jpg";
import Wedinghall from "../assets/Wedinghall.jpg";
import Birthday from "../assets/Birthday.jpg";
import Events from "../assets/Events.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEOWrapper from "../components/SEOWrapper";

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [Hall, Wedinghall, Birthday, Events];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const services = [
    { icon: Sparkles, name: "Decoration", desc: "Custom themes & beautiful floral arrangements" },
    { icon: UtensilsCrossed, name: "Catering", desc: "Exquisite multi-cuisine menu options" },
    { icon: Camera, name: "Photography", desc: "Capturing your moments with cinematic quality" },
    { icon: Music, name: "Entertainment", desc: "High-quality sound systems & DJ setups" },
  ];

  const events = [
    { title: "Wedding", image: Wedinghall, desc: "A fairy-tale setting for your big day." },
    { title: "Birthday", image: Birthday, desc: "Joyful celebrations for all ages." },
    { title: "Events", image: Events, desc: "Corporate meets, anniversaries & more." },
  ];

  const handleBookNow = () => navigate("/booking");

  return (
    <div className="relative font-sans text-gray-900">
      <SEOWrapper
        title="Home"
        description="Book Lakshmi Function Hall for Weddings, Birthdays, and Corporate Events in BuchiReddyPalem, Nellore. Premium amenities and exceptional service."
        keywords="function hall, banquet hall, wedding venue, nellore, buchireddypalem, events"
      />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            loading="eager" // Hero image should load immediately
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl"
          >
            Lakshmi Function Hall
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-2xl lg:text-3xl mb-8 font-light drop-shadow-md max-w-2xl"
          >
            Bring the Vibe, We’ll Bring the Magic
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={handleBookNow}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl"
          >
            Book Your Event Now
          </motion.button>
        </div>

        {/* Sliders */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-20"
          aria-label="Next Slide"
        >
          <ChevronRight size={32} />
        </button>
      </section>

      {/* About Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Luxury
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              At Lakshmi Function Hall, we blend tradition with modern elegance. From intimate gatherings to grand celebrations, our venue is designed to be the perfect backdrop for your most cherished memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={Hall}
                alt="Main Hall View"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Elegant Interiors</h3>
                  <p className="text-gray-600">Spacious, air-conditioned halls with customizable lighting and décor options.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Premium Ambiance</h3>
                  <p className="text-gray-600">Designed for comfort and style, ensuring a premium experience for every guest.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Showcase */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perfect for Every Occasion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                  <p className="text-gray-600">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">All-Inclusive Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="group p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-20 h-20 bg-white group-hover:bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md transition-colors duration-300">
                    <Icon size={32} className="text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-900 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Create Memories?</h2>
          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
            Book your date today and let us handle the rest. Your perfect event starts here.
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Start Booking
          </button>
        </div>
      </section>
    </div>
  );
}
