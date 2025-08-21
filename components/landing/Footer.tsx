import React from "react";
import { Button } from "../ui/button";
import { footer } from "@/constants/landing";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-foreground py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-kalpurush font-semibold mb-4">{footer.title}</h3>
        <p className="font-bengali text-muted-foreground mb-6">
          {footer.description}
        </p>
        <div className="flex justify-center items-center gap-6 mb-4">
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary font-bengali"
          >
            {footer.contact}
          </Button>
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary font-bengali"
          >
            {footer.about}
          </Button>
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary font-bengali"
          >
            {footer.collection}
          </Button>
        </div>
        {/* <div className="flex justify-center items-center gap-2 pt-4 border-t border-gray-700 dark:border-gray-600">
            <span className="text-sm font-bengali text-gray-400">থিম পরিবর্তন:</span>
            <ThemeToggle />
          </div> */}
      </div>
    </footer>
  );
};

export default Footer;