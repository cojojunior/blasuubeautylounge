import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Star, ExternalLink } from "lucide-react";

export function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const { data, error } =
        await supabase.functions.invoke("get-google-reviews");

      if (!error && data) {
        setReviews(data.reviews || []);
        setRating(data.rating || null);
        setTotalReviews(data.userRatingCount || 0);
      }
      setLoading(false);
    }
    fetchReviews();
  }, []);

  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-elephant">
            Client Reviews
          </h1>
          <p className="text-elephant-muted text-lg max-w-2xl mx-auto">
            See what our amazing clients have to say about their experience at
            Blasuu Beauty Lounge.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-elephant-muted">
            Loading verified reviews...
          </div>
        ) : (
          <>
            {/* Rating Summary */}
            <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-sm text-center mb-12 max-w-md mx-auto">
              <div className="text-5xl font-bold text-elephant mb-2">
                {rating || 5.0}
              </div>
              <div className="flex justify-center gap-1 mb-2 text-gold">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={24} className="fill-gold" />
                ))}
              </div>
              <p className="text-sm text-elephant-muted">
                Based on {totalReviews} Google Reviews
              </p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white-pure p-6 rounded-2xl border border-elephant/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {review.authorAttribution?.photoUri ? (
                          <img
                            src={review.authorAttribution.photoUri}
                            alt="Reviewer"
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-elephant/10 flex items-center justify-center text-elephant font-bold">
                            {review.authorAttribution?.displayName?.charAt(0) ||
                              "G"}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-sm text-elephant">
                            {review.authorAttribution?.displayName ||
                              "Google User"}
                          </p>
                          <p className="text-xs text-elephant-muted">
                            {review.relativePublishTimeDescription}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "fill-gold text-gold"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-elephant-muted leading-relaxed italic">
                      "{review.text?.text || "Rating only"}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to Google Maps */}
            <div className="text-center mt-12">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-burnt font-medium hover:underline">
                View all reviews on Google Maps <ExternalLink size={16} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
