import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allServices as services, categories } from "../content";
import { Heart, ArrowUpRight } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../config/site";

// A helper to map specific service IDs to your uploaded images
const getServiceImage = (serviceId: string, category: string) => {
  switch (serviceId) {
    // --- NAILS & EXTENSIONS ---
    case "n1": return "/sevices/manicure/regular.webp";
    case "n2": return "/sevices/manicure/gel.webp";
    case "n3": return "/sevices/manicure/russian.webp";
    case "n4": return "/sevices/manicure/short.webp";
    case "n5": return "/sevices/manicure/medium.webp";
    case "n6": return "/sevices/manicure/long.webp";
    case "n7": return "/sevices/manicure/toenail.webp";
    case "n8": return "/sevices/manicure/accessories.webp";
    case "n9": return "/sevices/manicure/gelpolish.webp";

    // --- PEDICURE ---
    case "p1": return "/sevices/perdicure/sporty.webp";
    case "p2": return "/sevices/perdicure/citrus.webp";
    case "p3": return "/sevices/perdicure/cocktail.webp";
    case "p4": return "/sevices/perdicure/jelly.webp";
    case "p5": return "/sevices/perdicure/sporty.webp"; 

    // --- FACIALS ---
    case "f1": return "/sevices/facials/basic.webp";
    case "f2": return "/sevices/facials/deepcleansing.webp";
    case "f3": return "/sevices/facials/acne.webp";
    
    // --- LASHES ---
    case "l1": return "/sevices/lashes/cluster.webp";
    case "l2": return "/sevices/lashes/lift.webp";
    case "l3": return "/sevices/lashes/tint.webp";
    case "l4": return "/sevices/lashes/lift&tint.webp";
    
    // --- MASSAGE ---
    case "m1": return "/sevices/massage/swidish.webp";
    case "m2": return "/sevices/massage/deeptissue.webp";
    case "m3": return "/sevices/massage/cocktail.webp";
    case "m4": return "/sevices/massage/bodyparts.webp";
    
    // --- WAXING ---
    case "w1": return "/sevices/waxing/armpit.webp";
    case "w2": return "/sevices/waxing/arm.webp";
    case "w3": return "/sevices/waxing/bikini.webp";
    case "w4": return "/sevices/waxing/brazillian.webp";
    case "w5": return "/sevices/waxing/back.webp";
    case "w6": return "/sevices/waxing/chest.webp";
    case "w7": return "/sevices/waxing/thighs.webp";
    case "w8": return "/sevices/waxing/legs.webp";
    case "w9": return "/sevices/waxing/face.webp";
    case "w10": return "/sevices/waxing/nose.webp";
    case "w11": return "/sevices/waxing/ear.webp";

    // --- PIERCING ---
    case "pr1": return "/sevices/piercing/earlobe.webp";
    case "pr2": return "/sevices/piercing/helix.webp";
    case "pr3": return "/sevices/piercing/tragus.webp";
    case "pr4": return "/sevices/piercing/nose.webp";
    case "pr5": return "/sevices/piercing/septum.webp";
    case "pr6": return "/sevices/piercing/daith.webp";
    case "pr7": return "/sevices/piercing/rook.webp";
    case "pr8": return "/sevices/piercing/industrial.webp";
    case "pr9": return "/sevices/piercing/neval.webp"; 

    // --- SPECIAL PACKAGES ---
    case "pkg-his-deep": return "/sevices/special/HIS-TREATS–DEEP.webp";
    case "pkg-his-sport": return "/sevices/special/his-treat-spoty.webp";
    case "pkg-his-body": return "/sevices/special/his-treat-body.webp";
    case "pkg-her-mani": return "/sevices/special/her-treat-manicure.webp";
    case "pkg-her-massage": return "/sevices/special/her-treat-massage.webp";
    case "pkg-her-facial": return "/sevices/special/her-treat-facial.webp";
    case "pkg-couples-ultimate": return "/sevices/special/us-facials.webp"; 
    case "pkg-couples-lashes": return "/sevices/special/us-extensions.webp";

    // --- SKIN TAG REMOVAL ---
    case "st1": return "/sevices/skin-removal.webp";

    default:
      // Fallback based on category
      switch (category) {
        case "Nails": return "/nails.webp";
        case "Pedicure": return "/perdicure.webp";
        case "Waxing": return "/waxing.webp";
        case "Facials": return "/facials.webp";
        case "Massage": return "/massage.webp";
        case "Lashes": return "/lashes.webp";
        case "Piercing": return "/piecing.webp";
        case "Special Packages": return "/career.webp";
        case "Skin Tag": return "/sevices/skin-removal.webp";
        default: return "/career.webp"; 
      }
  }
};

export function Services() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

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
        <Seo
          title="Our Services & Prices"
          description="Explore our full menu of luxury spa treatments. From Russian manicures to deep tissue massages, find your next glow-up at Blasuu Beauty Lounge."
          url={`${siteConfig.url}/services`}
        />
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
          {filteredServices.map((service) => {
            const isSpecialPackage = service.category === "Special Packages";

            return (
              <Link
                key={service.id}
                to={`/book?service=${service.id}`}
                className="group flex flex-col bg-white-pure border border-black/10 rounded-[2rem] p-3 transition-transform hover:-translate-y-1 hover:shadow-xl">
                {/* Top Image Section */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-white-soft">
                  <img
                    src={getServiceImage(service.id, service.category)}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Heart Button */}
                  <button
                    onClick={(e) => toggleLike(e, service.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white-pure/80 backdrop-blur-md rounded-full flex items-center justify-center text-elephant border border-black/10 transition-colors hover:bg-burnt hover:text-white-pure">
                    <Heart
                      size={18}
                      className={
                        liked[service.id] ? "fill-burnt text-burnt" : ""
                      }
                    />
                  </button>
                </div>

                {/* Bottom Text Section */}
                <div className="px-3 pt-4 pb-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3
                      className={`font-semibold text-lg text-elephant leading-tight ${isSpecialPackage ? "whitespace-normal pb-2" : "truncate"}`}>
                      {service.name}
                    </h3>
                    <p className="text-sm text-elephant-muted mt-1">
                      {service.category}
                    </p>
                  </div>

                  {/* Price and Action Button */}
                  <div className="flex items-end justify-between mt-4">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
