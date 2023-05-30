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

  useEffect(() => {
  }, []);

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
        className="py-1 px-2 border cursor-pointer hover:border-slate-900 border-slate-400 dark:border-slate-600 dark:hover:border-slate-400 lg:flex flex-row justify-between gap-2 items-center rounded-full hidden"
      >
        <div className="flex flex-row items-center text-slate-500">
          {props.children}
          <span className="ml-2 mr-12 select-none text-slate-500">Search</span>
        </div>
        <span className="inset-x-3/4 p-1 select-none items-center justify-center text-xs font-mono tracking-wide leading-3 pointer-events-none border text-slate-400 border-slate-400 dark:border-slate-600 rounded-md mr-2">
          <kbd aria-hidden="true">/</kbd>
        </span>
      </div>
      <div
        onClick={openPopup}
        className={
          "lg:hidden py-1 cursor-pointer flex flex-row justify-center items-center"
        }
      >
        <button className="lg:hidden" onClick={openPopup}>
          <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5" aria-hidden="true" />
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
