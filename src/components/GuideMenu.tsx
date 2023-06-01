import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const guides = [
  { name: "Bitcoin Node", href: "en/guides/fullnode/hardware/prep" },
  { name: "Nostr", href: "en/guides/nostr/getting-started/setup" },
];

export default function AppMenu() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 font-semibold text-slate-900 outline-none dark:text-slate-100">
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
        <Popover.Panel className="absolute z-10 mr-8 mt-5 flex w-44 -translate-x-1/4 px-4 lg:mr-0">
          <div className="w-96 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-slate-900 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-700 dark:text-slate-100">
            {guides.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-x-2 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-600"
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
