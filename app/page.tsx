"use client";

import StickyIntro from "./components/StickyIntro";
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
            <StickyIntro />
            <ArtDecoSection />
            <div className="h-[20vh] bg-secondary flex items-center justify-center">
                <div className="w-px h-24 bg-linear-to-b from-primary to-transparent opacity-30" />
            </div>
            <ArchitectureSection />
            <ArchitectureDetailsSection />
            <JoySection />
            <InteriorsSection />
            <PlansSection />
            <NewEraSection />
        </main >
    );
};

export default Home;
