import { useEffect, useState } from "react";
import type { TocItem } from "../util/generateToc";
import { unescape } from "../util/html-entities";

interface Props {
  toc: TocItem[];
  labels: {
    onThisPage: string;
  };
}

const TableOfContents = ({ toc = [], labels }: Props) => {
  const [currentHeading, setCurrentHeading] = useState({
    slug: toc[0].slug,
    text: toc[0].text,
  });
  const onThisPageID = "on-this-page-heading";

  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          if (id === onThisPageID) continue;
          setCurrentHeading({
            slug: entry.target.id,
            text: entry.target.textContent || "",
          });
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: "10px 0% -66%",
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    );

    // Observe all the headings in the main page content.
    document
      .querySelectorAll("article :is(h1,h2,h3)")
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, []);

  const TableOfContentsItem = ({ heading }: { heading: TocItem }) => {
    const { depth, slug, text, children } = heading;

    let headerDepth = "pl-4 space-x-reverse";

    let textBase = "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";

    if (depth === 3) {
      headerDepth = "pl-8 space-x-reverse";
    }

    if (depth === 4) {
      headerDepth = "pl-12 space-x-reverse";
    }
    let currentHeaderLink = "";

    if (currentHeading.slug === slug) {
      currentHeaderLink =
        "bg-purple-100 dark:bg-orange-500/25 border-l-2 border-purple-500 dark:border-orange-600 dark:text-slate-100 rounded-r-md";
      textBase = "";
    }

    return (
      <li className="">
        <a
          className={`transition border-l-2 duration-200 ease-out pt-1 pb-1 leading-5 text-theme-text-lighter no-underline bidi-override text-base pr-2 rounded-r-md w-full inline-flex gap-2 hover:text-slate-900 dark:hover:text-slate-100 hover:underline ${headerDepth} ${textBase} ${currentHeaderLink}`.trim()}
          href={`#${slug}`}
        >
          {unescape(text)}
        </a>
        {children.length > 0 ? (
          <ul>
            {children.map((heading) => (
              <TableOfContentsItem key={heading.slug} heading={heading} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  };

  return (
    <div>
      <h2
        className="font-bold cursor-pointer mb-2 select-none leading-6"
        id={onThisPageID}
      >
        {labels.onThisPage}
      </h2>
      <ul className="text-slate-700 dark:text-slate-300 text-sm leading-6">
        {toc.map((heading2) => (
          <TableOfContentsItem key={heading2.slug} heading={heading2} />
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
