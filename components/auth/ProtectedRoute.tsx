"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { RESTRICT } from "@/constants/restrict";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import PageLoader from "../common/PageLoader";

type ProtectedRouteProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/**
 * 🔐 Protected route wrapper that ensures user is authenticated
 *
 * @param children - Content to render when authenticated
 * @param fallback - Optional custom fallback for unauthenticated users
 */
const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <PageLoader message={RESTRICT.loading} />;
  }

  if (!isSignedIn) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Icons.Lock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="heading-tertiary !text-primary">{RESTRICT.title}</h2>
            <p className="text-muted-foreground max-w-md font-bengali leading-relaxed">
              {RESTRICT.description}
            </p>
          </div>
          <div className="flex justify-center">
            <Link href={RESTRICT.authPath}>
              <Button className="bg-primary text-primary-foreground font-bengali px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105">
                <Icons.Wallet className="mr-2 h-4 w-4" />
                {RESTRICT.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
