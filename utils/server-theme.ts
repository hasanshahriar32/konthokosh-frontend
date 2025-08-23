import { cookies } from "next/headers";

export const getServerTheme = async (): Promise<string> => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  return theme || "system";
};

export const getResolvedServerTheme = async (): Promise<"light" | "dark"> => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  if (theme === "dark") return "dark";
  if (theme === "light") return "light";

  return "light";
};

export const getServerClerkTheme = async () => {
  const { dark, shadcn } = await import("@clerk/themes");
  const resolvedTheme = await getResolvedServerTheme();

  return resolvedTheme === "dark" ? dark : shadcn;
};
