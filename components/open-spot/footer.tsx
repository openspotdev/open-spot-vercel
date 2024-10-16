import React from "react";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8  border-t border-white border-opacity-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2024 OS Action Sports</p>
        <p>Powering your performance</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-300 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
