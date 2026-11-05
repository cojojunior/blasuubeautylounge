import { type Service } from "./services";

export const packages: Service[] = [
  // HIS TREATS
  {
    id: "pkg-his-deep",
    category: "Special Packages",
    name: "His Treats: Deep Facial + Full Body Massage + Wine",
    price: 600,
    durationMinutes: 120,
    depositAmount: 100,
  },
  {
    id: "pkg-his-sport",
    category: "Special Packages",
    name: "His Treats: Sport Pedicure + Neck Massage",
    price: 300,
    durationMinutes: 75,
    depositAmount: 50,
  },
  {
    id: "pkg-his-body",
    category: "Special Packages",
    name: "His Treats: Body Massage + Pedicure + Manicure",
    price: 650,
    durationMinutes: 150,
    depositAmount: 100,
  },

  // HER TREATS
  {
    id: "pkg-her-mani",
    category: "Special Packages",
    name: "Her Treats: Manicure + Pedicure + Facials",
    price: 500,
    durationMinutes: 150,
    depositAmount: 100,
  },
  {
    id: "pkg-her-massage",
    category: "Special Packages",
    name: "Her Treats: Massage + Facials + Bikini Waxing",
    price: 720,
    durationMinutes: 120,
    depositAmount: 100,
  },
  {
    id: "pkg-her-facial",
    category: "Special Packages",
    name: "Her Treats: Facials + Pedicure + Massage",
    price: 500,
    durationMinutes: 150,
    depositAmount: 100,
  },

  // COUPLES
  {
    id: "pkg-couples-ultimate",
    category: "Special Packages",
    name: "Us (Couples): Facials + Mani + Massage + Pedi + Waxing + Skin Tag",
    price: 1800,
    durationMinutes: 240,
    depositAmount: 200,
  },
  {
    id: "pkg-couples-lashes",
    category: "Special Packages",
    name: "Us (Couples): Facials + Mani + Pedi + Nail Extensions + Lashes",
    price: 1200,
    durationMinutes: 180,
    depositAmount: 150,
  },
];
