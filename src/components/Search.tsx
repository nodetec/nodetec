import Fuse from "fuse.js";
import SearchPopup from "./SearchPopup";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function Search(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const options = {
    keys: ["header", "paragraph", "label", "body"],
    includeScore: true,
    distance: 100000,
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.1,
    // ignoreLocation: true,
  };
  const fuse = new Fuse(props.searchList, options);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    const posts: any = fuse
      .search(query)
      // .map((result) => result.item)
      .slice(0, 30);
    setPosts(posts);
  }, [query]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setQuery("");
        closePopup();
      }
    };

    const handleSlash = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        openPopup();
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", handleSlash);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", handleSlash);
    };
  }, []);

  return (
    <div>
      <div
        onClick={openPopup}
        className="hidden cursor-pointer flex-row items-center justify-between gap-2 rounded-full border border-slate-400 px-2 py-1 hover:border-slate-900 dark:border-slate-600 dark:hover:border-slate-400 lg:flex"
      >
        <div className="flex flex-row items-center text-slate-500">
          {props.children}
          <span className="ml-2 mr-12 select-none text-slate-500">Search</span>
        </div>
        <span className="font-mono pointer-events-none inset-x-3/4 mr-2 select-none items-center justify-center rounded-md border border-slate-400 p-1 text-xs leading-3 tracking-wide text-slate-400 dark:border-slate-600">
          <kbd aria-hidden="true">/</kbd>
        </span>
      </div>
      <div
        onClick={openPopup}
        className={
          "flex cursor-pointer flex-row items-center justify-center py-1 lg:hidden"
        }
      >
        <button className="lg:hidden" onClick={openPopup}>
          <MagnifyingGlassIcon
            className="h-5 w-5 md:h-6 md:w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <SearchPopup
        isOpen={isOpen}
        closePopup={closePopup}
        setIsOpen={setIsOpen}
        query={query}
        setQuery={setQuery}
        posts={posts}
      />
      {isOpen && (
        <div
          // className="z-40 fixed top-0 left-0 w-screen h-screen bg-black/20"
          onClick={closePopup}
        />
      )}
    </div>
  );
}
