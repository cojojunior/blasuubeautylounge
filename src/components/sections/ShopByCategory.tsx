import { Link } from "react-router-dom";

const categories = [
  { name: "Nails", image: "/nails.png" },
  { name: "Pedicure", image: "/perdicure.png" },
  { name: "Waxing", image: "/waxing.png" },
  { name: "Facials", image: "/facials.png" },
  { name: "Massage", image: "/massage.png" },
  { name: "Lashes", image: "/lashes.png" },
  { name: "Piercing", image: "/piecing.png" },
];

export function ShopByCategory() {
  return (
    <section className="py-24 bg-white-pure">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-elephant">
            Shop by Category
          </h2>
          <p className="text-elephant-muted text-lg max-w-2xl mx-auto">
            Explore our treatments by category and find your next glow-up.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => {
            // Make the first item span 2 columns on desktop for a dynamic masonry feel
            const isFeatured = index === 0;

            return (
              <Link
                key={cat.name}
                to={`/services?category=${cat.name}`}
                className={`group relative rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-xl transition-all ${
                  isFeatured
                    ? "col-span-2 md:col-span-2 row-span-2 aspect-square md:aspect-auto"
                    : "aspect-square"
                }`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3
                    className={`font-semibold text-white-pure font-serif ${isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                    {cat.name}
                  </h3>

                  {/* Circle Arrow icon */}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt transition-colors border border-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
