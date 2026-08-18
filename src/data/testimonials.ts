export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
  age?: number;
  rating: number;
  product?: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "margaret",
    quote:
      "I didn't realize how much I was missing until I could hear my granddaughter's voice clearly again. The team at Beltone made the whole process feel easy, not clinical.",
    name: "Margaret H.",
    location: "Riverside, CA",
    age: 68,
    rating: 5,
    product: "Beltone Serene",
    image:
      "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "robert",
    quote:
      "My hearing care provider took the time to explain everything and never rushed me. Three months later, I'm back to enjoying dinners out with friends.",
    name: "Robert T.",
    location: "Chicago, IL",
    age: 74,
    rating: 5,
    product: "Beltone Amplify",
    image:
      "https://images.unsplash.com/photo-1658314755819-72c38b317e61?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "linda",
    quote:
      "The free hearing test gave me the push I needed. I'd been putting it off for years — I wish I'd done it sooner.",
    name: "Linda S.",
    location: "Seattle, WA",
    age: 61,
    rating: 5,
    product: "Beltone Align",
    image:
      "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "james",
    quote:
      "As someone who works outdoors, I needed something durable and simple. My Beltone devices have held up perfectly, rain or shine.",
    name: "James O.",
    location: "Atlanta, GA",
    age: 55,
    rating: 5,
    product: "Beltone Imagine",
    image:
      "https://images.unsplash.com/photo-1536792414922-14b978901fcd?q=80&w=400&auto=format&fit=crop",
  },
];
