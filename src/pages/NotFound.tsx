import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white-soft">
      <h1 className="text-6xl font-serif text-elephant mb-4">404</h1>
      <p className="text-xl text-elephant-muted mb-8">
        Oops! We couldn't find the page you're looking for.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
