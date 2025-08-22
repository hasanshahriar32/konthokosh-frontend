import {
  GlobeLock,
  Music,
  NotebookPen,
  Palette,
  PanelLeftOpen,
  ShieldBan,
  Users,
  UserSearch,
  VenetianMask,
  Signature,
  History,
  HardDrive,
  Wallet,
} from "lucide-react";

export const hero = {
  title: "বাংলার ঐতিহ্য",
  subtitle: "সহস্র বছরের সাংস্কৃতিক ঐতিহ্যের আলোকবর্তিকা",
  categories: "শিল্প • সাহিত্য • সংগীত • ঐতিহ্য",
  imageSrc: "/images/bengali-street-scene.jpg",
  imageAlt: "বাংলার রাস্তার দৃশ্য - নতুন চা দোকান",
  bottomImageSrc: "/images/bengali-header-logo.png",
  bottomImageAlt: "কৃষ্ণ অগ্নি - নায়ের রোহ",
};

export const culture = {
  title: " আমাদের সাংস্কৃতিক ঐতিহ্য",
  description:
    "বাংলার হাজার বছরের সমৃদ্ধ সংস্কৃতি আজও আমাদের জীবনে প্রবাহমান। আমাদের ভাষা, সাহিত্য, সংগীত, নৃত্য, শিল্পকলা - সবকিছুতেই রয়েছে অনন্য বৈশিষ্ট্য।",
  categories: [
    {
      icon: VenetianMask,
      title: "নাটক ও যাত্রা",

      description:
        "বাংলার ঐতিহ্যবাহী নাটক, যাত্রাপালা এবং লোকনাট্যের সমৃদ্ধ ইতিহাস। গ্রামীণ জীবনের গল্প থেকে শুরু করে পৌরাণিক কাহিনী - সবই উঠে এসেছে আমাদের মঞ্চে।",
    },
    {
      icon: Music,
      title: "সংগীত ও কবিতা",

      description:
        "রবীন্দ্রসংগীত, নজরুলগীতি, বাউল গান, ভাটিয়ালি, ভাওয়াইয়া - আমাদের সংগীতের ভাণ্ডার অফুরন্ত। প্রতিটি সুরে লুকিয়ে আছে বাঙালির হৃদয়ের কথা।",
    },
    {
      icon: Palette,
      title: "শিল্প ও কারুকাজ",

      description:
        "কাঁথা, শাড়ি, পটচিত্র, মৃৎশিল্প, কাঠের কাজ, পিতলের কাজ - আমাদের হস্তশিল্পে রয়েছে অপূর্ব কারুকার্য। প্রতিটি নিদর্শনে ফুটে উঠেছে শিল্পীর মনের কথা।",
    },
  ],
};

export const safePlatform = {
  title: "নিরাপদ লেখালেখির প্ল্যাটফর্ম",
  description:
    "আমাদের প্ল্যাটফর্মে আপনি নিরাপদে আপনার ব্লগ, প্রবন্ধ, কবিতা এবং গল্প শেয়ার করতে পারবেন। ব্লকচেইন প্রযুক্তির মাধ্যমে আমরা নিশ্চিত করি যে আপনার লেখা চুরি হবে না।",
  features: [
    {
      icon: GlobeLock,
      title: "নিরাপত্তা",
      description: "ব্লকচেইন প্রযুক্তিতে সুরক্ষিত",
    },
    {
      icon: NotebookPen,
      title: "স্বাধীনতা",
      description: "ভয় ছাড়াই লিখুন",
    },
    {
      icon: ShieldBan,
      title: "চুরি প্রতিরোধ",
      description: "প্লেজিয়ারিজম প্রুফ সিস্টেম",
    },
  ],
  imageAlt: "শহীদ মিনার",
  imageSrc: "/images/shaheed-minar.jpg",
};

