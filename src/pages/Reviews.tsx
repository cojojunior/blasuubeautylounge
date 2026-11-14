import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { Star, ExternalLink, Loader2 } from "lucide-react";
import { manualReviews, type ManualReview } from "../content/manualReviews";

export function Reviews() {
  const [apiReviews, setApiReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoogleStats() {
      try {
        const { data, error } =
          await supabase.functions.invoke("get-google-reviews");

        if (error) throw error;

        if (data) {
          setRating(data.rating || null);
          setTotalReviews(data.userRatingCount || 0);
          if (data.reviews) {
            setApiReviews(data.reviews);
          }
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGoogleStats();
  }, []);

  const formattedApiReviews: ManualReview[] = apiReviews.map((review) => ({
    id: review.name || Math.random().toString(),
    author: review.authorAttribution?.displayName || "Google User",
    authorPhoto: review.authorAttribution?.photoUri,
    rating: review.rating,
    text: review.text?.text || "",
    relativeTime: review.relativePublishTimeDescription,
  }));

  const allReviews: ManualReview[] = [...formattedApiReviews, ...manualReviews];

  return (
    <div className="py-20 bg-white-pure min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-elephant">
            Client Reviews
          </h1>
          <p className="text-elephant-muted text-lg max-w-2xl mx-auto">
            Read what our amazing clients have to say about their experience at
            Blasuu Beauty Lounge.
          </p>
        </div>

        <div className="bg-white-soft p-8 rounded-3xl border border-black/10 shadow-sm text-center mb-12 max-w-md mx-auto">
          <div className="text-5xl font-bold text-elephant mb-2">
            {loading ? "..." : rating || 5.0}
          </div>
          <div className="flex justify-center gap-1 mb-3 text-gold">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={24} className="fill-gold" />
            ))}
          </div>
          <p className="text-sm font-medium text-elephant-muted">
            Based on {loading ? "..." : totalReviews || "130+"} Google Reviews
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-burnt" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((review) => (
              <ReviewCard
                key={review.id}
                authorName={review.author}
                authorPhoto={review.authorPhoto}
                rating={review.rating}
                text={review.text}
                relativeTime={review.relativeTime}
                services={review.services}
                ownerResponse={review.ownerResponse}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-burnt font-medium hover:underline bg-burnt/5 px-6 py-3 rounded-full transition-colors">
            View all {totalReviews || ""} reviews on Google Maps{" "}
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
