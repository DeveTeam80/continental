"use client";
import HeroSection from "../components/about/HeroSection";
import PrinciplesSection from "../components/about/Principles";
import PlansSection from "../components/ApartmentSection";

function About() {
  return (
    <main className="relative bg-white">
      <HeroSection/>
      <PrinciplesSection/>
      <PlansSection/>
    </main>
  );
}

export default About;
