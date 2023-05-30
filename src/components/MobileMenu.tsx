import { Dialog } from "@headlessui/react";
import { XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const mobileMenuItems = [
  {
    name: "Docs",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "References",
    href: "/references",
  },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="lg:hidden" onClick={openPopup}>
        <EllipsisVerticalIcon
          className="md:h-6 md:w-6 h-5 w-5"
          aria-hidden="true"
        />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-2xl relative z-40"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div 

          className="fixed z-50 inset-0 lg:hidden">
          <Dialog.Panel className="fixed top-4 right-4 w-56 max-w-xs bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg p-6 text-base font-semibold">
            <button
              onClick={closePopup}
              className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <ul className="flex flex-col gap-6">
              {mobileMenuItems.map((item) => (
                <li key={item.name}>
                  <a
                    key={item.name}
                    href={item.href}
                    className="block font-semibold rounded-md"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
