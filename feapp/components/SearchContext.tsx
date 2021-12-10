import React, { useState, createContext, useContext } from "react";

const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}>({
  searchTerm: "",
  setSearchTerm: (val: string) => {},
});

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSerachContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("Use hook under a Provider");
  }

  return context;
};
