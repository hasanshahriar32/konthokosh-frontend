import { SignIn } from "@clerk/nextjs";
import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  BRAND_NAME,
  TRUST_INDICATORS,
  AUTH_CONTENT,
  TESTIMONIAL,
  NAVIGATION,
  METAMASK_REQUIREMENT,
} from "@/constants/auth";

/**
 * 🔐 Unified authentication page component with MetaMask integration
 *
 * IMPORTANT: To enable Web3/MetaMask authentication through Clerk:
 * 1. Go to your Clerk Dashboard > SSO Connections
 * 2. Enable Web3 authentication (MetaMask)
 * 3. Configure the Web3 settings in your Clerk dashboard
 * 4. Set up proper environment variables for Web3 support
 *
 * The SignIn component will automatically show Web3 authentication options
 * when properly configured in the Clerk dashboard.
 */
const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Header */}
      <header className="absolute top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white group-hover:scale-105 transition-transform duration-200">
                <Icons.Shield className="h-5 w-5" />
              </div>
              <span 
                className="text-xl font-bold text-white bengali-text-shadow"
                style={{ fontFamily: "var(--font-kalpurush)" }}
              >
                {BRAND_NAME}
              </span>
            </Link>

            {/* Back to Home */}
            <Link href="/">
              <Button
                variant="ghost"
                className="group text-white hover:bg-white/20 hover:text-white border-white/30 font-bengali transition-colors"
              >
                <Icons.ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                {NAVIGATION.backToHome}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-6 pt-20 pb-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Hero Section */}
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700 ring-1 ring-red-200 font-bengali">
                <Icons.Shield className="h-4 w-4" />
                <span>{AUTH_CONTENT.badge}</span>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-red-800 sm:text-5xl lg:text-6xl bengali-text-shadow">
                <span 
                  className="block"
                  style={{ fontFamily: "var(--font-baloo-da-2)" }}
                >
                  {AUTH_CONTENT.title.line1}
                </span>
                <span 
                  className="block text-red-600 mt-2"
                  style={{ fontFamily: "var(--font-kalpurush)" }}
                >
                  {AUTH_CONTENT.title.line2}
                </span>
              </h1>
              <p 
                className="text-xl leading-8 text-gray-700 max-w-2xl font-bengali"
                style={{ fontFamily: "var(--font-tiro-bangla)" }}
              >
                {AUTH_CONTENT.description}
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {TRUST_INDICATORS.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${indicator.bgColor} mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <indicator.icon
                      className={`h-6 w-6 ${indicator.iconColor}`}
                    />
                  </div>
                  <div 
                    className="text-2xl font-bold text-red-800"
                    style={{ fontFamily: "var(--font-baloo-da-2)" }}
                  >
                    {indicator.value}
                  </div>
                  <div 
                    className="text-sm text-gray-600 font-bengali"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    {indicator.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-shadow border-l-4 border-l-red-300 hover:border-l-red-500 duration-300 group">
              <blockquote 
                className="text-sm italic text-gray-700 leading-relaxed font-bengali"
                style={{ fontFamily: "var(--font-tiro-bangla)" }}
              >
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </blockquote>
              <footer className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Icons.User className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div 
                    className="text-xs font-medium text-red-800 font-bengali"
                    style={{ fontFamily: "var(--font-kalpurush)" }}
                  >
                    {TESTIMONIAL.author.name}
                  </div>
                  <div 
                    className="text-xs text-gray-600 font-bengali"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    {TESTIMONIAL.author.title}
                  </div>
                </div>
              </footer>
            </Card>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="relative">
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-2xl border border-red-200/50 shadow-2xl" />

                <div className="relative p-8">
                  {/* Web3/MetaMask Auth Component */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <h2 
                        className="text-2xl font-bold text-red-800 bengali-text-shadow"
                        style={{ fontFamily: "var(--font-kalpurush)" }}
                      >
                        আপনার ওয়ালেট সংযুক্ত করুন
                      </h2>
                      <p 
                        className="text-sm text-gray-700 font-bengali"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        বিকেন্দ্রীভূত কন্টেন্ট সুরক্ষা প্ল্যাটফর্মে প্রবেশের জন্য MetaMask দিয়ে সংযুক্ত হন
                      </p>
                    </div>

                    {/* MetaMask Connection through Clerk */}
                    <SignIn
                      appearance={{
                        elements: {
                          formButtonPrimary:
                            "bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] font-bengali",
                          card: "shadow-none border-0 bg-transparent p-0",
                          rootBox: "w-full",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                          socialButtonsBlockButton:
                            "border-red-200 hover:bg-red-50 rounded-full transition-all duration-200 bg-gradient-to-r from-orange-50/80 to-orange-100/80 border-orange-300/40 hover:border-orange-500/60",
                          socialButtonsBlockButtonText:
                            "text-red-800 font-medium font-bengali",
                          formFieldInput:
                            "border-red-200 bg-white/80 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-red-300/40 focus:border-red-400 transition-all duration-200",
                          footerActionLink:
                            "text-red-600 hover:text-red-700 font-medium transition-colors duration-200 font-bengali",
                          dividerLine: "bg-red-200",
                          dividerText: "text-gray-600 text-xs font-bengali",
                          formFieldLabel: "text-red-800 font-medium font-bengali",
                          identityPreviewText: "text-red-800 font-bengali",
                          identityPreviewEditButton:
                            "text-red-600 hover:text-red-700",
                          socialButtonsProviderIcon: "w-5 h-5",
                        },
                        layout: {
                          socialButtonsPlacement: "top",
                          socialButtonsVariant: "blockButton",
                          showOptionalFields: false,
                        },
                      }}
                      redirectUrl="/dashboard"
                      signUpUrl="/auth"
                    />

                    {/* MetaMask Installation Requirement */}
                    <div className="mt-8 space-y-4">
                      <div 
                        className="text-xs text-center text-gray-600 font-bengali"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        {METAMASK_REQUIREMENT.sectionTitle}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/60 border border-orange-200/50 hover:border-orange-300/70 transition-colors duration-300">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                            <Icons.Download className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="text-sm flex-1">
                            <div 
                              className="font-medium text-red-800 font-bengali"
                              style={{ fontFamily: "var(--font-kalpurush)" }}
                            >
                              {METAMASK_REQUIREMENT.installTitle}
                            </div>
                            <div 
                              className="text-gray-600 text-xs font-bengali"
                              style={{ fontFamily: "var(--font-bengali)" }}
                            >
                              {METAMASK_REQUIREMENT.installDescription}
                            </div>
                          </div>
                          <Link
                            href={METAMASK_REQUIREMENT.installUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-orange-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-orange-700 transition-all duration-200 shadow-sm hover:shadow-md font-bengali"
                          >
                            <Icons.Download className="h-3 w-3" />
                            {METAMASK_REQUIREMENT.installButtonText}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default AuthPage;
