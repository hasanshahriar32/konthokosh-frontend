'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";
import Link from "next/link";

type PageLoaderProps = {
	message?: string;
}

const PageLoader = ({ message = "লোড হচ্ছে..." }: PageLoaderProps) => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
			<div className="text-center space-y-4">
				<div className="flex justify-center">
					<div className="animate-heartbeat">
						<Icons.Shield className="h-8 w-8 text-red-600" />
					</div>
				</div>
				<p 
					className="text-sm text-gray-600 font-bengali"
					style={{ fontFamily: "var(--font-bengali)" }}
				>
					{message}
				</p>
			</div>
		</div>
	);
};

type ProtectedRouteProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * 🔐 Protected route wrapper that ensures user is authenticated
 *
 * @param children - Content to render when authenticated
 * @param fallback - Optional custom fallback for unauthenticated users
 */
const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
	const { isSignedIn, isLoaded } = useAuth();

	// Show loading state while auth status is being determined
	if (!isLoaded) {
		return <PageLoader />;
	}

	// Show fallback or default unauthorized message
	if (!isSignedIn) {
		if (fallback) {
			return <>{fallback}</>;
		}

		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
				<div className="text-center space-y-6 max-w-md mx-auto p-8">
					<div className="flex justify-center">
						<div className="rounded-full bg-red-100 p-6 shadow-lg">
							<Icons.Lock className="h-12 w-12 text-red-600" />
						</div>
					</div>
					<div className="space-y-2">
						<h2 
							className="text-2xl font-bold text-red-800 bengali-text-shadow"
							style={{ fontFamily: "var(--font-kalpurush)" }}
						>
							প্রবেশ সীমাবদ্ধ
						</h2>
						<p 
							className="text-gray-700 max-w-md font-bengali leading-relaxed"
							style={{ fontFamily: "var(--font-bengali)" }}
						>
							এই কন্টেন্ট দেখার জন্য আপনাকে আপনার ওয়ালেট সংযুক্ত করতে হবে। দয়া করে MetaMask দিয়ে সংযুক্ত হোন।
						</p>
					</div>
					<div className="flex justify-center">
						<Link href="/auth">
							<Button className="bg-red-600 hover:bg-red-700 text-white font-bengali px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
								<Icons.Wallet className="mr-2 h-4 w-4" />
								ওয়ালেট সংযুক্ত করুন
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
