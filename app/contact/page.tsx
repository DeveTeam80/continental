"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, ChevronRight, Mail } from "lucide-react";
import SimpleMap from "../components/Map";

const ContactsSection: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // integrate API call here
  };

  return (
    <section className="relative bg-secondary text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container-h pt-6 max-w-7xl mx-auto">
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Side */}
          <div className="md:col-span-7 flex flex-col gap-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <div className="relative">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="text-[7vw] font-serif uppercase leading-none text-gradient-gold text-right pointer-events-none"
                >
                  Contact Us
                </motion.h2>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {/* Phone Numbers */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase flex items-center gap-2">
                  <Phone size={12} className="text-accent" />
                  Call Us On
                </span>
                <p className="text-lg font-light hover:text-accent transition-colors cursor-pointer">
                  +91 (22) 6646 5253
                </p>
                <p className="text-lg font-light hover:text-accent transition-colors cursor-pointer">
                  +91 98007 25353
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase flex items-center gap-2">
                  <Mail size={12} className="text-accent" />
                  Email Us
                </span>
                <p className="text-lg font-light hover:text-accent transition-colors cursor-pointer">
                  wecare@continental-group.in
                </p>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase flex items-center gap-2">
                  <MapPin size={12} className="text-accent" />
                  Corporate Address
                </span>
                <p className="text-lg font-light max-w-xl leading-relaxed">
                  SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg, Nariman Point,
                  Mumbai, Maharashtra 400021
                </p>
              </div>
              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-xl border border-white/15 py-4 px-8 md:p-10 rounded-sm backdrop-blur-sm bg-white/5"
              >
                <div className="space-y-8">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase text-white/40">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-accent transition-colors text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase text-white/40">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-accent transition-colors text-white"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase text-white/40">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-accent transition-colors text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="relative p-px rounded-full bg-gradient-gold group hover:scale-[1.04] transition-transform duration-500 hidden md:block">
                    <button className="w-full h-full px-6 py-2.5 rounded-full bg-secondary text-white text-xs font-medium uppercase tracking-wider group-hover:bg-accent group-hover:text-secondary transition-colors duration-500">
                      Submit
                    </button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:col-span-5 flex justify-end -mb-6"
          >
            <img
              src="/assets/images/horizon/horizon.png"
              alt="Continental Group"
              className="w-full max-w-md object-contain"
            />
          </motion.div>
        </div>
      </div>

      <SimpleMap />

      {/* Background Architectural Pattern */}
      <div className="absolute left-[-10%] bottom-0 w-[40vw] aspect-square pointer-events-none opacity-[0.03]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1442 721"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1441 0C1441 132.549 1333.55 240 1201 240M1201 240C1333.55 240 1441 347.451 1441 480"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
};

export default ContactsSection;
