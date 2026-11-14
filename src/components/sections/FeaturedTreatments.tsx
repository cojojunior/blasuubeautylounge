import { Link } from "react-router-dom";
import { services } from "../../content/services";
import { SectionHeading } from "../common/SectionHeading";
import { formatCurrency } from "../../lib/currency"; // NEW

export function FeaturedTreatments() {
  const featured = services
    .filter((s) => s.category === "Facials" || s.category === "Massage")
    .slice(0, 3);

  return (
    <section className="py-8 bg-white-pure">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Signature Treatments"
          subtitle="Indulge in our most popular luxury experiences, crafted to restore your glow."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((service) => (
            <div
              key={service.id}
              // Changed to bg-white-pure and added border-black/10 to match the new card style
              className="bg-white-pure rounded-3xl p-8 border border-black/10 hover:border-burnt/30 hover:shadow-xl transition-all">
              <h3 className="text-xl font-serif font-semibold mb-2 text-elephant">
                {service.name}
              </h3>
              <p className="text-burnt font-medium mb-6">
                {/* Use formatCurrency */}
                {formatCurrency(service.price)}
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
  );
}
