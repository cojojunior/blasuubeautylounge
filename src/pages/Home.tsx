import { Hero } from "../components/sections/Hero";
import { FeaturedTreatments } from "../components/sections/FeaturedTreatments";
import { Benefits } from "../components/sections/Benefits";
import { ReviewsPreview } from "../components/sections/ReviewsPreview";
import { LocationSection } from "../components/sections/LocationSection";
import { ContactCTA } from "../components/sections/ContactCTA";
import { ShopByCategory } from "../components/sections/ShopByCategory";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../config/site";

export function Home() {
  return (
    <div className="flex flex-col">
      <Seo
        title="Luxury Beauty & Spa in Accra"
        description="Experience the pinnacle of beauty and wellness in Madina, Accra. Book manicures, pedicures, facials, and massages at Blasuu Beauty Lounge."
        url={`${siteConfig.url}/`}
      />
      <Hero />

      <ShopByCategory />

      <FeaturedTreatments />
      <Benefits />
      <ReviewsPreview />
      <LocationSection />
      <ContactCTA />
    </div>
  );
}
