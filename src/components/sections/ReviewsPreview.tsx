import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { SectionHeading } from "../common/SectionHeading";
import { ReviewCard } from "../reviews/ReviewCard";
import { Link } from "react-router-dom";

export function ReviewsPreview() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase.functions.invoke("get-google-reviews");
      if (data?.reviews) {
        setReviews(data.reviews.slice(0, 3)); // Only show top 3
      }
    }
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null; // Don't show the section if no reviews

  return (
    <section className="py-24 bg-white-soft border-t border-elephant/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Loved by Our Clients"
          subtitle="Don't just take our word for it. Here is what our community has to say."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
