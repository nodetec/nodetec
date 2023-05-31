import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function MobileSidebar({ children }: any) {
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
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
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
        <div className="fixed inset-0 flex h-screen">
          <Dialog.Panel className="relative w-56 max-w-xs bg-slate-50 dark:bg-slate-800 md:w-72">
            <button
              onClick={closePopup}
              className="absolute right-5 top-3 z-10 flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="p-4">{children}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
