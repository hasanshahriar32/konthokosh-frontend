"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useState } from "react";

import { headerVisibleHeight } from "@/constants";

const MainNav: React.FC = ({}) => {
  const { scrollY } = useScroll();
  const [isHero, setIsHero] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < window.innerHeight) {
      setIsHero(true);
    } else {
      setIsHero(false);
    }

    if (latest > previous && latest > headerVisibleHeight) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <>
      <motion.header
        className="select-none fixed top-0 left-0 right-0 z-50 "
        animate={visible ? "visible" : "hidden"}
        variants={slideDownVariants}
      >
        <nav
          className="absolute top-0 left-0 right-0 z-30"
          style={{
            backgroundColor: !isHero ? "rgba(0, 0, 0, 0.25)" : "transparent",
            backdropFilter: !isHero ? "blur(8px)" : "none",
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-white font-kalpurush text-xl font-semibold">
                কণ্ঠ কোষ
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="/"
                  className="text-white/90 hover:text-white font-bengali transition-colors"
                >
                  প্রচ্ছদ
                </a>
                <a
                  href="/feed"
                  className="text-white/90 hover:text-white font-bengali transition-colors"
                >
                  ফিড
                </a>
                <a
                  href="/write"
                  className="text-white/90 hover:text-white font-bengali transition-colors"
                >
                  লিখুন
                </a>
                <a
                  href="/my-posts"
                  className="text-white/90 hover:text-white font-bengali transition-colors"
                >
                  আমার পোস্ট
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bengali">
                      নিবন্ধন
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </SignedIn>
              </div>

              <Button
                variant="ghost"
                className="md:hidden text-white hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-white/20">
                <div className="flex flex-col space-y-4 pt-4">
                  <a
                    href="/"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    প্রচ্ছদ
                  </a>
                  <a
                    href="/feed"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ফিড
                  </a>
                  <a
                    href="/write"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    লিখুন
                  </a>
                  <a
                    href="/my-posts"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    আমার পোস্ট
                  </a>

                  <div className="border-t border-white/20 pt-4 space-y-2">
                    <SignedOut>
                      <SignUpButton mode="modal">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bengali">
                          নিবন্ধন
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex justify-center pt-2">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-10 h-10",
                            },
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </motion.header>
      <div className="header bg-white"></div>
    </>
  );
};

export default MainNav;

import { easeInOut } from "framer-motion";

const slideDownVariants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: {
      y: { duration: 0.3 },
      opacity: { duration: 0.3 },
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { ease: easeInOut, duration: 0.3 },
      opacity: { duration: 0.3 },
    },
  },
};
