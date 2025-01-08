import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";

import { Tables } from "~/integrations/supabase/database.types";

interface TagSearchLoopProps {
  posts: Tables<"posts">[];
  setDisplayedPosts: (filteredPosts: Tables<"posts">[]) => void;
}

export const TagSearchLoop = ({
  posts,
  setDisplayedPosts,
}: TagSearchLoopProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get unique tags from all posts (keeping only the lower case version)
  const allTags = useMemo(() => {
    const tagMap = new Map<string, string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        if (!tagMap.has(lowerTag) || tag === lowerTag) {
          tagMap.set(lowerTag, tag);
        }
      });
    });
    return Array.from(tagMap.values()).sort();
  }, [posts]);

  // Filter tags based on search query
  const filteredTags = useMemo(() => {
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allTags, searchQuery]);

  // Filter posts based on selected tags (using intersection)
  useEffect(() => {
    const filteredPosts =
      selectedTags.length === 0
        ? posts
        : posts.filter((post) =>
            // Check if post has ALL selected tags
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
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  return (
    <div className="relative z-10" ref={searchRef}>
      {searchOpen ? (
        <div className="flex flex-col">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowOptions(true);
              }}
              onFocus={() => setShowOptions(true)}
              placeholder="Search by tags..."
              className="font-gill-sans input input-bordered h-10 w-56 pr-8 text-base sm:w-64"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
                setSelectedTags([]);
              }}
              className="absolute right-2 text-gray-500 hover:text-black"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          </div>

          {showOptions && (
            <div className="absolute left-0 right-0 top-full mt-1 max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {filteredTags.map((tag) => (
                <div
                  key={tag}
                  role="button"
                  onClick={() => toggleTag(tag)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleTag(tag);
                    }
                  }}
                  tabIndex={0}
                  className="flex cursor-pointer items-center px-4 py-2.5 hover:bg-gray-50 focus:outline-none"
                >
                  <span
                    className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                      selectedTags.includes(tag)
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedTags.includes(tag) && (
                      <FaCheck className="text-xs text-white" />
                    )}
                  </span>
                  <span className="font-gill-sans text-sm">{tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center text-xl sm:text-2xl"
          aria-label="Search tags"
        >
          <FaSearch />
        </button>
      )}
    </div>
  );
};
