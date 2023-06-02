import { Fragment, useEffect, useState } from "react";
import {
  DocumentTextIcon,
  HashtagIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Combobox, Transition } from "@headlessui/react";

export default function SearchPopup({
  isOpen,
  closePopup,
  setIsOpen,
  query,
  setQuery,
  posts,
}: any) {
  const [transformedContent, setTransformedContent] = useState([]);

  function transformContent(contentArray: any) {
    return contentArray.reduce((newArray: any, post: any) => {
      // const matches = post.matches;
      // can get key with paragraph, header, or title and add it to the object
      // const score = post.score;
      // const refIndex = post.refIndex;
      // Try to find an existing object with the same title
      let item = post.item;
      let existingObj = newArray.find((obj: any) => obj.label === item.label);

      if (existingObj) {
        // If an object with the same title exists, try to find a content object with the same header
        let existingContent = existingObj.content.find(
          (content: any) => content.header === item.header
        );

        if (existingContent) {
          // If a content object with the same header exists, append the paragraph to its paragraphs array
          existingContent.paragraphs.push(item.paragraph);
        } else {
          // If no content object with the same header exists, create a new one
          existingObj.content.push({
            header: item.header,
            paragraphs: [item.paragraph],
          });
        }
      } else {
        // console.log("item", item);
        // If no object with the same title exists, create a new one
        newArray.push({
          label: item.label,
          slug: item.slug,
          content: [
            {
              header: item.header,
              paragraphs: [item.paragraph],
            },
          ],
        });
      }

      return newArray;
    }, []);
  }

  useEffect(() => {
    const transformed = transformContent(posts);
    setTransformedContent(transformed);
  }, [posts]);

  function cleanHeaderLink(header: string) {
    return header
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  function NoResults() {
    return (
      <div className="flex items-center justify-center px-8 pb-16 pt-12 font-semibold">
        <h2 className="text-slate-500">Nothing to see here</h2>
      </div>
    );
  }

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog open={isOpen} className="fixed top-52 z-50" onClose={closePopup}>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 p-4 sm:p-8 md:p-28">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="shadow-3xl mx-auto max-w-3xl overflow-hidden rounded-lg border border-slate-300 bg-slate-50 pb-4 dark:border-slate-700 dark:bg-slate-800">
              <Combobox
                onChange={(loc: any) => {
                  window.location = loc;
                  setIsOpen(false);
                }}
              >
                <div className="mb-4 flex items-center border-b border-slate-300 dark:border-slate-700">
                  <Combobox.Input
                    className="h-8 w-full border-none bg-transparent p-8 text-lg text-slate-900 placeholder-slate-400 placeholder:text-slate-400 focus:ring-0 dark:text-slate-100"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Type to search..."
                  />
                  <span className="font-mono pointer-events-none mr-8 select-none items-center justify-center rounded-md border border-slate-300 p-1 text-xs font-thin leading-3 tracking-wide text-slate-500 dark:border-slate-500">
                    <kbd className="text-inherit" aria-hidden="true">
                      esc
                    </kbd>
                  </span>
                </div>

                {query === "" && <NoResults />}
                {query !== "" && transformedContent.length === 0 && (
                  <NoResults />
                )}

                {transformedContent.length > 0 && (
                  <Combobox.Options className="max-h-[30rem] scroll-p-12 space-y-2 overflow-y-auto px-4 pb-4">
                    {transformedContent.map((content: any) => (
                      <li key={content.slug}>
                        <div className=" flex items-center gap-2 py-2 pl-1">
                          <DocumentTextIcon className="h-7 w-7 text-slate-600 dark:text-slate-300" />
                          <h2 className="font-semibold text-slate-600 dark:text-slate-300">
                            {content.label}
                          </h2>
                        </div>
                        <ul className="font-semibold text-slate-600 dark:text-slate-300">
                          {content.content.map((section: any) => (
                            <div>
                              <Combobox.Option
                                key={section.header}
                                className={({ active }) =>
                                  `${
                                    active &&
                                    "rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                                  }`
                                }
                                value={`/${content.slug}#${cleanHeaderLink(
                                  section.header
                                )}`}
                              >
                                <div className="ml-4 flex cursor-pointer items-center gap-2 border-l-2 border-slate-400 py-4 pl-4">
                                  <HashtagIcon className="h-6 w-6" />
                                  <p>{section.header}</p>
                                </div>
                              </Combobox.Option>

                              {section.paragraphs.map(
                                (paragraph: any, index: any) => (
                                  <Combobox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `${
                                        active &&
                                        "rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                                      }`
                                    }
                                    value={`/${content.slug}#${cleanHeaderLink(
                                      section.header
                                    )}`}
                                  >
                                    <div className="ml-4 flex cursor-pointer items-center gap-2 border-l-2 border-slate-400 py-4 pl-4">
                                      <Bars3BottomLeftIcon className="h-6 w-6 " />
                                      <p>{paragraph.slice(0, 75)}</p>
                                    </div>
                                  </Combobox.Option>
                                )
                              )}
                            </div>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </Combobox.Options>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
