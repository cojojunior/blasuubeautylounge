import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    // Added -mt-px to pull it up under the header, and rounded-b-[2rem] to style the bottom
    <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end overflow-hidden -mt-px">
      {/* Background Image */}
      <img
        src="/hero.png"
        alt="Blasuu Beauty Lounge"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12 text-center">
        <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Experience the pinnacle of beauty and wellness. From luxurious nails
          to transformative facials, we craft experiences tailored just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-2 bg-burnt hover:bg-burnt-dark text-white-pure px-6 py-3 rounded-full text-sm font-medium transition-all shadow-lg shadow-burnt/25 hover:shadow-burnt/40 group">
            Book Your Visit
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white-pure px-6 py-3 rounded-full text-sm font-medium transition-colors border border-white/20">
            Explore Services
          </Link>
        </div>

        {/* Mini Stats */}
        <div className="flex flex-wrap justify-center items-center gap-6 border-t border-white/20 pt-6">
          <div className="text-center">
            <p className="text-lg font-serif font-semibold text-white-pure drop-shadow-md">
              15+
            </p>
            <p className="text-xs text-gray-300 mt-0.5">Luxury Treatments</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-lg font-serif font-semibold text-white-pure drop-shadow-md">
              100%
            </p>
            <p className="text-xs text-gray-300 mt-0.5">Premium Products</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-lg font-serif font-semibold text-white-pure drop-shadow-md">
              Madina
            </p>
            <p className="text-xs text-gray-300 mt-0.5">Accra, Ghana</p>
          </div>
        </div>
      </div>
    </section>
  );
}
