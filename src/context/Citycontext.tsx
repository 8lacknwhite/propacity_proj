import React, { createContext, useState, ReactNode } from "react";

// Create the context
export const CityContext = createContext({
  selectedCity: "",
  setSelectedCity: (city: string) => {},
});

// Create the provider component
export const CityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
