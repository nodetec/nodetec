import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const solutions = [
  { name: "blogstack.io", href: "https://blogstack.io" },
  { name: "hackr.news", href: "https://hackr.news" },
  { name: "notebin.org", href: "https://notebin.org" },
];

export default function AppMenu() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 font-semibold text-slate-900 outline-none dark:text-slate-100">
        <span>Apps</span>
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
        <Popover.Panel className="absolute right-full z-10 mr-8 mt-5 flex w-1/2 max-w-min -translate-x-full px-4 lg:mr-0">
          {({ close }) => (
            <div className="w-56 shrink rounded-xl bg-white p-2 text-sm font-semibold leading-6 text-slate-900 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-700 dark:text-slate-100">
              {solutions.map((item) => (
                <a
                  onClick={() => {
                    close();
                  }}
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex items-center gap-x-2 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-600"
                >
                  {item.name}
                  <ArrowTopRightOnSquareIcon
                    className="h-3 w-3 fill-sky-400"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
