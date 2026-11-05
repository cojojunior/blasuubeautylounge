import { Link } from "react-router-dom";
import { Hero } from "../components/sections/Hero";
import { services } from "../content/services";

export function Home() {
  const featured = services
    .filter((s) => s.category === "Facials" || s.category === "Massage")
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Featured Treatments */}
      <section className="py-24 bg-white-pure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-elephant mb-4">
              Signature Treatments
            </h2>
            <p className="text-elephant-muted text-lg">
              Indulge in our most popular luxury experiences, crafted to restore
              your glow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((service) => (
              <div
                key={service.id}
                className="bg-white-soft rounded-3xl p-8 border border-elephant/5 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {service.name}
                </h3>
                <p className="text-burnt font-medium mb-6">
                  GH₵ {service.price.toFixed(2)}
                </p>
                <Link
                  to={`/book?service=${service.id}`}
                  className="text-sm font-medium text-elephant hover:text-burnt flex items-center gap-2">
                  Book this treatment &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Notice */}
      <section className="py-24 bg-white-soft border-t border-elephant/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Authentic Reviews</h2>
          <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10">
            <p className="text-elephant-muted mb-4">
              We are currently integrating with our Google Business Profile.
              Once connected, our verified 5-star reviews from Madina, Accra
              will appear here automatically.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-burnt font-medium hover:underline">
              View us on Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
