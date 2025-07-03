import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";

import { Tables } from "@/integrations/supabase/database.types";

export const TagSearch = ({
  posts,
  setDisplayedPosts,
}: {
  posts: Tables<"posts">[];
  setDisplayedPosts: (filteredPosts: Tables<"posts">[]) => void;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag.toLowerCase()));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter tags based on search query
  const filteredTags = useMemo(() => {
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allTags, searchQuery]);

  // Filter posts based on selected tags
  useEffect(() => {
    const filteredPosts =
      selectedTags.length === 0
        ? posts
        : posts.filter((post) =>
            selectedTags.every((selectedTag) =>
              post.tags
                .map((tag) => tag.toLowerCase())
                .includes(selectedTag.toLowerCase()),
            ),
          );
    setDisplayedPosts(filteredPosts);
  }, [posts, selectedTags, setDisplayedPosts]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle tag selection logic
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  return (
    <div className="relative z-50" ref={searchRef}>
      {searchOpen ? (
        <div className="flex flex-col">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tags..."
              className="input input-bordered h-10 w-56 pr-8 sm:w-64"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
                setSelectedTags([]);
              }}
              className="md:hover:text-base-content absolute right-2 transition-all md:hover:scale-105"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          </div>
          <ul
            role="listbox"
            className="border-base-300 bg-base-100 absolute top-full right-0 left-0 mt-1 max-h-52 overflow-y-auto rounded-lg border shadow-lg focus-within:outline-none"
            onKeyDown={(e) => {
              const current = document.activeElement;
              if (!current?.parentElement) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                const currentLi = current.closest("li");
                const nextLi = currentLi?.nextElementSibling;
                const nextButton = nextLi?.querySelector("button");
                if (nextButton instanceof HTMLElement) {
                  nextButton.focus();
                  nextButton.scrollIntoView({ block: "nearest" });
                }
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const currentLi = current.closest("li");
                const prevLi = currentLi?.previousElementSibling;
                const prevButton = prevLi?.querySelector("button");
                if (prevButton instanceof HTMLElement) {
                  prevButton.focus();
                  prevButton.scrollIntoView({ block: "nearest" });
                }
              }
            }}
          >
            {filteredTags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  className="hover:bg-base-200 focus-visible:bg-base-200 flex w-full cursor-pointer items-center px-4 py-2.5 text-left focus:outline-none dark:hover:bg-gray-800 dark:focus-visible:bg-gray-800"
                >
                  <span
                    className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      selectedTags.includes(tag)
                        ? "border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500"
                        : "border-base-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedTags.includes(tag) && (
                      <FaCheck className="text-xs text-white" />
                    )}
                  </span>
                  <span className="text-base-content text-sm">{tag}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setSearchOpen(true)}
          className="flex text-lg transition-all sm:text-xl md:hover:scale-105"
          aria-label="Search tags"
        >
          <FaSearch />
        </button>
      )}
    </div>
  );
};