export const alternatingContentSections = [
  {
    title: "আপনার সৃজনশীল যাত্রা",
    description:
      "প্রতিটি লেখক, কবি এবং গল্পকারের একটি অনন্য যাত্রা রয়েছে। আমাদের প্ল্যাটফর্মে আপনি আপনার চিন্তাভাবনা, অভিজ্ঞতা এবং কল্পনাকে নিরাপদে প্রকাশ করতে পারবেন।",
    button: "যাত্রা শুরু করুন",
    imageAlt: "ট্রেন স্টেশন",
    imageSrc: "/images/train-station.jpg",
    reverse: false,
  },
  {
    title: "মুক্ত চিন্তার স্বাধীনতা",
    description:
      "আমাদের পূর্বপুরুষরা যে স্বাধীনতার জন্য লড়াই করেছেন, সেই স্বাধীনতার চেতনায় আমরা আপনাকে মুক্ত চিন্তা প্রকাশের সুযোগ দিচ্ছি।",
    button: "স্বাধীনভাবে লিখুন",
    imageAlt: "স্বাধীনতার শিল্প",
    imageSrc: "/images/independence-art.jpg",
    reverse: true,
  },
];

export const communityPower = {
  title: "সম্প্রদায়ের শক্তি",
  description:
    "আমাদের প্ল্যাটফর্মে লেখক, পাঠক এবং সমালোচকদের একটি সক্রিয় সম্প্রদায় রয়েছে। এখানে আপনি আপনার লেখার উপর মতামত পাবেন এবং অন্যদের সাথে আলোচনায় অংশ নিতে পারবেন।",
  imageAlt: "রিকশা পার্ক",
  imageSrc: "/images/rickshaw-park.jpg",
  communityItem: [
    {
      icon: Users,
      title: "পাঠক সম্প্রদায়",
      description: "হাজারো পাঠকের সাথে যুক্ত হন",
    },
    {
      icon: UserSearch,
      title: "লেখক নেটওয়ার্ক",
      description: "অভিজ্ঞ লেখকদের সাথে শিখুন",
    },
  ],
};

export const featureSections = [
  {
    imageSrc: "/images/rainy-street.jpg",
    imageAlt: "বৃষ্টির রাস্তা",
    title: "বৃষ্টির দিনের গল্প",
    description:
      "বর্ষার দিনে রিকশায় চড়ে যাওয়ার সেই অনুভূতি, বৃষ্টিতে ভিজে যাওয়ার আনন্দ - এসব গল্প আমাদের প্ল্যাটফর্মে শেয়ার করুন। প্রতিটি বৃষ্টির ফোঁটায় লুকিয়ে আছে অসংখ্য স্মৃতি।",
    button: "বৃষ্টির গল্প লিখুন",
    reverse: true,
    colorScheme: {
      gradient: "bg-gradient-to-br from-yellow-50 to-orange-50",
      title: "text-orange-800",
      button: "bg-orange-600",
      buttonHover: "hover:bg-orange-700",
    },
  },
  {
    imageSrc: "/images/bengali-comic.jpg",
    imageAlt: "বাংলা কমিক",
    title: "হাস্যরসের জগৎ",
    description:
      "বাংলার হাস্যরস, কমিক্স এবং ব্যঙ্গচিত্রের ঐতিহ্য অনেক পুরানো। আমাদের প্ল্যাটফর্মে আপনি আপনার মজার গল্প, কার্টুন এবং হাস্যকর অভিজ্ঞতা শেয়ার করতে পারেন।",
    button: "হাসির গল্প শেয়ার করুন",
    colorScheme: {
      gradient: "bg-gradient-to-br from-teal-50 to-blue-50",
      title: "text-teal-800",
      button: "bg-teal-600",
      buttonHover: "hover:bg-teal-700",
    },
  },
  {
    imageSrc: "/images/covered-walkway.jpg",
    imageAlt: "আচ্ছাদিত পথ",
    title: "শহরের গলিপথ",
    description:
      "পুরান ঢাকার গলিপথ, কলকাতার পাড়া-মহল্লা, চট্টগ্রামের পাহাড়ি এলাকা - প্রতিটি জায়গার নিজস্ব গল্প আছে। আপনার এলাকার গল্প আমাদের সাথে শেয়ার করুন।",
    button: "এলাকার গল্প লিখুন",
    reverse: true,
    colorScheme: {
      gradient: "bg-gradient-to-br from-indigo-50 to-purple-50",
      title: "text-indigo-800",
      button: "bg-indigo-600",
      buttonHover: "hover:bg-indigo-700",
    },
  },
  {
    imageSrc: "/images/freedom-speech.jpg",
    imageAlt: "বাক স্বাধীনতা",
    title: "বাক স্বাধীনতার গুরুত্ব",
    description:
      "মত প্রকাশের স্বাধীনতা আমাদের মৌলিক অধিকার। আমাদের প্ল্যাটফর্মে আপনি নিরাপদে আপনার মতামত প্রকাশ করতে পারবেন। কোনো ভয় বা দ্বিধা ছাড়াই আপনার কথা বলুন।",
    button: "মতামত প্রকাশ করুন",
    colorScheme: {
      gradient: "bg-gradient-to-br from-pink-50 to-red-50",
      title: "text-pink-800",
      button: "bg-pink-600",
      buttonHover: "hover:bg-pink-700",
    },
  },
];

