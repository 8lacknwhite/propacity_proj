import React, { useContext, useState, useEffect } from "react";
import { CityContext } from "../context/Citycontext"; // Import the context
import data from "../data/cities.json";

// Utility function for debouncing search input
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function Dropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedCity } = useContext(CityContext); // Use the context to set the selected city
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // For keyboard navigation

  // Debounce the search term to optimize search
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter cities based on the debounced search term
  const filteredCities = data.filter((city) =>
    city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setHighlightedIndex(-1); // Reset highlight on new search
  };

  const handleOptionClick = (cityName: string) => {
    setSelectedCity(cityName); // Update the selected city in the context
    setSearchTerm(cityName); // Update the search term
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleOptionClick(filteredCities[highlightedIndex].name);
    }
  };

  return (
    <div className="m-20" style={{ position: "relative", zIndex: 1 }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // Handle keyboard navigation
        placeholder="Search for a city"
      />
      {debouncedSearchTerm && (
        <ul
          style={{
            border: "1px solid #ccc",
            listStyleType: "none",
            padding: 0,
            maxHeight: "150px", // To add a scrollable menu if there are many options
            overflowY: "auto",
          }}
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(city.name)}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    highlightedIndex === index ? "#eee" : "transparent", // Highlight the focused item
                }}
              >
                {city.name}
              </li>
            ))
          ) : (
            <li style={{ padding: "5px" }}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
