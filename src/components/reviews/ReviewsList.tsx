import { GoogleReviewsNotice } from "./GoogleReviewsNotice";

export function ReviewsList() {
  // When API is connected, this will map over real reviews
  return (
    <div className="max-w-4xl mx-auto">
      <GoogleReviewsNotice />
    </div>
  );
}