export const technology = {
  title: "আধুনিক প্রযুক্তি",
  description:
    "ব্লকচেইন প্রযুক্তি ব্যবহার করে আমরা নিশ্চিত করি যে আপনার প্রতিটি লেখা সুরক্ষিত থাকে। কেউ আপনার লেখা চুরি করতে পারবে না এবং আপনি সর্বদা আপনার কাজের মালিকানা প্রমাণ করতে পারবেন।",
  blockchainTitle: "ব্লকচেইন সুরক্ষা",
  features: [
    {
      icon: Signature,
      text: "প্রতিটি লেখার জন্য অনন্য ডিজিটাল স্বাক্ষর"
    },
    {
      icon: History,
      text: "অপরিবর্তনীয় টাইমস্ট্যাম্প"
    },
    {
      icon: HardDrive,
      text: "বিকেন্দ্রীভূত সংরক্ষণ ব্যবস্থা"
    },
    {
      icon: Wallet,
      text: "স্বচ্ছ মালিকানা প্রমাণ"
    },
  ],
  imageAlt: "বাংলা টাইপোগ্রাফি",
  imageSrc: "/images/bengali-typography.webp",
};

export const ourPlatform = {
  title: "আমাদের প্ল্যাটফর্মের পরিচয়",
  description:
    "এই ভিডিওতে দেখুন কিভাবে আমাদের প্ল্যাটফর্ম আপনার সৃজনশীল কাজকে সুরক্ষিত রাখে এবং বাংলা সাহিত্যের নতুন দিগন্ত উন্মোচন করে।",
  videoSrc:
    "https://pub-91b6dab2710249aebab317bffbbcd649.r2.dev/a7273cd356998459a075dd8dcfff8603.mp4",
  videoAlt: "আপনার ব্রাউজার ভিডিও সাপোর্ট করে না।",
};

export const cta = {
  title: "আজই শুরু করুন",
  description:
    "আপনার সৃজনশীলতাকে নিরাপদ পরিবেশে প্রকাশ করুন। আমাদের সাথে যোগ দিন এবং বাংলা সাহিত্যের নতুন অধ্যায় রচনা করুন।",
  registerButton: "নিবন্ধন করুন",
  learnMoreButton: "আরও জানুন",
};

export const quote = {
  text: "যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই,\nপাইলেও পাইতে পার অমূল্য রতন।",
  author: "কবি নজরুল ইসলাম",
};

export const footer = {
  title: "কণ্ঠ কোষ",
  description: "আমাদের ঐতিহ্য সংরক্ষণ ও প্রচারে আমরা প্রতিশ্রুতিবদ্ধ",
  copyright: "© ২০২৫ কণ্ঠকোষ. সর্বস্বত্ব সংরক্ষিত.",
  links: [
    { name: "যোগাযোগ", href: "/contact" },
    { name: "সম্পর্কে", href: "/about" },
    { name: "সংগ্রহ", href: "/collection" },
  ],
};
