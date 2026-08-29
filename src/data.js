import strawberryCake from "./assets/menu/strawberry-cake.jpg";
import cupcake from "./assets/menu/cupcake.jpg";
import roseLatte from "./assets/menu/rose-latte.jpg";
import macarons from "./assets/menu/macarons.jpg";
import teaSet from "./assets/menu/tea-set.jpg";
import croissantImage from "./assets/menu/croissant.jpg";

/* Menu ------------------------------------------------------------------- */

export const categories = [
  { id: "all", label: "All Treats" },
  { id: "cakes", label: "Cakes" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "pastries", label: "Pastries" },
  { id: "drinks", label: "Drinks" },
];

export const products = [
  {
    id: 1,
    name: "Strawberry Cloud Cake",
    price: "$5.50",
    category: "cakes",
    categoryLabel: "Cake of the day",
    badge: "Best seller",
    description:
      "Vanilla sponge, whipped mascarpone and macerated strawberries, finished with a rose petal.",
    tags: ["Vegetarian", "Made daily"],
    image: strawberryCake,
  },
  {
    id: 2,
    name: "Blush Buttercream Cupcake",
    price: "$4.50",
    category: "cupcakes",
    categoryLabel: "Cupcake",
    badge: "New",
    description:
      "Madagascar-vanilla cake swirled with strawberry buttercream and a candied heart.",
    tags: ["Vegetarian"],
    image: cupcake,
  },
  {
    id: 3,
    name: "Rose Latte",
    price: "$4.00",
    category: "drinks",
    categoryLabel: "From the bar",
    description:
      "Double espresso, steamed oat milk and a whisper of rose syrup, poured with latte art.",
    tags: ["Hot or iced", "House syrup"],
    image: roseLatte,
  },
  {
    id: 4,
    name: "Pastel Macarons · Box of 6",
    price: "$12.00",
    category: "pastries",
    categoryLabel: "Patisserie",
    description:
      "Rose, pistachio, salted-honey and vanilla — baked crisp and chewy, boxed to go.",
    tags: ["Gluten free", "Gift ready"],
    image: macarons,
  },
  {
    id: 5,
    name: "Purr-fect Tea for Two",
    price: "$9.50",
    category: "drinks",
    categoryLabel: "Afternoon tea",
    badge: "Weekends",
    description:
      "A pot of loose-leaf tea, cat-shaped shortbread and petit fours on a three-tier stand.",
    tags: ["Pot of tea", "Petit fours"],
    image: teaSet,
  },
  {
    id: 6,
    name: "Golden Butter Croissant",
    price: "$3.75",
    category: "pastries",
    categoryLabel: "Viennoiserie",
    description:
      "A 72-hour laminated dough, baked dark-gold at 7 AM sharp. Flaky, buttery, gone by noon.",
    tags: ["72-hour ferment", "Baked 7 AM"],
    image: croissantImage,
  },
];

/* Features ---------------------------------------------------------------- */

export const features = [
  {
    icon: "croissant",
    title: "Baked fresh daily",
    text: "First trays leave the oven at 7 AM sharp — nothing on the counter is ever yesterday's.",
  },
  {
    icon: "paw",
    title: "22 rescue cats",
    text: "Every resident was rescued, vetted and vaccinated — and every one is up for adoption.",
  },
  {
    icon: "coffee",
    title: "Specialty coffee",
    text: "Small-batch beans from a local roastery, brewed by people who take mornings seriously.",
  },
  {
    icon: "heart",
    title: "Adoption friendly",
    text: "Five per cent of every order goes straight to our partner shelters across Oregon.",
  },
];

/* Testimonials ------------------------------------------------------------ */

export const testimonials = [
  {
    name: "Sarah M.",
    meta: "Regular since 2021",
    initials: "SM",
    rating: 5,
    text: "I came for the croissants and stayed for the cats. Mochi now headbutts my laptop every Friday morning — it's the best meeting of my week.",
  },
  {
    name: "Michael T.",
    meta: "First visit last week",
    initials: "MT",
    rating: 5,
    text: "The rose latte is genuinely the best coffee I've had in Portland, and the cat lounge is spotless. We booked my mum's birthday before we even left.",
  },
  {
    name: "Emma L.",
    meta: "Adopted two residents",
    initials: "EL",
    rating: 5,
    text: "A café that runs like a well-loved home. Everything is calm, clean and kind — and the macarons are dangerously good.",
  },
];

/* Visit ------------------------------------------------------------------- */

export const openingHours = [
  { day: "Monday", open: "8:00", close: "20:00" },
  { day: "Tuesday", open: "8:00", close: "20:00" },
  { day: "Wednesday", open: "8:00", close: "20:00" },
  { day: "Thursday", open: "8:00", close: "20:00" },
  { day: "Friday", open: "8:00", close: "20:00" },
  { day: "Saturday", open: "9:00", close: "21:00" },
  { day: "Sunday", open: "9:00", close: "18:00" },
];

export const visitInfo = {
  address: "28 Lavender Lane, Portland, OR 97210",
  addressNote: "On the corner of Lavender & 3rd",
  phone: "(503) 555-0119",
  phoneHref: "tel:+15035550119",
  email: "hello@happypaws.cafe",
};

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function getOpenStatus(now = new Date()) {
  const todayIndex = (now.getDay() + 6) % 7; // Monday-first
  const today = openingHours[todayIndex];
  const current = now.getHours() * 60 + now.getMinutes();

  if (current >= toMinutes(today.open) && current < toMinutes(today.close)) {
    return { isOpen: true, label: `Open now · closes ${today.close}` };
  }
  return { isOpen: false, label: `Closed · opens ${today.open}` };
}

export function getTodayIndex(now = new Date()) {
  return (now.getDay() + 6) % 7;
}
