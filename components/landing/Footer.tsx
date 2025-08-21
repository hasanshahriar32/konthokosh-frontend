import React from "react";
import { Button } from "../ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-kalpurush font-semibold mb-4">কণ্ঠ কোষ</h3>
        <p className="font-bengali text-gray-300 dark:text-gray-400 mb-6">
          আমাদের ঐতিহ্য সংরক্ষণ ও প্রচারে আমরা প্রতিশ্রুতিবদ্ধ
        </p>
        <div className="flex justify-center items-center gap-6 mb-4">
          <Button
            variant="ghost"
            className="text-white hover:text-red-300 font-bengali"
          >
            যোগাযোগ
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-red-300 font-bengali"
          >
            সম্পর্কে
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-red-300 font-bengali"
          >
            সংগ্রহ
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
