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
        className="max-w-2xl relative z-40"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex h-screen">
          <Dialog.Panel className="relative w-56 md:w-72 max-w-xs bg-slate-50 dark:bg-slate-800">
            <button
              onClick={closePopup}
              className="absolute z-10 top-3 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
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
