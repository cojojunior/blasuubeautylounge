import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { Star, ExternalLink, Loader2 } from "lucide-react";
import { businessConfig } from "../config/business";

export function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } =
          await supabase.functions.invoke("get-google-reviews");

        if (error) throw error;

        if (data) {
          setReviews(data.reviews || []);
          setRating(data.rating || null);
          setTotalReviews(data.userRatingCount || 0);
        }
      } catch (err: any) {
        console.error(err);
        setError("Unable to load reviews at this time.");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div className="py-20 bg-white min-h-screen">
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-elephant-muted">
            <Loader2 size={32} className="animate-spin text-burnt mb-4" />
            <p>Loading verified reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white-pure rounded-3xl border border-elephant/10">
            <p className="text-elephant-muted mb-4">{error}</p>
            <a
              href={businessConfig.socials.instagram}
              className="text-burnt hover:underline">
              Check us out on social media
            </a>
          </div>
        ) : (
          <>
            {/* Overall Rating Card */}
            <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-sm text-center mb-12 max-w-md mx-auto">
              <div className="text-5xl font-bold text-elephant mb-2">
                {rating || 5.0}
              </div>
              <div className="flex justify-center gap-1 mb-3 text-gold">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={24} className="fill-gold" />
                ))}
              </div>
              <p className="text-sm font-medium text-elephant-muted">
                Based on {totalReviews} Google Reviews
              </p>
            </div>

            {/* Reviews Grid */}
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-elephant-muted">
                  No written reviews yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    authorName={
                      review.authorAttribution?.displayName || "Google User"
                    }
                    authorPhoto={review.authorAttribution?.photoUri}
                    rating={review.rating}
                    text={review.text?.text}
                    relativeTime={review.relativePublishTimeDescription}
                  />
                ))}
              </div>
            )}

            {/* Link to Google Maps */}
            <div className="text-center mt-16">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-burnt font-medium hover:underline bg-burnt/5 px-6 py-3 rounded-full transition-colors">
                View all reviews on Google Maps <ExternalLink size={16} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
