import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants";
import {
  AUTH_CONTENT,
  BRAND_NAME,
  NAVIGATION,
  SUBTITLE,
  TITLE,
  TRUST_INDICATORS,
} from "@/constants/auth";
import { SignIn } from "@clerk/nextjs";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-surface-default">
      <header className="absolute top-0 w-full z-50 bg-white/60 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={paths.home} className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg group-hover:scale-105 transition-transform duration-200 bg-primary text-primary-foreground">
                <Icons.Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bengali-text-shadow font-kalpurush text-foreground">
                {BRAND_NAME}
              </span>
            </Link>

            <Link href={paths.home}>
              <Button variant="ghost" className="group" size={"sm"}>
                <Icons.ArrowRight className="mr-1.5 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                {NAVIGATION.backToHome}
              </Button>
            </Link>
          </div>
        </div>
      </header>

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
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-5xl">
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
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md" />

                <div className="relative p-8">
                  <h2 className="heading-tertiary text-center mb-3">{TITLE}</h2>
                  <div className="flex gap-1.5 items-center justify-center">
                    <CircleAlert className="size-[14px] text-secondary" />
                    <p className="text-x14 text-center">{SUBTITLE}</p>
                  </div>
                  <SignIn
                    appearance={{
                      elements: {
                        formButtonPrimary:
                          "bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all duration-200 shadow-sm font-bengali",
                        card: "shadow-none border-0 bg-transparent p-0",
                        rootBox: "w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton:
                          "border-gray-200 hover:bg-gray-50 rounded-full transition-all duration-200 bg-white",
                        socialButtonsBlockButtonText:
                          "text-gray-900 font-medium font-bengali",
                        formFieldInput:
                          "border-gray-200 bg-white rounded-md focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all duration-150",
                        dividerLine: "bg-gray-100",
                        dividerText: "text-gray-500 text-xs font-bengali",
                        formFieldLabel:
                          "text-gray-900 font-medium font-bengali",
                        identityPreviewText: "text-gray-900 font-bengali",
                        identityPreviewEditButton:
                          "text-indigo-600 hover:text-indigo-700",
                        socialButtonsProviderIcon: "w-5 h-5",
                      },
                      layout: {
                        socialButtonsPlacement: "top",
                        socialButtonsVariant: "blockButton",
                        showOptionalFields: false,
                      },
                    }}
                    redirectUrl={paths.feed}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-50/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default AuthPage;
