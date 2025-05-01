import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import Showcase from "./components/Showcase";
import TestimonialGrid from "./components/Testimoni";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <Showcase />
      <TestimonialGrid />
    </div>
  );
}
