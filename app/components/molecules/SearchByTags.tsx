import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onFocus: () => void;
}

function TextInput({ value, onChange, placeholder, onFocus }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

interface TagItemProps {
  name: string;
  onClick: () => void;
  checked: boolean;
}

function TagItem({ name, onClick, checked }: TagItemProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") onClick();
      }}
      role="button"
      tabIndex={0}
      className="flex cursor-pointer items-center px-2 py-1 hover:bg-gray-100"
    >
      <span
        className={`mr-2 h-4 w-4 rounded-full border-2 ${checked ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
      ></span>
      <span>{name}</span>
    </div>
  );
}

interface TagOption {
  name: string;
  selected: boolean;
};

interface SearchByTagsProps {
  tagOptions: TagOption[];
  setTagOptions: (tagOptions: TagOption[]) => void;
}

export default function SearchByTags({
  tagOptions,
  setTagOptions,
}: SearchByTagsProps) {
  const [filterText, setFilterText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside of the search bar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node)
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

  return (
    <div
      className="font-eb-garamond-light relative w-full max-w-xs"
      ref={searchBarRef}
    >
      <TextInput
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Filter posts by tags..."
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && (
        <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {filteredTagOptions.map((option: TagOption) => (
            <TagItem
              name={option.name}
              key={option.name}
              checked={option.selected}
              onClick={() => toggleTagSelection(option.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
