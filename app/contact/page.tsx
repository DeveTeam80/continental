"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, ChevronRight, Mail } from "lucide-react";
import Script from "next/script";
import dynamic from 'next/dynamic';

const SimpleMap = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-112.5 rounded-lg overflow-hidden bg-secondary/50 animate-pulse" />
  )
});

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

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <div className="ghl-form-wrapper">
                  <iframe
                    src="https://app.visionarybizz.com/widget/form/UCNmegomf6n4R9e3tZDr"
                    style={{
                      width: "100%",
                      height: "500px",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    id="inline-UCNmegomf6n4R9e3tZDr"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-activation-type="alwaysActivated"
                    data-deactivation-type="neverDeactivate"
                    data-form-name="Contact Form - Website"
                    data-height="492"
                    data-layout-iframe-id="inline-UCNmegomf6n4R9e3tZDr"
                    data-form-id="UCNmegomf6n4R9e3tZDr"
                    title="Contact Form - Website"
                  />
                </div>

                <Script
                  src="https://app.visionarybizz.com/js/form_embed.js"
                  strategy="lazyOnload"
                />
              </motion.div>
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
