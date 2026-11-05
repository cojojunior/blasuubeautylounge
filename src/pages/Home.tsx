import { Hero } from "../components/sections/Hero";
import { FeaturedTreatments } from "../components/sections/FeaturedTreatments";
import { Benefits } from "../components/sections/Benefits";
import { ReviewsPreview } from "../components/sections/ReviewsPreview";
import { LocationSection } from "../components/sections/LocationSection";
import { ContactCTA } from "../components/sections/ContactCTA";

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedTreatments />
      <Benefits />
      <ReviewsPreview />
      <LocationSection />
      <ContactCTA />
    </div>
  );
}
