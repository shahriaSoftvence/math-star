// ste_br/src/components/landing/HamburgerMenu.tsx
import React from 'react';

type HamburgerMenuProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HamburgerMenu = ({ isOpen, setIsOpen }: HamburgerMenuProps) => {
  return (
    <button
      className="md:hidden z-50"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      <div className="space-y-2">
        <span
          className={`block w-8 h-0.5 bg-black transform transition duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2.5' : ''
          }`}
        ></span>
        <span
          className={`block w-8 h-0.5 bg-black transition duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-8 h-0.5 bg-black transform transition duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-2.5' : ''
          }`}
        ></span>
      </div>
    </button>
  );
};