import { Sparkles, Heart, ShieldCheck } from "lucide-react";

export function Benefits() {
  return (
    <section className="py-24 bg-white-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Premium Products</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              We only use top-tier, skin-loving products to ensure your
              treatments are as safe as they are luxurious.
            </p>
          </div>
          <div>
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Certified Experts</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Our specialists are highly trained and passionate about their
              craft, ensuring you leave feeling your absolute best.
            </p>
          </div>
          <div>
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Hygiene First</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Your health and safety are our top priority. We maintain strict
              sterilization protocols for all our tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
