import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { paths, routes } from "@/constants";
import {
  AUTH_CONTENT,
  SUBTITLE,
  TITLE,
  TRUST_INDICATORS,
} from "@/constants/auth";
import { SignIn } from "@clerk/nextjs";
import { ArrowLeft, CircleAlert } from "lucide-react";
import Link from "next/link";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-surface-default">
      <div className="relative flex min-h-screen items-center justify-center px-6 pt-20 pb-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:pr-8">
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium font-bengali bg-secondary text-secondary-foreground border border-border">
                <Icons.Shield className="h-4 w-4" />
                <span>{AUTH_CONTENT.badge}</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-5xl">
                <span className="block font-baloo-da-2">
                  {AUTH_CONTENT.title.line1}
                </span>
                <span className="block mt-2 font-kalpurush text-primary">
                  {AUTH_CONTENT.title.line2}
                </span>
              </h1>
              <p className="text-lg leading-7 max-w-2xl font-tiro-bangla text-muted-foreground">
                {AUTH_CONTENT.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {TRUST_INDICATORS.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full mb-3 shadow-sm bg-primary/10">
                    <indicator.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-baloo-da-2 text-foreground">
                    {indicator.value}
                  </div>
                  <div className="text-sm font-bengali text-muted-foreground">
                    {indicator.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-card/60 backdrop-blur-sm rounded-2xl border border-border shadow-md" />

                <div className="relative p-8">
                  <h2 className="heading-tertiary text-center mb-3">{TITLE}</h2>
                  <div className="flex gap-1.5 items-center justify-center">
                    <CircleAlert className="h-3.5 w-3.5 text-secondary" />
                    <p className="text-x14 text-center">{SUBTITLE}</p>
                  </div>
                  <SignIn
                    appearance={{
                      layout: {
                        socialButtonsPlacement: "top",
                        socialButtonsVariant: "blockButton",
                        showOptionalFields: false,
                      },
                    }}
                    redirectUrl={paths.feed}
                  />
                  <div className="mt-4 flex justify-center">
                    <Button asChild variant="ghost" size="sm">
                      <Link
                        href={routes.home.path}
                        className="flex items-center gap-1"
                      >
                        <ArrowLeft className="size-[14px]" />
                        <span className="text-sm">{routes.home.title}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default AuthPage;
