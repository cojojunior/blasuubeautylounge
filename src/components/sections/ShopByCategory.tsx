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
    <section className="py-10 bg-white-pure">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-elephant">
            Shop by Category
          </h2>
          <p className="text-elephant-muted text-lg max-w-2xl mx-auto">
            Explore our treatments by category and find your next glow-up.
          </p>
        </div>

        {/* 
          UNIFIED COLLAGE GRID (Mobile, Tablet, Desktop)
          - 4 columns total.
          - Left side: 2 columns wide, 3 rows tall (uses 3 images).
          - Right side: 2 columns wide (1 image top left, 1 tall image top right, 2 stacked images at bottom).
        */}
        <div className="grid grid-cols-4 grid-rows-4 gap-3 md:gap-4 lg:gap-6 h-[600px] md:h-[700px] lg:h-[800px]">
          {/* 1. Top Left (Tall) */}
          <Link
            to={`/services?category=${categories[0].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-2 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">
                {categories[0].name}
              </h3>
            </div>
          </Link>

          {/* 2. Top Right Left (Small Square) */}
          <Link
            to={`/services?category=${categories[1].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-1 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[1].image}
              alt={categories[1].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">
                {categories[1].name}
              </h3>
            </div>
          </Link>

          {/* 3. Top Right Right (Small Square) */}
          <Link
            to={`/services?category=${categories[2].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-1 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[2].image}
              alt={categories[2].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">
                {categories[2].name}
              </h3>
            </div>
          </Link>

          {/* 4. Middle Left (Tall) */}
          <Link
            to={`/services?category=${categories[3].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-2 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[3].image}
              alt={categories[3].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">
                {categories[3].name}
              </h3>
            </div>
          </Link>

          {/* 5. Right Side Tall Image (Middle & Bottom Right) */}
          <Link
            to={`/services?category=${categories[4].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-2 row-span-2 shadow-sm border border-black/10">
            <img
              src={categories[4].image}
              alt={categories[4].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">
                {categories[4].name}
              </h3>
            </div>
          </Link>

          {/* 6. Bottom Left (Tall) */}
          <Link
            to={`/services?category=${categories[5].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-2 row-span-2 shadow-sm border border-black/10">
            <img
              src={categories[5].image}
              alt={categories[5].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-3xl drop-shadow-md">
                {categories[5].name}
              </h3>
            </div>
          </Link>

          {/* 7. Bottom Right (Wide) */}
          <Link
            to={`/services?category=${categories[6].name}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden col-span-2 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[6].image}
              alt={categories[6].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex items-end justify-between gap-2">
              <h3 className="!text-white-pure font-semibold font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">
                {categories[6].name}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
