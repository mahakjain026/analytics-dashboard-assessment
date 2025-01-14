import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center p-1 bg-gray-800 rounded items-center text-orange-200 font-bold">
      <p className="text-center">
        <a href="mailto:anshul.kasana98@gmail.com" className="cursor-pointer">
          anshul.kasana98@gmail.com
        </a>
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
