import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allServices as services, categories } from "../content";
import { Heart, ArrowUpRight } from "lucide-react";

// A helper to get generic placeholder images based on the service category
const getCategoryImage = (category: string) => {
  switch (category) {
    case "Nails":
      return "/nails.png";
    case "Pedicure":
      return "/perdicure.png";
    case "Waxing":
      return "/waxing.png";
    case "Facials":
      return "/facials.png";
    case "Massage":
      return "/massage.png";
    case "Lashes":
      return "/lashes.png";
    case "Piercing":
      return "/piecing.png";
    default:
      return "/career.png"; // Fallback
  }
};

export function Services() {
  const [searchParams] = useSearchParams(); // Read the URL
  const initialCategory = searchParams.get("category") || "All";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Add this to ensure if a user clicks a Home category, it updates the view
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

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
                  : "bg-white-pure text-elephant border border-black/10 hover:border-burnt"
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