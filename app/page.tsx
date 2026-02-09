"use client";

import StickyIntro from "./components/StickyIntro";
import Header from "./components/Header";
import ArtDecoSection from "./components/ArtDecoSection";
import ArchitectureSection from "./components/Architecture";
import ArchitectureDetailsSection from "./components/ArchitectureDetailSection";
import JoySection from "./components/JoySection";
import InteriorsSection from "./components/InteriorSection";
import PlansSection from "./components/ApartmentSection";
import NewEraSection from "./components/CTA";

const Home: React.FC = () => {
    return (
        <main className="relative bg-white">
            <Header />

            {/* Hero Sticky Section */}
            <StickyIntro />
            <ArtDecoSection />
            {/* Content Spacer */}
            <div className="h-[20vh] bg-white flex items-center justify-center">
                <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent opacity-30" />
            </div>

            <ArchitectureSection />
            <ArchitectureDetailsSection />
            <JoySection />
            {/* <ArtDecoSection /> */}
            <InteriorsSection />
            <PlansSection />
            <NewEraSection />
            <footer className="bg-white text-secondary py-8 border-t border-secondary/10">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-4xl font-serif mb-8 text-primary">
                            The Continental Group
                        </h3>
                        <p className="text-secondary/70 max-w-md leading-relaxed">
                            Continental Group is a community-first, legacy-driven real estate developer focused on trust, transparency, and long-term value.
                        </p>
                    </div>

                    {/* Contact Numbers */}
                    <div>
                        <h4 className="uppercase text-xs tracking-[0.3em] text-primary mb-6">
                            Call Us On
                        </h4>
                        <p className="text-secondary/70 leading-relaxed">
                            +91 (22) 6646 5253
                            <br />
                            +91 98007 25353
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <h4 className="uppercase text-xs tracking-[0.3em] text-primary mb-6">
                            Email Us
                        </h4>
                        <p className="text-secondary/70 leading-relaxed">
                            support@thecontinentalgroup.in
                        </p>

                        <p className="mt-6 text-secondary/70 leading-relaxed">
                            <span className="block uppercase text-xs tracking-[0.3em] text-primary mb-2">
                                Have Questions?
                            </span>
                            +91 98007 25353
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="container mx-auto px-6 lg:px-12 mt-4 pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-widest text-secondary/50">
                        © 2024 The Continental Group. All rights reserved.
                    </p>

                    <p className="text-[10px] uppercase tracking-widest text-secondary/50 text-center md:text-right max-w-xl">
                        Site Address: SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg,
                        Nariman Point, Mumbai, Maharashtra 400021
                    </p>
                </div>
            </footer>

        </main >
    );
};

export default Home;
