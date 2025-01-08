import { useMemo, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

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

  useMemo(() => {
    const filteredPosts = posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesSearch;
    });
    setDisplayedPosts(filteredPosts);
  }, [posts, searchQuery, setDisplayedPosts]);

  return (
    <div className="relative z-10 flex items-center">
      {searchOpen ? (
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tags..."
            className="font-gill-sans input input-bordered h-10 w-56 pr-8 text-base sm:w-64"
          />
          <button
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            className="absolute right-2 text-gray-500 hover:text-black"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center text-xl sm:text-2xl"
          aria-label="Search by tags..."
        >
          <FaSearch />
        </button>
      )}
    </div>
  );
};
