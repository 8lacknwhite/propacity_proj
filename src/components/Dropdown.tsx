import React, { useContext, useState } from "react";
import { CityContext } from "../context/Citycontext"; // Import the context
import data from "../data/cities.json";

function Dropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedCity } = useContext(CityContext); // Use the context to set the selected city

  const filteredCities = data.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = (cityName: string) => {
    setSelectedCity(cityName); // Update the selected city in the context
    setSearchTerm(cityName); // Optionally update the search term
  };

  return (
    <div className="m-20" style={{ position: "relative", zIndex: 1 }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a city"
      />
      {searchTerm && (
        <ul
          style={{
            border: "1px solid #ccc",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(city.name)}
                style={{ padding: "5px", cursor: "pointer" }}
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
