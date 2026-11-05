export function Reviews() {
  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-elephant">
          Client Reviews
        </h1>
        <p className="text-elephant-muted mb-12">
          Read what our amazing clients have to say about their experience at
          Blasuu.
        </p>

        <div className="bg-white-pure p-8 md:p-12 rounded-3xl border border-elephant/10 shadow-sm">
          <p className="text-elephant-muted mb-6">
            We are currently integrating with our Google Business Profile. Once
            connected, our verified 5-star reviews will appear here
            automatically.
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-burnt font-medium hover:underline">
            Find us on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
