import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { SectionHeading } from "../common/SectionHeading";
import { ReviewCard } from "../reviews/ReviewCard";
import { Link } from "react-router-dom";
import { manualReviews, type ManualReview } from "../../content/manualReviews";

export function ReviewsPreview() {
  const [apiReviews, setApiReviews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase.functions.invoke("get-google-reviews");
      if (data?.reviews) {
        setApiReviews(data.reviews);
      }
    }
    fetchReviews();
  }, []);

  // Explicitly type the formatted reviews to match ManualReview
  const formattedApiReviews: ManualReview[] = apiReviews.map((review) => ({
    id: review.name || Math.random().toString(),
    author: review.authorAttribution?.displayName || "Google User",
    authorPhoto: review.authorAttribution?.photoUri,
    rating: review.rating,
    text: review.text?.text || "",
    relativeTime: review.relativePublishTimeDescription,
  }));

  const allReviews: ManualReview[] = [...formattedApiReviews, ...manualReviews];
  const featuredReviews = allReviews.slice(0, 3);

  if (featuredReviews.length === 0) return null;

  return (
    <section className="py-24 bg-white-soft border-t border-elephant/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Loved by Our Clients"
          subtitle="Don't just take our word for it. Here is what our community has to say."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredReviews.map((review) => (
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

        <div className="text-center">
          <Link
            to="/reviews"
            className="text-elephant font-medium hover:text-burnt transition-colors underline underline-offset-4">
            Read all reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
