export interface ManualReview {
  id: string;
  author: string;
  authorPhoto?: string;
  rating: number;
  relativeTime: string;
  text: string;
  services?: string;
  ownerResponse?: {
    relativeTime: string;
    text: string;
  };
}

export const manualReviews: ManualReview[] = [
  {
    id: "rev-1",
    author: "Josephine Cann",
    authorPhoto: "/reviews/josephine.png",
    rating: 5,
    relativeTime: "6 months ago",
    text: "This was my second stick-on nails done by them and they came out so good and lasted so long. I'd definitely recommend her service if you're looking for quality and affordability",
    ownerResponse: {
      relativeTime: "6 months ago",
      text: "Miss Cann, thank you for coming back again.",
    },
  },
  {
    id: "rev-2",
    author: "Odarkor Ankrah-Addison",
    authorPhoto: "/reviews/Odarkor.png",
    rating: 5,
    relativeTime: "7 months ago",
    text: "Good customer service. I did Russian pedicure and fixed my nails, and I must say I had the best experience ever. Everything was so on point and I recommend their services.",
    services: "Acrylic nails, Pedicure",
    ownerResponse: {
      relativeTime: "6 months ago",
      text: "Odarkor, it was so nice attending to you. You have a beautiful soul and made the session a good one for is as well.",
    },
  },
  {
    id: "rev-3",
    author: "Jewel Frempong",
    authorPhoto: "/reviews/jewel.png",
    rating: 5,
    relativeTime: "6 months ago",
    text: "If you are ever in Ghana and need a place to get your nails, eyebrows and other beauty stuff blasuu beauty lounge is your number stop. The lady is very professional, welcoming, warm and very respectful. She went extra miles to make sure I ...",
    ownerResponse: {
      relativeTime: "6 months ago",
      text: "Jewel, you made it easy for us to attend to you. We appreciate your recommendations and would be super happy to attend to you anytime you're in Ghana.",
    },
  },
  {
    id: "rev-4",
    author: "Janet B Wisseh",
    authorPhoto: "/reviews/janet.png",
    rating: 5,
    relativeTime: "11 months ago",
    text: "She's amazing. The best customer service award in Accra, Ghana goes to this lady. Her professionalism is top-notch. She even went the extreme to help me get some items from the market nearby. She's amazing! She has master...her craft... I recommend Blasuu Beauty Lounge. Thank you Blasuu.",
    services: "Eyebrow shaping, Pedicure, Waxing, Manicure",
    ownerResponse: {
      relativeTime: "10 months ago",
      text: "Janet, serving you was a delight for us. Thank you so much.",
    },
  },
  {
    id: "rev-5",
    author: "Antoinette Sena Yali",
    authorPhoto: "/reviews/antoinette.png",
    rating: 5,
    relativeTime: "2 years ago",
    text: "I had well detailed facials today. Consultation was on point. The therapist was very patient took her time in delivering. Gave after service maintenance tips for a healthy glowing skin. I enjoyed a glass of sweet red wine as well. Guys keep up the good work.",
    services: "Acne treatments",
    ownerResponse: {
      relativeTime: "a year ago",
      text: "Sena, it was an honour working on your beautiful melanin skin. We appreciate your compliment.",
    },
  },
  {
    id: "rev-6",
    author: "Emmanuel Osei",
    authorPhoto: "/reviews/emmanuel.png",
    rating: 5,
    relativeTime: "3 months ago",
    text: "I had a massage and  I slept like a baby I felt relieved , relaxed and calmed afterwards. The therapist was very patient and very detailed oriented I recommend their services anytime anyday.",
    services: "Massage",
    ownerResponse: {
      relativeTime: "10 months ago",
      text: "Emmanuel, thank you for trusting us to help you distress.",
    },
  },
  {
    id: "rev-7",
    author: "Benjamin Worlanyo",
    authorPhoto: "/reviews/ben.png",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Blasuu is an exceptional beautician and masseuse. She’s highly skilled, professional, and deeply passionate about her work. She talks you through every step, creating a calm, reassuring atmosphere. Each session is thoughtful, relaxing, and truly restorative.",
    services: "Massage",
    ownerResponse: {
      relativeTime: "10 months ago",
      text: "Thank you so much and we appreciate you alot, Mr. Benjamin",
    },
  },
  {
    id: "rev-8",
    author: "Selase Chiamaka",
    authorPhoto: "/reviews/selase.png",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Customer service is top notch. I was offered wine to calm me down cos I was super scared of the pain of waxing. She did an amazing job and is super sweet. 100% recommend.",
    services: "Brazilian Waxing",
    ownerResponse: {
      relativeTime: "2 years",
      text: "Thank you Selaise, it was so nice meeting and working on you.",
    },
  },
];
