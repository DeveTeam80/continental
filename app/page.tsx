"use client";

import StickyIntro from "./components/StickyIntro";
import ArtDecoSection from "./components/ArtDecoSection";
import ArchitectureSection from "./components/Architecture";
import ArchitectureDetailsSection from "./components/ArchitectureDetailSection";
import JoySection from "./components/JoySection";
import InteriorsSection from "./components/InteriorSection";
import PlansSection from "./components/ApartmentSection";
import NewEraSection from "./components/CTA";
import SectionTransition from "./components/SectionTransition";
import { INTERIOR_SLIDES } from "@/constants";

const Home: React.FC = () => {
    return (
        <main className="relative bg-white">
            <StickyIntro />
            <SectionTransition zIndex={1}>
                <ArtDecoSection />
                <div className="h-[20vh] bg-secondary flex items-center justify-center">
                    <div className="w-px h-24 bg-linear-to-b from-primary to-transparent opacity-30" />
                </div>
            </SectionTransition>
            <div style={{ position: "relative", zIndex: 2 }}>
                <ArchitectureSection />
            </div>
            <ArchitectureDetailsSection />
            <JoySection />
            <InteriorsSection
                slides={INTERIOR_SLIDES}
                autoplayDelay={5000}
                slideWidthVW={60}
            />
            <PlansSection />
            <NewEraSection />
        </main>
    );
};

export default Home;
