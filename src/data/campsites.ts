// Synthetic camping data for Indian states
export interface Campsite {
  id: string;
  name: string;
  location: string;
  state: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  host: {
    name: string;
    joinedDate: string;
    avatar: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  availability: string[];
  maxGuests: number;
  campingTypes: string[];
}

export const campsites: Campsite[] = [
  {
    id: "1",
    name: "Himalayan Base Camp Experience",
    location: "Manali, Himachal Pradesh",
    state: "Himachal Pradesh",
    price: 2500,
    rating: 4.8,
    reviewCount: 127,
    image: "/src/assets/camp-manali.jpg",
    images: ["/src/assets/camp-manali.jpg", "/src/assets/hero-camping.jpg"],
    description: "Experience the magic of the Himalayas with breathtaking mountain views, clear starry nights, and adventure activities. Perfect for trekkers and nature lovers seeking an authentic mountain camping experience.",
    amenities: ["Tents", "Campfire", "Mountain Views", "Trekking", "Photography", "Stargazing"],
    host: {
      name: "Rajesh Kumar",
      joinedDate: "March 2020",
      avatar: "RK"
    },
    coordinates: { lat: 32.2396, lng: 77.1887 },
    availability: ["2024-03-15", "2024-03-16", "2024-03-17"],
    maxGuests: 6,
    campingTypes: ["Tent Camping", "Adventure Camping"]
  },
  {
    id: "2",
    name: "Desert Nights Under Stars",
    location: "Jaisalmer, Rajasthan",
    state: "Rajasthan",
    price: 3200,
    rating: 4.9,
    reviewCount: 89,
    image: "/src/assets/camp-rajasthan.jpg",
    images: ["/src/assets/camp-rajasthan.jpg"],
    description: "Immerse yourself in the golden sands of Thar Desert. Enjoy camel rides, traditional Rajasthani cuisine, folk music, and unparalleled stargazing in the desert wilderness.",
    amenities: ["Luxury Tents", "Camel Safari", "Cultural Programs", "Traditional Food", "Bonfire", "Desert Safari"],
    host: {
      name: "Priya Sharma",
      joinedDate: "January 2021",
      avatar: "PS"
    },
    coordinates: { lat: 26.9157, lng: 70.9083 },
    availability: ["2024-03-15", "2024-03-16"],
    maxGuests: 4,
    campingTypes: ["Desert Camping", "Luxury Camping"]
  },
  {
    id: "3",
    name: "Backwaters Eco Camp",
    location: "Alleppey, Kerala",
    state: "Kerala",
    price: 1800,
    rating: 4.7,
    reviewCount: 156,
    image: "/src/assets/camp-kerala.jpg",
    images: ["/src/assets/camp-kerala.jpg"],
    description: "Sleep on water in our unique floating tent camp. Wake up to the sounds of nature, enjoy Kerala cuisine, and explore the serene backwaters by kayak or traditional houseboat.",
    amenities: ["Floating Tents", "Kayaking", "Bird Watching", "Kerala Cuisine", "Fishing", "Nature Walks"],
    host: {
      name: "Arjun Nair",
      joinedDate: "June 2019",
      avatar: "AN"
    },
    coordinates: { lat: 9.4981, lng: 76.3388 },
    availability: ["2024-03-16", "2024-03-17", "2024-03-18"],
    maxGuests: 8,
    campingTypes: ["Eco Camping", "Water Camping"]
  },
  {
    id: "4",
    name: "Western Ghats Wildlife Camp",
    location: "Coorg, Karnataka",
    state: "Karnataka",
    price: 2200,
    rating: 4.6,
    reviewCount: 92,
    image: "/src/assets/hero-camping.jpg",
    images: ["/src/assets/hero-camping.jpg"],
    description: "Nestled in coffee plantations with misty mountains. Perfect for wildlife enthusiasts with guided nature walks, bird watching, and plantation tours. Experience the biodiversity of Western Ghats.",
    amenities: ["Eco Tents", "Wildlife Spotting", "Coffee Tours", "Nature Guides", "Bird Watching", "Plantation Walks"],
    host: {
      name: "Lakshmi Iyer",
      joinedDate: "September 2020",
      avatar: "LI"
    },
    coordinates: { lat: 12.3375, lng: 75.8069 },
    availability: ["2024-03-15", "2024-03-17"],
    maxGuests: 5,
    campingTypes: ["Wildlife Camping", "Eco Camping"]
  },
  {
    id: "5",
    name: "Goa Beach Camp",
    location: "Arambol, Goa",
    state: "Goa",
    price: 1500,
    rating: 4.5,
    reviewCount: 201,
    image: "/src/assets/camp-kerala.jpg",
    images: ["/src/assets/camp-kerala.jpg"],
    description: "Beach camping with stunning sunsets, water sports, and vibrant nightlife. Perfect for groups looking for a fun beach experience with comfortable tents just steps from the ocean.",
    amenities: ["Beach Tents", "Water Sports", "Sunset Views", "Beach Volleyball", "Bonfire", "Music"],
    host: {
      name: "Maria Fernandes",
      joinedDate: "December 2019",
      avatar: "MF"
    },
    coordinates: { lat: 15.6869, lng: 73.7056 },
    availability: ["2024-03-16", "2024-03-18"],
    maxGuests: 10,
    campingTypes: ["Beach Camping", "Party Camping"]
  },
  {
    id: "6",
    name: "Ladakh High Altitude Camp",
    location: "Nubra Valley, Ladakh",
    state: "Ladakh",
    price: 4000,
    rating: 4.9,
    reviewCount: 67,
    image: "/src/assets/camp-manali.jpg",
    images: ["/src/assets/camp-manali.jpg"],
    description: "Experience camping at 10,000 feet altitude with panoramic views of snow-capped peaks, traditional Ladakhi culture, and clear mountain air. A once-in-a-lifetime adventure.",
    amenities: ["High Altitude Tents", "Mountain Views", "Cultural Experience", "Photography", "Meditation", "Clear Skies"],
    host: {
      name: "Tenzin Norbu",
      joinedDate: "May 2021",
      avatar: "TN"
    },
    coordinates: { lat: 34.5538, lng: 77.5754 },
    availability: ["2024-03-17", "2024-03-18"],
    maxGuests: 4,
    campingTypes: ["High Altitude Camping", "Adventure Camping"]
  }
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Ladakh"
];

export const campingTypes = [
  "Tent Camping", "RV Camping", "Glamping", "Beach Camping", "Mountain Camping",
  "Desert Camping", "Forest Camping", "Lake Camping", "Adventure Camping", 
  "Eco Camping", "Luxury Camping", "Wildlife Camping", "Family Camping"
];

export const amenities = [
  "Tents", "RV Hookups", "Campfire", "BBQ", "Restrooms", "Showers", 
  "Drinking Water", "Electricity", "WiFi", "Parking", "Pet Friendly",
  "Swimming", "Hiking Trails", "Fishing", "Boat Rental", "Playground"
];