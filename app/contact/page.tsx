"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ChevronRight, Mail } from 'lucide-react';
import SimpleMap from "../components/Map";

const ContactsSection: React.FC = () => {
  return (
    <section className="relative bg-secondary text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container-h px-6 max-w-7xl mx-auto">
        
        {/* Top Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <div className="relative">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-[7vw] font-serif uppercase leading-none text-gradient-gold text-right pointer-events-none"
            >Contact Us
            </motion.h2>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
          
          {/* Left Side */}
          <div className="md:col-span-7 flex flex-col gap-12">

            {/* Contact Info */}
            <div className="flex flex-col gap-10">

              {/* Phone Numbers */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase flex items-center gap-2">
                  <Phone size={12} className="text-[#cf8f7d]" />
                  Call Us On
                </span>
                <p className="text-lg font-light hover:text-[#cf8f7d] transition-colors cursor-pointer">
                  +91 (22) 6646 5253
                </p>
                <p className="text-lg font-light hover:text-[#cf8f7d] transition-colors cursor-pointer">
                  +91 98007 25353
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase flex items-center gap-2">
                  <Mail size={12} className="text-[#cf8f7d]" />
                  Email Us
                </span>
                <p className="text-lg font-light hover:text-[#cf8f7d] transition-colors cursor-pointer">
                  wecare@continental-group.in
                </p>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase flex items-center gap-2">
                  <MapPin size={12} className="text-[#cf8f7d]" />
                  Corporate Address
                </span>
                <p className="text-lg font-light max-w-xl leading-relaxed">
                  SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg,  
                  Nariman Point, Mumbai, Maharashtra 400021
                </p>
              </div>

            </div>
          </div>

          {/* Right Side CTA */}
          {/* <div className="md:col-span-5 flex justify-end">
             <button className="group flex items-center gap-6 px-12 py-6 border border-white/20 rounded-sm hover:bg-white hover:text-[#051936] transition-all duration-500">
                <span className="text-xs font-bold tracking-[0.4em] uppercase">Request a Consultation</span>
                <div className="w-12 h-px bg-[#cf8f7d] group-hover:w-16 transition-all" />
             </button>
          </div> */}

        </div>
      </div>

      <SimpleMap/>

      {/* Background Architectural Pattern */}
      <div className="absolute left-[-10%] bottom-0 w-[40vw] aspect-square pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" viewBox="0 0 1442 721" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1441 0C1441 132.549 1333.55 240 1201 240M1201 240C1333.55 240 1441 347.451 1441 480" stroke="white" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
};

export default ContactsSection;
