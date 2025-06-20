// import ScrollGalleryBasic from "./components/gsapScroll";
import Hero from "./components/Hero";
import HorizontalScrollScene from "./components/HorizontalScrollScene";
// import FeatureSection from "./components/FeatureSection";
import CreativeIntroSection from "./components/CreativeIntro";
import Showcase from "./components/Showcase";
import PortfolioCTA from "./components/CTA";
import CustomCursor from "./components/cursor/CustomCursor";

// import TestimonialGrid from "./components/Testimoni";

export default function HomePage() {
  return (
    <div className="cursor-none">
      <CustomCursor />
      <Hero />
      <HorizontalScrollScene />
      <CreativeIntroSection />
      {/* <FeatureSection /> */}
      {/* <ScrollGalleryBasic /> */}
      <Showcase />
      <PortfolioCTA />
      {/* <TestimonialGrid /> */}
    </div>
  );
}
