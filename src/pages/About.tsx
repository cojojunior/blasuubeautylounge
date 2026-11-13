import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Sparkles, Heart, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="py-24 bg-white  text-elephant text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white-pure">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-elephant-light leading-relaxed">
            Blasuu Beauty Lounge was born from a simple vision: to create a
            sanctuary in the heart of Madina, Accra, where luxury meets genuine
            care. We believe that beauty is not just about how you look, but how
            you feel.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 rounded-3xl bg-white-pure border border-elephant/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Premium Products</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              We only use top-tier, skin-loving products to ensure your
              treatments are as safe as they are luxurious.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white-pure border border-elephant/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Certified Experts</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Our specialists are highly trained and passionate about their
              craft, ensuring you leave feeling your absolute best.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white-pure border border-elephant/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Hygiene First</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Your health and safety are our top priority. We maintain strict
              sterilization protocols for all our tools and equipment.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-white-pure text-center px-4 border-t border-elephant/10">
        <h2 className="text-3xl font-serif mb-6">
          Ready to Experience Blasuu?
        </h2>
        <Link to="/book">
          <Button size="lg">Book Your Appointment</Button>
        </Link>
      </div>
    </div>
  );
}
