export function GoogleReviewsNotice() {
  return (
    <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-sm text-center">
      <p className="text-elephant-muted mb-4">
        We are currently integrating with our Google Business Profile. Once
        connected, our verified 5-star reviews will appear here automatically.
      </p>
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noreferrer"
        className="text-burnt font-medium hover:underline">
        View us on Google Maps
      </a>
    </div>
  );
}
