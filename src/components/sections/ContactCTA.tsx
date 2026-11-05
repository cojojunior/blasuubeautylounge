import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function ContactCTA() {
  return (
    <section className="py-20 bg-elephant text-white-pure text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white-pure">
          Ready to Experience Blasuu?
        </h2>
        <p className="text-elephant-light mb-8 text-lg">
          Book your appointment today and let us take care of the rest.
        </p>
        <Link to="/book">
          <Button size="lg" className="bg-burnt hover:bg-burnt-dark">
            Book Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
