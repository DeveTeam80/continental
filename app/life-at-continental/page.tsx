"use client";

import Breadcrumb from "../components/Breadcrumb";
import ChildhoodSection from "../components/life/ChildhoodSection";
import ImageMasonary from "../components/life/ImageMasonary";
import LifeSection from "../components/life/LifeSection";

function Life() {
  return (
    <div>
      <Breadcrumb
        title="Life at Continental"
        backgroundImage="/assets/images/horizon/horizon-2.png"
      />
      <LifeSection />
      <ImageMasonary/>
      <ChildhoodSection/>
    </div>
  );
}

export default Life;
