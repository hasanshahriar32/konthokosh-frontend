import { Icons } from "@/components/common/Icons";
import type {
  TrustIndicator,
  AuthContentMode,
  FeatureHighlight,
} from "@/types/auth";

export const BRAND_NAME = "কণ্ঠ কোষ";

export const TRUST_INDICATORS: TrustIndicator[] = [
  {
    icon: Icons.Shield,
    value: "১০০%",
    label: "নিরাপত্তা",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    icon: Icons.Brain,
    value: "AI",
    label: "সনাক্তকরণ",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Icons.Zap,
    value: "তাৎক্ষণিক",
    label: "যাচাইকরণ",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Icons.Globe,
    value: "বিশ্বব্যাপী",
    label: "নেটওয়ার্ক",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
];

export const AUTH_CONTENT: AuthContentMode = {
  badge: "নিরাপদ • বিকেন্দ্রীভূত • ব্লকচেইন-চালিত",
  title: {
    line1: "যুক্ত হোন",
    line2: "কণ্ঠ কোষে",
  },
  description:
    "আপনার বুদ্ধিবৃত্তিক সম্পদ রক্ষা করুন ব্লকচেইন-যাচাইকৃত মৌলিকত্বের মাধ্যমে। আপনার MetaMask ওয়ালেট দিয়ে সংযুক্ত হন।",
};

export const TESTIMONIAL = {
  quote:
    "কণ্ঠ কোষ আমার লেখা সুরক্ষার উপায় বদলে দিয়েছে। আমার কাজ ব্লকচেইন-যাচাইকৃত জেনে যে মানসিক শান্তি পাই তা অমূল্য।",
  author: {
    name: "সারা চেন",
    title: "ডিজিটাল কন্টেন্ট নির্মাতা",
  },
};

export const NAVIGATION = {
  backToHome: "প্রচ্ছদে ফিরুন",
};

export const METAMASK_REQUIREMENT = {
  sectionTitle: "MetaMask ব্রাউজার এক্সটেনশন প্রয়োজন",
  installTitle: "MetaMask এক্সটেনশন ইনস্টল করুন",
  installDescription: "Web3 প্রমাণীকরণের জন্য প্রয়োজনীয়",
  installUrl: "https://metamask.io/download/",
  installButtonText: "ইনস্টল",
};

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    icon: Icons.Lock,
    title: "ব্লকচেইন নিরাপত্তা",
    description: "অপরিবর্তনীয় মালিকানার প্রমাণ",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    icon: Icons.Search,
    title: "স্মার্ট সনাক্তকরণ",
    description: "উন্নত চুরি বিশ্লেষণ",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Icons.Award,
    title: "যাচাইকৃত সার্টিফিকেট",
    description: "ডাউনলোডযোগ্য সত্যতার প্রমাণ",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Icons.TrendingUp,
    title: "বিশ্লেষণ ড্যাশবোর্ড",
    description: "সুরক্ষা মেট্রিক্স ট্র্যাক করুন",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
];
