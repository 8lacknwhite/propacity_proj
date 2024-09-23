import React, { createContext, useState, ReactNode } from "react";

// Define the type for the context
interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

// Create the context
export const CityContext = createContext<CityContextType>({
  selectedCity: "",
  setSelectedCity: () => {},
});

// Define props for CityProvider
interface CityProviderProps {
  city?: string; // Optional prop to initialize the selected city
  children: ReactNode;
}

// Create the provider component
export const CityProvider: React.FC<CityProviderProps> = ({
  city = "",
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState(city); // Initialize selectedCity with the passed city prop or default to ""

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
