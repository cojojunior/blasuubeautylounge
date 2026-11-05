import { SectionHeading } from "../common/SectionHeading";
import { GoogleReviewsNotice } from "../reviews/GoogleReviewsNotice";

export function ReviewsPreview() {
  return (
    <section className="py-24 bg-white-soft border-t border-elephant/5">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading title="Authentic Reviews" />
        <GoogleReviewsNotice />
      </div>
    </section>
  );
}
