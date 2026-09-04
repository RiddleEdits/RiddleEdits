export interface Creator {
  name: string;
  subs: string;
  avatar: string;
  color: string;
  url: string;
}

export interface WorkItem {
  id: string;
  title: string;
  creator: string;
  youtubeId: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  subs: string;
  avatar: string;
}

export const RIDDLE_PROFILE = "/riddle-avatar.png";

export const CREATORS: Creator[] = [
  {
    name: "RageElixir",
    subs: "7.64M subs",
    avatar: "/creator-rageelixir.jpg",
    color: "#ef4444",
    url: "https://youtube.com/@rageelixir?si=e392isn3YPJcMZ9w",
  },
  {
    name: "Mia",
    subs: "758K subs",
    avatar: "/creator-mia.jpg",
    color: "#ec4899",
    url: "https://youtube.com/@mia-yt?si=pbXvp1BZEREY9arw",
  },
  {
    name: "Kwil",
    subs: "443K subs",
    avatar: "/creator-kwil.jpg",
    color: "#3b82f6",
    url: "https://youtube.com/@kw_il?si=LgE7oaSZhJod0kF6",
  },
  {
    name: "MiloBlox",
    subs: "435K subs",
    avatar: "/creator-miloblox.jpg",
    color: "#f59e0b",
    url: "https://youtube.com/@miloblox-yt?si=XAB_FGdIylu_wEBP",
  },
  {
    name: "SharkTactics",
    subs: "324K subs",
    avatar: "/creator-sharktactics.jpg",
    color: "#06b6d4",
    url: "https://youtube.com/@sharktactics?si=vQasIBO-aIW1BfmJ",
  },
  {
    name: "BeckBlox",
    subs: "182K subs",
    avatar: "/creator-thebeckblox.jpg",
    color: "#8b5cf6",
    url: "https://youtube.com/@thebeckblox?si=Vg5e12d28iFFycA1",
  },
  {
    name: "Daltyn",
    subs: "128K subs",
    avatar: "/creator-daltynblox.jpg",
    color: "#f59e0b",
    url: "https://youtube.com/@daltynblox?si=vQHt29CeIY6s6rzi",
  },
  {
    name: "Doodle Arkey Plays",
    subs: "104K subs",
    avatar: "/creator-doodlearkeyplays.jpg",
    color: "#10b981",
    url: "https://youtube.com/@doodlearkeyplays?si=cvjz6W1k9AKqNtvy",
  },
];

export const WORKS: WorkItem[] = [
  {
    id: "work-1",
    title: "GTA 5, But We Have INFINITE STARS..",
    creator: "Doodle Arkey Plays",
    youtubeId: "rJdJbEmO-ko",
  },
  {
    id: "work-2",
    title: "Surviving 100 Days in a Zombie Apocalypse..",
    creator: "Doodle Arkey Plays",
    youtubeId: "Azr4fHfz0vY",
  },
  {
    id: "work-3",
    title: "Meccha Chameleon But It’s On The GTA 5 Map..",
    creator: "Doodle Arkey Plays",
    youtubeId: "g2qjuV8N7cQ",
  },
  {
    id: "work-4",
    title: "I Rigged a NOOB vs PRO Rivals Tournament..",
    creator: "MiloBlox",
    youtubeId: "poqx6LL7iiw",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Bro genuinely cooked with this edit 😭🔥",
    name: "RageElixir",
    subs: "7.64M subs",
    avatar: "/creator-rageelixir.jpg",
  },
  {
    quote: "Honestly one of the best editors I’ve worked with",
    name: "Mia",
    subs: "758K subs",
    avatar: "/creator-mia.jpg",
  },
  {
    quote: "Bro’s editing is actually crazy",
    name: "Kwil",
    subs: "443K subs",
    avatar: "/creator-kwil.jpg",
  },
  {
    quote: "Not even gonna lie this dude is underrated 😭",
    name: "MiloBlox",
    subs: "435K subs",
    avatar: "/creator-miloblox.jpg",
  },
  {
    quote: "yo this looks so good bro, you actually cooked with this one",
    name: "SharkTactics",
    subs: "324K subs",
    avatar: "/creator-sharktactics.jpg",
  },
  {
    quote: "bro you did an insane job on this 😭 everything looks so clean",
    name: "Doodle Arkey Plays",
    subs: "104K subs",
    avatar: "/creator-doodlearkeyplays.jpg",
  },
  {
    quote: "holy shit bro this is so much better than i expected. you cooked",
    name: "BeckBlox",
    subs: "182K subs",
    avatar: "/creator-thebeckblox.jpg",
  },
  {
    quote: "nah this edit is crazy 😭 the pacing and visuals are actually so good bro",
    name: "Daltyn",
    subs: "128K subs",
    avatar: "/creator-daltynblox.jpg",
  },
];
