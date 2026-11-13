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

        {/* 
          The Grid Layout: 
          We use a 4-column grid on desktop. 
          We assign specific spans to each item to recreate the masonry look.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]">
          {/* 1. Top Left (Wide) */}
          <Link
            to={`/services?category=${categories[0].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-2 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-2xl md:text-3xl drop-shadow-md">
                {categories[0].name}
              </h3>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
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

          {/* 2. Top Right (Tall) */}
          <Link
            to={`/services?category=${categories[1].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-1 row-span-2 shadow-sm border border-black/10 hidden md:block">
            <img
              src={categories[1].image}
              alt={categories[1].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-2xl drop-shadow-md">
                {categories[1].name}
              </h3>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
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

          {/* 3. Bottom Left (Large Square) */}
          <Link
            to={`/services?category=${categories[2].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-1 md:col-span-1 row-span-2 shadow-sm border border-black/10">
            <img
              src={categories[2].image}
              alt={categories[2].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-2xl drop-shadow-md">
                {categories[2].name}
              </h3>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
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

          {/* 4. Middle (Wide) */}
          <Link
            to={`/services?category=${categories[3].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-2 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[3].image}
              alt={categories[3].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-2xl md:text-3xl drop-shadow-md">
                {categories[3].name}
              </h3>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
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

          {/* 5. Bottom Center (Square) */}
          <Link
            to={`/services?category=${categories[4].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-1 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[4].image}
              alt={categories[4].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-xl drop-shadow-md">
                {categories[4].name}
              </h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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

          {/* 6. Bottom Right (Square) */}
          <Link
            to={`/services?category=${categories[5].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-1 row-span-1 shadow-sm border border-black/10">
            <img
              src={categories[5].image}
              alt={categories[5].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-xl drop-shadow-md">
                {categories[5].name}
              </h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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

          {/* 7. Extra item just to balance it out (Optional, you can remove if you only have 6) */}
          <Link
            to={`/services?category=${categories[6].name}`}
            className="group relative rounded-[2rem] overflow-hidden col-span-1 row-span-1 shadow-sm border border-black/10 hidden md:block">
            <img
              src={categories[6].image}
              alt={categories[6].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <h3 className="!text-white-pure font-semibold font-serif text-xl drop-shadow-md">
                {categories[6].name}
              </h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white-pure group-hover:bg-burnt border border-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
        </div>
      </div>
    </section>
  );
}
