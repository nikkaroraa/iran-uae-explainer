export interface Topic {
  slug: string;
  title: string;
  wikipediaTitle: string;
  emoji: string;
  category: "weapons" | "defense" | "geography" | "organizations" | "concepts";
  relatedSlugs: string[];
}

export const TOPICS: Topic[] = [
  // Weapons
  {
    slug: "ballistic-missiles",
    title: "Ballistic Missiles",
    wikipediaTitle: "Ballistic_missile",
    emoji: "🚀",
    category: "weapons",
    relatedSlugs: ["hypersonic-missiles", "thaad", "patriot", "air-defense"],
  },
  {
    slug: "hypersonic-missiles",
    title: "Hypersonic Missiles",
    wikipediaTitle: "Hypersonic_speed",
    emoji: "⚡",
    category: "weapons",
    relatedSlugs: ["ballistic-missiles", "air-defense", "thaad"],
  },
  {
    slug: "shahed-drones",
    title: "Shahed Drones",
    wikipediaTitle: "HESA_Shahed_136",
    emoji: "🛩️",
    category: "weapons",
    relatedSlugs: ["air-defense", "ballistic-missiles", "escalation"],
  },

  // Defense
  {
    slug: "thaad",
    title: "THAAD Missile Defense",
    wikipediaTitle: "Terminal_High_Altitude_Area_Defense",
    emoji: "🛡️",
    category: "defense",
    relatedSlugs: ["patriot", "air-defense", "ballistic-missiles", "centcom"],
  },
  {
    slug: "patriot",
    title: "Patriot Missile System",
    wikipediaTitle: "MIM-104_Patriot",
    emoji: "🎯",
    category: "defense",
    relatedSlugs: ["thaad", "air-defense", "ballistic-missiles", "centcom"],
  },
  {
    slug: "air-defense",
    title: "Air Defense Systems",
    wikipediaTitle: "Air_defense",
    emoji: "🔰",
    category: "defense",
    relatedSlugs: ["thaad", "patriot", "ballistic-missiles", "shahed-drones"],
  },

  // Geography
  {
    slug: "strait-of-hormuz",
    title: "Strait of Hormuz",
    wikipediaTitle: "Strait_of_Hormuz",
    emoji: "🌊",
    category: "geography",
    relatedSlugs: ["oil-markets", "fujairah", "escalation"],
  },
  {
    slug: "jebel-ali",
    title: "Jebel Ali",
    wikipediaTitle: "Jebel_Ali",
    emoji: "🏗️",
    category: "geography",
    relatedSlugs: ["fujairah", "al-dhafra", "oil-markets"],
  },
  {
    slug: "al-dhafra",
    title: "Al Dhafra Air Base",
    wikipediaTitle: "Al_Dhafra_Air_Base",
    emoji: "🛫",
    category: "geography",
    relatedSlugs: ["centcom", "thaad", "patriot", "jebel-ali"],
  },
  {
    slug: "fujairah",
    title: "Fujairah",
    wikipediaTitle: "Fujairah",
    emoji: "⛽",
    category: "geography",
    relatedSlugs: ["strait-of-hormuz", "oil-markets", "jebel-ali"],
  },

  // Organizations
  {
    slug: "centcom",
    title: "US CENTCOM",
    wikipediaTitle: "United_States_Central_Command",
    emoji: "🇺🇸",
    category: "organizations",
    relatedSlugs: ["al-dhafra", "thaad", "patriot", "air-defense"],
  },
  {
    slug: "ncema",
    title: "NCEMA (UAE Emergency Authority)",
    wikipediaTitle: "National_Emergency_Crisis_and_Disasters_Management_Authority",
    emoji: "🏛️",
    category: "organizations",
    relatedSlugs: ["airspace-closure", "escalation"],
  },

  // Concepts
  {
    slug: "ceasefire",
    title: "Ceasefire",
    wikipediaTitle: "Ceasefire",
    emoji: "🕊️",
    category: "concepts",
    relatedSlugs: ["escalation", "centcom"],
  },
  {
    slug: "escalation",
    title: "Military Escalation",
    wikipediaTitle: "Escalation",
    emoji: "📈",
    category: "concepts",
    relatedSlugs: ["ceasefire", "ballistic-missiles", "airspace-closure"],
  },
  {
    slug: "airspace-closure",
    title: "Airspace Closure",
    wikipediaTitle: "Airspace",
    emoji: "🚫",
    category: "concepts",
    relatedSlugs: ["ncema", "escalation"],
  },
  {
    slug: "oil-markets",
    title: "Oil Markets & Energy",
    wikipediaTitle: "Price_of_oil",
    emoji: "🛢️",
    category: "concepts",
    relatedSlugs: ["strait-of-hormuz", "fujairah", "jebel-ali"],
  },
];

export const TOPIC_CATEGORIES = {
  weapons: { label: "Weapons & Munitions", emoji: "🚀" },
  defense: { label: "Defense Systems", emoji: "🛡️" },
  geography: { label: "Key Locations", emoji: "📍" },
  organizations: { label: "Organizations", emoji: "🏛️" },
  concepts: { label: "Key Concepts", emoji: "💡" },
} as const;

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
