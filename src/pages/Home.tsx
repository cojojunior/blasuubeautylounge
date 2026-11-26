import { useState } from "react";
import { Hero } from "../components/sections/Hero";
import { FeaturedTreatments } from "../components/sections/FeaturedTreatments";
import { Benefits } from "../components/sections/Benefits";
import { ReviewsPreview } from "../components/sections/ReviewsPreview";
import { LocationSection } from "../components/sections/LocationSection";
import { ContactCTA } from "../components/sections/ContactCTA";
import { ShopByCategory } from "../components/sections/ShopByCategory";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../config/site";
import { SplashScreen } from "../components/sections/SplashScreen"; // Import it

export function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="flex flex-col relative">
      {/* Render Splash Screen Overlay */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <Seo
        title="Luxury Beauty & Spa in Accra"
        description="Experience the pinnacle of beauty and wellness in Madina, Accra. Book manicures, pedicures, facials, and massages at Blasuu Beauty Lounge."
        url={`${siteConfig.url}/`}
      />

      {/* Wrap main content in a div that slightly delays rendering to ensure smooth video playback */}
      <div
        className={
          showSplash
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-1000"
        }>
        <Hero />
        <ShopByCategory />
        <FeaturedTreatments />
        <Benefits />
        <ReviewsPreview />
        <LocationSection />
        <ContactCTA />
      </div>
    </div>
  );
}
