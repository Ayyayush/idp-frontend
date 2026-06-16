import { createContext, useState } from "react";

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {

  const [result, setResult] = useState(null);

  return (
    <DocumentContext.Provider
      value={{
        result,
        setResult,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};