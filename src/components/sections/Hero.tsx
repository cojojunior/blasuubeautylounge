import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero.png"
        alt="Blasuu Beauty Lounge"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay for 35% brightness (approx 65% opacity black) */}
      <div className="absolute inset-0 bg-black/65 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-24 lg:py-32 animate-fade-in">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-8">
          <div className="flex -space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="fill-gold text-gold" />
            ))}
          </div>
          <span className="text-xs font-medium text-white-pure ml-1">
            Trusted by clients in Accra
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-white-pure tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
          Unveil Your <br />
          <span className="text-burnt italic">Radiant</span> Self.
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Experience the pinnacle of beauty and wellness. From luxurious nails
          to transformative facials, we craft experiences tailored just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-2 bg-burnt hover:bg-burnt-dark text-white-pure px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg shadow-burnt/25 hover:shadow-burnt/40 group">
            Book Your Visit
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white-pure px-8 py-4 rounded-full text-base font-medium transition-colors border border-white/20">
            Explore Services
          </Link>
        </div>

        {/* Mini Stats */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 border-t border-white/20 pt-8">
          <div className="text-center">
            <p className="text-2xl font-serif font-semibold text-white-pure drop-shadow-md">
              15+
            </p>
            <p className="text-sm text-gray-300 mt-1">Luxury Treatments</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-serif font-semibold text-white-pure drop-shadow-md">
              100%
            </p>
            <p className="text-sm text-gray-300 mt-1">Premium Products</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-serif font-semibold text-white-pure drop-shadow-md">
              Madina
            </p>
            <p className="text-sm text-gray-300 mt-1">Accra, Ghana</p>
          </div>
        </div>
      </div>
    </section>
  );
}
