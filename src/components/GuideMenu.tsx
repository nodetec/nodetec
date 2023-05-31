import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const guides = [
  { name: "Bitcoin Node", href: "guide/fullnode/en/hardware/prep" },
  { name: "Nostr", href: "guide/nostr/en/getting-started/prep" },
];

export default function AppMenu() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex outline-none items-center gap-x-1 font-semibold text-slate-900 dark:text-slate-100">
        <span>Guides</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-5 flex w-44 -translate-x-1/4 px-4 mr-8 lg:mr-0">
          <div className="w-96 shrink rounded-xl bg-white dark:bg-slate-700 p-4 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 shadow-lg ring-1 ring-slate-900/5">
            {guides.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="p-2 flex gap-x-2 items-center hover:bg-slate-100 dark:hover:bg-slate-600 rounded-md"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
