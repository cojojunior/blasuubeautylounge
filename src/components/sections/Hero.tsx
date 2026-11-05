import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white-soft pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-burnt/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white-pure border border-elephant/10 shadow-sm mb-6 animate-fade-in">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="text-xs font-medium text-elephant ml-1">
                Trusted by clients in Accra
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-elephant tracking-tight leading-[1.1] mb-6">
              Unveil Your <br />
              <span className="text-burnt italic">Radiant</span> Self.
            </h1>

            <p className="text-lg sm:text-xl text-elephant-muted mb-10 max-w-lg leading-relaxed">
              Experience the pinnacle of beauty and wellness. From luxurious
              nails to transformative facials, we craft experiences tailored
              just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-elephant/5 text-elephant px-8 py-4 rounded-full text-base font-medium transition-colors border border-elephant/20">
                Explore Services
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mt-12 flex items-center gap-8 border-t border-elephant/10 pt-8">
              <div>
                <p className="text-2xl font-serif font-semibold text-elephant">
                  15+
                </p>
                <p className="text-sm text-elephant-muted mt-1">
                  Luxury Treatments
                </p>
              </div>
              <div className="w-px h-10 bg-elephant/10" />
              <div>
                <p className="text-2xl font-serif font-semibold text-elephant">
                  100%
                </p>
                <p className="text-sm text-elephant-muted mt-1">
                  Premium Products
                </p>
              </div>
              <div className="w-px h-10 bg-elephant/10" />
              <div>
                <p className="text-2xl font-serif font-semibold text-elephant">
                  Madina
                </p>
                <p className="text-sm text-elephant-muted mt-1">Accra, Ghana</p>
              </div>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none mx-auto">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-elephant/5 border border-elephant/10 shadow-2xl relative">
              {/* Placeholder image - we will swap this with a real photo later */}
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury spa experience at Blasuu Beauty Lounge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-elephant/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 sm:left-6 bg-white-pure p-4 rounded-2xl shadow-xl border border-elephant/5 flex items-center gap-4 animate-slide-up">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
                <Star size={24} className="fill-gold-dark" />
              </div>
              <div>
                <p className="text-sm font-semibold text-elephant">
                  Premium Care
                </p>
                <p className="text-xs text-elephant-muted">
                  Certified specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
