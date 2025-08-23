"use client";

import { Button } from "@/components/ui/button";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

import { routes } from "@/constants";
import { SITE_NAME, headerVisibleHeight } from "@/constants/header";
import { easeInOut } from "framer-motion";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  isMobile?: boolean;
  isHero?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  onClick,
  isMobile = false,
  isHero = false,
}) => (
  <Link href={href} passHref>
    <span
      className={`font-bengali transition-colors ${
        isMobile ? "block py-2" : ""
      } ${
        isHero
          ? "text-white/90 hover:text-white"
          : "text-[color:var(--color-foreground)] hover:opacity-90"
      }`}
      onClick={onClick}
    >
      {label}
    </span>
  </Link>
);

type MainNavProps = {
  isHero?: boolean;
};

const MainNav: React.FC<MainNavProps> = ({ isHero = false }) => {
  const { scrollY } = useScroll();
  const [isInHero, setIsInHero] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < window.innerHeight) {
      setIsInHero(true);
    } else {
      setIsInHero(false);
    }

    if (latest > previous && latest > headerVisibleHeight) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  const navLinks = useMemo(() => {
    const initialLinks = [routes.feed, routes.write];

    return !isSignedIn ? [routes.home, ...initialLinks] : initialLinks;
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <motion.header
        className="select-none fixed top-0 left-0 right-0 z-50 "
        animate={visible ? "visible" : "hidden"}
        variants={slideDownVariants}
      >
        <nav
          className={`absolute top-0 left-0 right-0 z-30 ${
            !isInHero ? "bg-black/25 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div
                className={`font-kalpurush text-xl font-semibold ${
                  isInHero
                    ? "text-white"
                    : "text-[color:var(--color-foreground)]"
                }`}
              >
                {SITE_NAME}
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    href={link.path}
                    label={link.title}
                    isHero={isHero}
                  />
                ))}
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
                <SignedOut>
                  <Button
                    className={`font-bengali text-base ${
                      isInHero
                        ? "text-white"
                        : "text-[color:var(--color-foreground)]"
                    }`}
                    variant={"ghost"}
                    size={"sm"}
                    asChild
                  >
                    <Link href={routes.auth.path}>{routes.auth.title}</Link>
                  </Button>
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
                className={`md:hidden ${
                  isInHero
                    ? "text-white hover:bg-white/20"
                    : "text-[color:var(--color-foreground)] hover:bg-[color:var(--color-popover)]/10"
                }`}
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
              <div className="md:hidden mt-4 pb-4 border-t border-border">
                <div className="flex flex-col space-y-4 pt-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      href={link.path}
                      label={link.title}
                      onClick={() => setIsMobileMenuOpen(false)}
                      isMobile
                      isHero={isInHero}
                    />
                  ))}

                  <div className="pt-2">
                    <ThemeToggle />
                  </div>

                  <div className="border-t border-white/20 pt-4 space-y-2">
                    <SignedOut>
                      <SignUpButton mode="modal">
                        <Button
                          className="w-full text-white font-bengali"
                          variant={"ghost"}
                          size={"sm"}
                        >
                          <Link href={routes.auth.path}>
                            {routes.auth.title}
                          </Link>
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
