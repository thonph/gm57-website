import React from "react";
import Header from "./header/page";
import SolutionSection from "./solutions_section/page";
import FeaturesSection from "./features_seciton/page";
import StrengthsSection from "./strengths_section/page";
import OpportunitiesSection from "./opportunities_seciton/page";
import Contact from "./contact/page";
import HomeSection from "./home_section/page";
import Footer from "./footer/page";

export default function Home() {
  return (
    <>
      <Header />
      <HomeSection />
      <SolutionSection />
      <FeaturesSection />
      <StrengthsSection />
      <OpportunitiesSection />
      <Contact />
      <Footer />
    </>
  );
}
