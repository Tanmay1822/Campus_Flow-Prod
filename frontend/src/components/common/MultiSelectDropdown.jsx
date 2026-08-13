import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({
  placeholder,
  allOptions,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customOption, setCustomOption] = useState("");
  const [addedOptions, setAddedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const combinedOptions = Array.from(
    new Set([...allOptions, ...selectedOptions, ...addedOptions])
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) =>
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  const handleAddCustom = () => {
    if (customOption && !combinedOptions.includes(customOption)) {
      setAddedOptions((prev) => [...prev, customOption]);
      setSelectedOptions((prev) => [...prev, customOption]);
      setCustomOption("");
    }
  };
  const filteredOptions = combinedOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border rounded-md bg-stone shadow-sm text-left overflow-hidden whitespace-nowrap text-ellipsis bg-white/50 text-bronco border-bronco/10"
      >
        <span
          className={
            selectedOptions.length > 0 ? "text-bronco drop-shadow-sm" : "text-bronco/70"
          }
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-stone shadow-sm border rounded-md shadow-lg max-h-60 overflow-y-auto bg-white/50 text-bronco border-bronco/10">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded-md bg-white/50 text-bronco border-bronco/10"
            />
          </div>
          {filteredOptions.map((option) => (
            <label
              key={option}
              className="flex items-center p-2 hover:bg-creme text-bronco cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleSelect(option)}
                className="mr-2 h-4 w-4"
              />
              {option}
            </label>
          ))}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              placeholder="Add custom subject"
              value={customOption}
              onChange={(e) => setCustomOption(e.target.value)}
              className="flex-grow w-full px-2 py-1 border rounded-md bg-white/50 text-bronco border-bronco/10"
            />
            <button
              type="button"
              onClick={handleAddCustom}
              className="bg-stone/50 text-bronco px-3 rounded-md hover:bg-ironwood font-semibold text-sm"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
