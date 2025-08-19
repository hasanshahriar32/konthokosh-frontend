/**
 * 🔐 Authentication types for Clerk integration
 */

import { Icons } from "@/components/common/Icons";

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
};

export type AuthState = {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: User | null;
};

export type AuthAction = "connect" | "disconnect" | "profile";

export type TrustIndicator = {
  icon: typeof Icons.Shield;
  value: string;
  label: string;
  bgColor: string;
  iconColor: string;
};

export type AuthContentMode = {
  badge: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
};

export type FeatureHighlight = {
  icon: typeof Icons.Lock;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
};
