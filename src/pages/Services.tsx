import { useState } from "react";
import { Link } from "react-router-dom";
import { allServices as services, categories } from "../content";
import { Heart, ArrowUpRight } from "lucide-react";

// A helper to get generic placeholder images based on the service category
const getCategoryImage = (category: string) => {
  switch (category) {
    case "Nails":
      return "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop";
    case "Pedicure":
      return "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop";
    case "Waxing":
      return "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop";
    case "Facials":
      return "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop";
    case "Massage":
      return "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop";
    case "Lashes":
      return "https://images.unsplash.com/photo-1583002083751-9c4b11a5c22e?q=80&w=600&auto=format&fit=crop";
    case "Piercing":
      return "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop";
  }
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Services</h1>
          <p className="text-elephant-muted">
            Discover our full menu of luxury treatments.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-burnt text-white-pure shadow-md"
                  : "bg-white-pure text-elephant border border-black/5 hover:border-burnt"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              to={`/book?service=${service.id}`}
              // Changed to white background and black/30 border
              className="group flex flex-col bg-white-pure border border-black/10 rounded-[2rem] p-3 transition-transform hover:-translate-y-1 hover:shadow-xl">
              {/* Top Image Section */}
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-white-soft">
                <img
                  src={getCategoryImage(service.category)}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Heart Button */}
                <button
                  onClick={(e) => toggleLike(e, service.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white-pure/80 backdrop-blur-md rounded-full flex items-center justify-center text-elephant border border-black/10 transition-colors hover:bg-burnt hover:text-white-pure">
                  <Heart
                    size={18}
                    className={liked[service.id] ? "fill-burnt text-burnt" : ""}
                  />
                </button>
              </div>

              {/* Bottom Text Section */}
              <div className="px-3 pt-4 pb-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-elephant leading-tight truncate">
                    {service.name}
                  </h3>
                  <p className="text-sm text-elephant-muted mt-1">
                    {service.category}
                  </p>
                </div>

                {/* Price and Action Button */}
                <div className="flex items-end justify-between mt-6">
                  <p className="text-3xl font-medium text-elephant">
                    <span className="text-lg text-elephant-muted mr-1">
                      GH₵
                    </span>
                    {service.price}
                  </p>

                  <div className="w-12 h-12 bg-elephant/5 rounded-2xl flex items-center justify-center text-elephant group-hover:bg-burnt group-hover:text-white-pure transition-colors border border-black/5">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
