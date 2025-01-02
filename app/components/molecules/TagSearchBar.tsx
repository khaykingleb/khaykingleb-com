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

/**
 * Text input component
 *
 * @param onChange - The function to call when the input value changes
 * @param onClear - The function to call to clear the input
 * @param placeholder - The placeholder text for the input
 * @param onFocus - The function to call when the input is focused
 * @returns Text input component
 */
const TextInput = ({
  value,
  onChange,
  onClear,
  placeholder,
  onFocus,
}: TextInputProps) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        className="input input-bordered left-3 h-8 w-full pl-8 pr-6 text-sm"
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
};

interface TagItemProps {
  name: string;
  onClick: () => void;
  checked: boolean;
  isFocused: boolean;
}

/**
 * Tag item component
 *
 * @param onClick - The function to call when the tag is clicked
 * @param checked - Whether the tag is checked
 * @param isFocused - Whether the tag is focused
 * @returns Tag item component
 */
const TagItem = ({ name, onClick, checked, isFocused }: TagItemProps) => {
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
      } focus:outline-none`}
    >
      <span
        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-150 ease-in-out ${checked ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
      >
        {checked && <FaCheck className="text-xs text-white" />}
      </span>
      <span className="font-gill-sans text-sm">{name}</span>
    </div>
  );
};

export interface TagOption {
  name: string;
  selected: boolean;
}

interface TagSearchBarProps {
  tagOptions: TagOption[];
  setTagOptions: (tagOptions: TagOption[]) => void;
}

/**
 * Tag search bar component
 *
 * @param tagOptions - The list of tag options available for selection
 * @param setTagOptions - The function to update the tag options
 * @returns Tag search bar component
 */
export const TagSearchBar = ({
  tagOptions,
  setTagOptions,
}: TagSearchBarProps) => {
  const [filterText, setFilterText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const TagSearchBarRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  /**
   * Filter the tag options based on the filter text
   */
  const filteredTagOptions = useMemo(() => {
    return tagOptions.filter((option: TagOption) =>
      option.name.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [filterText, tagOptions]);

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
          setFocusedOptionIndex(
            (prev) => (prev + 1) % filteredTagOptions.length,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedOptionIndex(
            (prev) =>
              (prev - 1 + filteredTagOptions.length) %
              filteredTagOptions.length,
          );
          break;
        case "Enter":
        case " ": // Space key
          e.preventDefault();
          if (focusedOptionIndex !== -1) {
            const selectedTag = filteredTagOptions[focusedOptionIndex];
            setTagOptions(
              tagOptions.map((tag) =>
                tag.name === selectedTag.name
                  ? { ...tag, selected: !tag.selected }
                  : tag,
              ),
            );
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
      setTagOptions,
      tagOptions,
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

  useEffect(() => {
    /**
     * @param event - The mouse event that triggers the click outside handler
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        TagSearchBarRef.current &&
        !TagSearchBarRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearFilter = () => {
    setFilterText("");
    setFocusedOptionIndex(0);
  };

  const selectedTags = tagOptions.filter((tag) => tag.selected);
  const hasSelectedTags = selectedTags.length > 0;

  return (
    <div
      className="font-gill-sans relative mx-auto mb-4 mt-4 w-full max-w-xs font-light"
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
          setFocusedOptionIndex(0);
          setShowOptions(true);
        }}
        onClear={clearFilter}
        placeholder="Filter posts by tags"
        onFocus={() => setShowOptions(true)}
      />
      {hasSelectedTags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.name}
              className="badge badge-ghost flex items-center justify-center bg-blue-100 bg-opacity-50"
            >
              {tag.name}
              <button
                onClick={() => {
                  setTagOptions(
                    tagOptions.map((t) =>
                      t.name === tag.name ? { ...t, selected: false } : t,
                    ),
                  );
                }}
                className="ml-2 text-black transition duration-150 ease-in-out hover:text-gray-600 focus:outline-none"
              >
                <FaTimes size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      {showOptions && (
        <div
          ref={optionsRef}
          className={`absolute left-0 right-0 z-10 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg ${
            hasSelectedTags ? "mt-2" : "mt-0 rounded-t-none border-t-0"
          } max-h-40`}
        >
          {filteredTagOptions.map((option: TagOption, index: number) => (
            <TagItem
              name={option.name}
              key={option.name}
              checked={option.selected}
              onClick={() => {
                setTagOptions(
                  tagOptions.map((tag) =>
                    tag.name === option.name
                      ? { ...tag, selected: !tag.selected }
                      : tag,
                  ),
                );
              }}
              isFocused={index === focusedOptionIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};
