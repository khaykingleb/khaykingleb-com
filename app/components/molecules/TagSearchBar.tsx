import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder: string;
  onFocus: () => void;
}

function TextInput({
  value,
  onChange,
  onClear,
  placeholder,
  onFocus,
}: TextInputProps) {
  return (
    <div className="relative">
      <FaSearch className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        className="input input-bordered h-8 w-full pl-6 pr-6 text-sm"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 transition duration-150 ease-in-out hover:text-gray-600"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

interface TagItemProps {
  name: string;
  onClick: () => void;
  checked: boolean;
  isFocused: boolean;
}

function TagItem({ name, onClick, checked, isFocused }: TagItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === "Space") onClick();
      }}
      className={`flex cursor-pointer items-center px-4 py-2.5 transition-colors duration-150 ease-in-out hover:bg-gray-50 ${
        isFocused ? "bg-gray-100" : ""
      }`}
    >
      <span
        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-150 ease-in-out ${checked ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
      >
        {checked && <FaCheck className="text-xs text-white" />}
      </span>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

interface TagOption {
  name: string;
  selected: boolean;
}

interface TagSearchBarProps {
  tagOptions: TagOption[];
  setTagOptions: (tagOptions: TagOption[]) => void;
}

export default function TagSearchBar({
  tagOptions,
  setTagOptions,
}: TagSearchBarProps) {
  const [filterText, setFilterText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const TagSearchBarRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside of the search bar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        TagSearchBarRef.current &&
        !TagSearchBarRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Change the selected state of the tag when tag is clicked (toggled) in the dropdown
  const toggleTagSelection = useCallback(
    (name: string) => {
      setTagOptions(
        tagOptions.map((option: TagOption) =>
          option.name === name
            ? { ...option, selected: !option.selected }
            : option,
        ),
      );
    },
    [setTagOptions, tagOptions],
  );

  // Filter the tag options based on the filter text
  const filteredTagOptions = useMemo(() => {
    return tagOptions.filter((option: TagOption) => {
      const textIsEmpty = filterText.length === 0;
      const optionName = option.name.toUpperCase();
      const textInOptionName = optionName.includes(filterText.toUpperCase());
      return textIsEmpty || textInOptionName;
    });
  }, [filterText, tagOptions]);

  const getNextIndex = useCallback(
    (currentIndex: number, direction: "next" | "prev") => {
      const total = filteredTagOptions.length;
      if (total === 0) return -1;

      return direction === "next"
        ? (currentIndex + 1) % total
        : (currentIndex - 1 + total) % total;
    },
    [filteredTagOptions],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showOptions) {
        if (e.key === "ArrowDown") {
          setShowOptions(true);
          setFocusedOptionIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedOptionIndex((prev) => getNextIndex(prev, "next"));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedOptionIndex((prev) => getNextIndex(prev, "prev"));
          break;
        case "Enter":
        case " ": // Space key
          e.preventDefault();
          if (focusedOptionIndex !== -1) {
            toggleTagSelection(filteredTagOptions[focusedOptionIndex].name);
            // Stay on the same index after toggling
          }
          break;
        case "Escape":
          setShowOptions(false);
          setFocusedOptionIndex(-1);
          break;
      }
    },
    [
      filteredTagOptions,
      focusedOptionIndex,
      showOptions,
      toggleTagSelection,
      getNextIndex,
    ],
  );

  useEffect(() => {
    if (focusedOptionIndex !== -1 && optionsRef.current) {
      const focusedElement = optionsRef.current.children[
        focusedOptionIndex
      ] as HTMLElement;
      focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [focusedOptionIndex]);

  // Ensure focusedOptionIndex is reset when filteredTagOptions change
  useEffect(() => {
    setFocusedOptionIndex(-1);
  }, [filteredTagOptions]);

  const clearFilter = () => {
    setFilterText("");
    setFocusedOptionIndex(-1);
  };

  const selectedTags = tagOptions.filter((option) => option.selected);

  return (
    <div
      className={`relative mx-auto mt-8 w-full max-w-xs ${selectedTags.length > 0 ? "" : "mb-4"} font-eb-garamond-light`}
      ref={TagSearchBarRef}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-controls="options-listbox"
      aria-haspopup="listbox"
      aria-expanded={showOptions}
      tabIndex={0}
    >
      <TextInput
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
          setFocusedOptionIndex(-1);
          setShowOptions(true);
        }}
        onClear={clearFilter}
        placeholder="Filter posts by tags"
        onFocus={() => setShowOptions(true)}
      />
      {selectedTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.name}
              className="badge badge-ghost flex items-center justify-center bg-blue-100 bg-opacity-50"
            >
              {tag.name}
              <button
                onClick={() => toggleTagSelection(tag.name)}
                className="ml-2 text-black transition duration-150 ease-in-out hover:text-gray-600 focus:outline-none"
              >
                <FaTimes size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            ref={optionsRef}
            className="absolute left-0 right-0 z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredTagOptions.length > 0 ? (
              filteredTagOptions.map((option: TagOption, index: number) => (
                <TagItem
                  name={option.name}
                  key={option.name}
                  checked={option.selected}
                  onClick={() => toggleTagSelection(option.name)}
                  isFocused={index === focusedOptionIndex}
                />
              ))
            ) : (
              <div className="flex items-center justify-center py-2 text-sm text-gray-500">
                No matching tags found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
