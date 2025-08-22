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
          {footer.links.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="text-foreground hover:text-primary font-bengali"
              asChild
            >
              <a href={link.href}>{link.name}</a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
