"use client";

import Breadcrumb from "../components/Breadcrumb";
import { AptSection } from "../components/heights/AptSection";
import { CardSection } from "../components/heights/CardSection";
import { AvailabilitySection } from "../components/heights/StoreSection";
import { StyleSection } from "../components/heights/StyleSection";
import { TeamSection } from "../components/heights/TeamSection";
import { TechnologySection } from "../components/heights/TechnologySection";

function Life() {
  return (
    <div>
      <Breadcrumb
        title="Continental Heights"
        backgroundImage="/assets/images/horizon/horizon-2.png"
      />
      <StyleSection/>
      <CardSection/>
      <AptSection/>
      <TechnologySection/>
      <AvailabilitySection/>
      <TeamSection/>
    </div>
  );
}

export default Life;
