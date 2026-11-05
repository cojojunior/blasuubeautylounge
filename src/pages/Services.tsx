import { useState } from "react";
import { Link } from "react-router-dom";
import { allServices as services, categories } from "../content";


export function Services() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Services</h1>
          <p className="text-elephant-muted">
            Discover our full menu of luxury treatments.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-burnt text-white-pure"
                  : "bg-white-pure text-elephant border border-elephant/10 hover:border-burnt"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white-pure p-6 rounded-2xl border border-elephant/10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-burnt tracking-wider uppercase mb-2">
                  {service.category}
                </p>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-elephant-muted mb-6">
                  {service.durationMinutes} mins
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 border-t border-elephant/5 pt-4">
                <p className="text-lg font-medium">
                  GH₵ {service.price.toFixed(2)}
                </p>
                <Link
                  to={`/book?service=${service.id}`}
                  className="text-sm font-medium text-white-pure bg-elephant hover:bg-elephant-light px-4 py-2 rounded-full transition-colors">
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
