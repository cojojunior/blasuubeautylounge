import { Star } from "lucide-react";

export function ReviewCard() {
  return (
    <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10 shadow-sm">
      <div className="flex gap-1 mb-4 text-gold">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={16} className="fill-gold" />
        ))}
      </div>
      <p className="text-elephant-muted text-sm mb-4">
        "Amazing service and beautiful atmosphere!"
      </p>
      <p className="text-xs font-semibold text-elephant">- Verified Client</p>
    </div>
  );
}
