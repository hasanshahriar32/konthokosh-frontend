"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";

const DashboardPage = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [tokenStatus, setTokenStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientToken, setClientToken] = useState<string>("");

  /**
   * 🎯 Get JWT token on the client side
   */
  const handleGetClientToken = async () => {
    setIsLoading(true);
    setTokenStatus("Getting client-side token...");

    try {
      if (!getToken) {
        setTokenStatus("❌ getToken not available");
        return;
      }

      const token = await getToken();
      if (token) {
        setClientToken(token);
        setTokenStatus(
          `✅ Client token retrieved! Length: ${token.length} chars`
        );
        console.log("🎯 Client-side JWT Token:", token);

        // Decode and log token parts
        try {
          const tokenParts = token.split(".");
          const payload = JSON.parse(
            Buffer.from(tokenParts[1], "base64url").toString("utf-8")
          );
          console.log(
            "📄 Client Token Payload:",
            JSON.stringify(payload, null, 2)
          );
        } catch (decodeError) {
          console.error("❌ Error decoding client token:", decodeError);
        }
      } else {
        setTokenStatus("❌ No token received");
      }
    } catch (error) {
      console.error("Client token error:", error);
      setTokenStatus(
        `❌ Error getting client token: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🔐 Trigger JWT token logging on the server
   */
  const handleLogToken = async () => {
    setIsLoading(true);
    setTokenStatus("Fetching token...");

    try {
      const response = await fetch("/api/debug/token");
      const data = await response.json();

      if (response.ok) {
        setTokenStatus(
          `✅ Token logged to console! User ID: ${data.userId} | Token Length: ${data.tokenLength} chars`
        );
        console.log("🎯 Token debug response:", data);
      } else {
        setTokenStatus(`❌ Error: ${data.error || "Unknown error"}`);
        console.error("API Error Response:", data);
      }
    } catch (error) {
      console.error("Token fetch error:", error);
      setTokenStatus(
        `❌ Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🔗 Trigger user data API call (which also logs token)
   */
  const handleUserApiCall = async () => {
    setIsLoading(true);
    setTokenStatus("Calling user API...");

    try {
      const response = await fetch("/api/user");
      const data = await response.json();

      if (response.ok) {
        setTokenStatus(
          `✅ User API called successfully! Check console for token. Protected docs: ${
            data.data?.protectedDocuments || 0
          }`
        );
        console.log("👤 User API response:", data);
      } else {
        setTokenStatus(`❌ Error: ${data.error || "Unknown error"}`);
        console.error("User API Error Response:", data);
      }
    } catch (error) {
      console.error("User API error:", error);
      setTokenStatus(
        `❌ Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold text-red-800 mb-2 bengali-text-shadow"
              style={{ fontFamily: "var(--font-kalpurush)" }}
            >
              স্বাগতম, {user?.firstName || "ব্যবহারকারী"}!
            </h1>
            <p 
              className="text-gray-700 font-bengali leading-relaxed"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              আপনার কন্টেন্ট সুরক্ষা পরিচালনা করুন এবং ব্লকচেইন প্রযুক্তির মাধ্যমে সত্যতা যাচাই করুন।
            </p>
          </div>

          {/* JWT Token Debug Section */}
          <Card className="mb-8 p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 
              className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-800"
              style={{ fontFamily: "var(--font-kalpurush)" }}
            >
              <Icons.Shield className="h-5 w-5 text-red-600" />
              JWT টোকেন ডিবাগ কনসোল
            </h2>
            <p 
              className="text-sm text-gray-700 mb-4 font-bengali leading-relaxed"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              সার্ভার কনসোলে JWT টোকেন লগিং ট্রিগার করতে নিচের বোতামগুলিতে ক্লিক করুন। টোকেনের বিস্তারিত দেখতে আপনার টার্মিনাল/সার্ভার লগ চেক করুন।
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <Button
                onClick={handleGetClientToken}
                disabled={isLoading}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bengali px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <Icons.Shield className="h-4 w-4 animate-heartbeat" />
                ) : (
                  <Icons.Gem className="h-4 w-4" />
                )}
                ক্লায়েন্ট টোকেন পান
              </Button>

              <Button
                onClick={handleLogToken}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white hover:bg-orange-50 text-red-700 border border-red-200 hover:border-red-300 font-bengali px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <Icons.Shield className="h-4 w-4 animate-heartbeat" />
                ) : (
                  <Icons.Search className="h-4 w-4" />
                )}
                সার্ভার টোকেন ডিবাগ
              </Button>

              <Button
                onClick={handleUserApiCall}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white hover:bg-orange-50 text-red-700 border border-red-200 hover:border-red-300 font-bengali px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <Icons.Shield className="h-4 w-4 animate-heartbeat" />
                ) : (
                  <Icons.FileText className="h-4 w-4" />
                )}
                ব্যবহারকারী API কল
              </Button>
            </div>

            {tokenStatus && (
              <div className="p-3 rounded-lg bg-white/80 border border-red-200">
                <p 
                  className="text-sm font-mono text-gray-700"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  {tokenStatus}
                </p>
              </div>
            )}

            {clientToken && (
              <div className="mt-4 p-4 rounded-lg bg-orange-50 border border-orange-200">
                <h4 
                  className="font-medium text-sm text-orange-800 mb-2"
                  style={{ fontFamily: "var(--font-kalpurush)" }}
                >
                  ক্লায়েন্ট-সাইড JWT টোকেন:
                </h4>
                <div className="bg-white/80 p-3 rounded border border-orange-200">
                  <p className="text-xs font-mono break-all text-gray-700">{clientToken}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Debug: User Object Display */}
          {user && (
            <Card className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
              <h2 
                className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-800"
                style={{ fontFamily: "var(--font-kalpurush)" }}
              >
                <Icons.Shield className="h-5 w-5 text-yellow-600" />
                ব্যবহারকারী অবজেক্ট ডিবাগ তথ্য
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 
                    className="font-medium text-sm text-yellow-700 mb-2"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    মৌলিক তথ্য:
                  </h3>
                  <pre className="bg-white/80 p-3 rounded-lg text-xs overflow-auto border border-yellow-200">
                    {JSON.stringify(
                      {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName,
                        username: user.username,
                        primaryEmailAddress:
                          user.primaryEmailAddress?.emailAddress,
                        imageUrl: user.imageUrl,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>

                <div>
                  <h3 
                    className="font-medium text-sm text-yellow-700 mb-2"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    বাহ্যিক অ্যাকাউন্ট (MetaMask সহ):
                  </h3>
                  <pre className="bg-white/80 p-3 rounded-lg text-xs overflow-auto border border-yellow-200">
                    {JSON.stringify(
                      user.externalAccounts?.map((account) => ({
                        id: account.id,
                        provider: account.provider,
                        externalId:
                          "externalId" in account
                            ? account.externalId
                            : undefined,
                        emailAddress: account.emailAddress,
                        username: account.username,
                        publicMetadata: account.publicMetadata,
                      })),
                      null,
                      2
                    )}
                  </pre>
                </div>

                <div>
                  <h3 
                    className="font-medium text-sm text-yellow-700 mb-2"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    Web3 ওয়ালেট:
                  </h3>
                  <pre className="bg-white/80 p-3 rounded-lg text-xs overflow-auto border border-yellow-200">
                    {JSON.stringify(
                      user.web3Wallets?.map((wallet) => ({
                        id: wallet.id,
                        web3Wallet: wallet.web3Wallet,
                      })),
                      null,
                      2
                    )}
                  </pre>
                </div>

                <div>
                  <h3 
                    className="font-medium text-sm text-yellow-700 mb-2"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    সম্পূর্ণ ব্যবহারকারী অবজেক্ট:
                  </h3>
                  <pre className="bg-white/80 p-3 rounded-lg text-xs overflow-auto max-h-96 border border-yellow-200">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              </div>
            </Card>
          )}

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upload Content Card */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-100 shadow-md">
                  <Icons.FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 
                    className="font-semibold text-green-800"
                    style={{ fontFamily: "var(--font-kalpurush)" }}
                  >
                    নতুন পোস্ট তৈরি
                  </h3>
                  <p 
                    className="text-sm text-green-700 font-bengali"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    আপনার মৌলিক কন্টেন্ট লিখুন এবং সুরক্ষিত করুন
                  </p>
                </div>
              </div>
              <Link href="/dashboard/new-post">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bengali px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Icons.Plus className="mr-2 h-4 w-4" />
                  নতুন পোস্ট তৈরি করুন
                </Button>
              </Link>
            </Card>

            {/* Verify Content Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 shadow-md">
                  <Icons.Search className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 
                    className="font-semibold text-blue-800"
                    style={{ fontFamily: "var(--font-kalpurush)" }}
                  >
                    কন্টেন্ট যাচাই
                  </h3>
                  <p 
                    className="text-sm text-blue-700 font-bengali"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    সত্যতা পরীক্ষা করুন
                  </p>
                </div>
              </div>
              <Button className="w-full bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-300 font-bengali px-4 py-2 rounded-full transition-all duration-200 hover:scale-105">
                <Icons.Shield className="mr-2 h-4 w-4" />
                এখনই যাচাই করুন
              </Button>
            </Card>

            {/* My Content Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-100 shadow-md">
                  <Icons.Gem className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 
                    className="font-semibold text-purple-800"
                    style={{ fontFamily: "var(--font-kalpurush)" }}
                  >
                    আমার কন্টেন্ট
                  </h3>
                  <p 
                    className="text-sm text-purple-700 font-bengali"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    সুরক্ষিত কাজগুলি দেখুন
                  </p>
                </div>
              </div>
              <Button className="w-full bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 hover:border-purple-300 font-bengali px-4 py-2 rounded-full transition-all duration-200 hover:scale-105">
                <Icons.Globe className="mr-2 h-4 w-4" />
                সংগ্রহ দেখুন
              </Button>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-12">
            <h2 
              className="text-xl font-semibold mb-6 text-red-800 bengali-text-shadow"
              style={{ fontFamily: "var(--font-kalpurush)" }}
            >
              আপনার সুরক্ষা পরিসংখ্যান
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="text-2xl font-bold text-red-600"
                  style={{ fontFamily: "var(--font-baloo-da-2)" }}
                >
                  ০
                </div>
                <div 
                  className="text-sm text-red-700 font-bengali"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  সুরক্ষিত নথি
                </div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="text-2xl font-bold text-orange-600"
                  style={{ fontFamily: "var(--font-baloo-da-2)" }}
                >
                  ০
                </div>
                <div 
                  className="text-sm text-orange-700 font-bengali"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  যাচাইকরণ
                </div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-green-50 border-yellow-200 hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="text-2xl font-bold text-yellow-600"
                  style={{ fontFamily: "var(--font-baloo-da-2)" }}
                >
                  ০
                </div>
                <div 
                  className="text-sm text-yellow-700 font-bengali"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  ব্লকচেইন রেকর্ড
                </div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="text-2xl font-bold text-green-600"
                  style={{ fontFamily: "var(--font-baloo-da-2)" }}
                >
                  ১০০%
                </div>
                <div 
                  className="text-sm text-green-700 font-bengali"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  নিরাপত্তা স্কোর
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
