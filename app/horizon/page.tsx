"use client";

import Breadcrumb from "../components/Breadcrumb";
import NewEraSection from "../components/CTA";
import { CardSection } from "../components/heights/CardSection";
import { TeamSection } from "../components/heights/TeamSection";
import { BacklightSection } from "../components/horizon/BackLightSection";
import { HorizonHeadSection } from "../components/horizon/HorizonHeadSection";
import InteriorCarousel from "../components/horizon/InteriorCarousel";
import { InteriorsSection } from "../components/horizon/InteriorSection";

function Horizon() {
  return (
    <div>
      <Breadcrumb
        title="Continental Horizon"
        backgroundImage="/assets/images/horizon/horizon-2.png"
      />
      <HorizonHeadSection />
      <BacklightSection />
      <CardSection />
      <InteriorsSection />
      <InteriorCarousel />
      <TeamSection />
      <NewEraSection />
    </div>
  );
}

export default Horizon;
