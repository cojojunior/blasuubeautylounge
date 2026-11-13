import { Star } from "lucide-react";

interface ReviewCardProps {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text?: string;
  relativeTime: string;
}

export function ReviewCard({
  authorName,
  authorPhoto,
  rating,
  text,
  relativeTime,
}: ReviewCardProps) {
  // If they didn't leave text, give them a nice default quote
  const displayText =
    text && text.trim().length > 0
      ? text
      : "Loved my experience at Blasuu! Highly recommend.";

  return (
    <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {authorPhoto ? (
            <img
              src={authorPhoto}
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-elephant/10 flex items-center justify-center text-elephant font-bold font-serif">
              {authorName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold text-sm text-elephant">{authorName}</p>
            <p className="text-xs text-elephant-muted">{relativeTime}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? "fill-gold text-gold" : "text-gray-300"}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-elephant-muted leading-relaxed italic flex-grow">
        "{displayText}"
      </p>
    </div>
  );
}
