export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: "google" | "manual";
}

export const reviews: Review[] = [];

export const googleReviewsConfig = {
  isConnected: false,
  noticeText:
    "We are currently integrating with our Google Business Profile. Once connected, our verified 5-star reviews from Madina, Accra will appear here automatically.",
  mapsLink: "https://maps.google.com",
};
