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
          className="h-5 w-5 md:h-6 md:w-6"
          aria-hidden="true"
        />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-40 max-w-2xl"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-50 lg:hidden">
          <Dialog.Panel className="fixed right-4 top-4 w-56 max-w-xs rounded-lg bg-slate-50 p-6 text-base font-semibold shadow-lg dark:bg-slate-800">
            <button
              onClick={closePopup}
              className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <ul className="flex flex-col gap-6">
              {mobileMenuItems.map((item) => (
                <li key={item.name}>
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md font-semibold"
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
