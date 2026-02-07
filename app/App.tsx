import React from "react";
import StickyIntro from "./components/StickyIntro";
import Header from "./components/Header";
import ArtDecoSection from "./components/ArtDecoSection";
import ArchitectureSection from "./components/Architecture";
import ArchitectureDetailsSection from "./components/ArchitectureDetailSection";
import JoySection from "./components/JoySection";
import "@/app/globals.css";
import InteriorsSection from "./components/InteriorSection";
import PlansSection from "./components/ApartmentSection";
import NewEraSection from "./components/CTA";
import "@/app/globals.css"
const App: React.FC = () => {
  return (
    <main className="relative bg-white">
      <Header />

      {/* Hero Sticky Section */}
      <StickyIntro />
      <ArtDecoSection />
      {/* Content Spacer */}
      <div className="h-[20vh] bg-white flex items-center justify-center">
        <div className="w-px h-24 bg-gradient-to-b from-[#ca8c19] to-transparent opacity-30" />
      </div>

      <ArchitectureSection />
      <ArchitectureDetailsSection />
      <JoySection/>
            {/* <ArtDecoSection /> */}
      <InteriorsSection />
      <PlansSection />
      <NewEraSection />
      <footer className="bg-white text-[#825541] py-8 border-t border-[#825541]/10">
  <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
    
    {/* Brand */}
    <div className="col-span-1 md:col-span-2">
      <h3 className="text-4xl font-serif mb-8 text-[#ca8c19]">
        The Continental Group
      </h3>
      <p className="text-[#825541]/70 max-w-md leading-relaxed">
        Crafting timeless developments rooted in integrity, legacy, and
        thoughtful design, creating enduring value across generations.
      </p>
    </div>

    {/* Contact Numbers */}
    <div>
      <h4 className="uppercase text-xs tracking-[0.3em] text-[#ca8c19] mb-6">
        Call Us On
      </h4>
      <p className="text-[#825541]/70 leading-relaxed">
        +91 (22) 6646 5253
        <br />
        +91 98007 25353
      </p>
    </div>

    {/* Email */}
    <div>
      <h4 className="uppercase text-xs tracking-[0.3em] text-[#ca8c19] mb-6">
        Email Us
      </h4>
      <p className="text-[#825541]/70 leading-relaxed">
        support@thecontinentalgroup.in
      </p>

      <p className="mt-6 text-[#825541]/70 leading-relaxed">
        <span className="block uppercase text-xs tracking-[0.3em] text-[#ca8c19] mb-2">
          Have Questions?
        </span>
        +91 98007 25353
      </p>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="container mx-auto px-6 lg:px-12 mt-4 pt-8 border-t border-[#825541]/10 flex flex-col md:flex-row justify-between items-center gap-6">
    <p className="text-[10px] uppercase tracking-widest text-[#825541]/50">
      © 2024 The Continental Group. All rights reserved.
    </p>

    <p className="text-[10px] uppercase tracking-widest text-[#825541]/50 text-center md:text-right max-w-xl">
      Site Address: SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg,  
      Nariman Point, Mumbai, Maharashtra 400021
    </p>
  </div>
</footer>

    </main>
  );
};

export default App;
