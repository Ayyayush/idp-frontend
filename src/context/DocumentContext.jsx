import {
  createContext,
  useState,
  useEffect,
} from "react";

export const DocumentContext =
  createContext();

export const DocumentProvider = ({
  children,
}) => {
  const [result, setResult] =
    useState(() => {
      const stored =
        localStorage.getItem(
          "document_result"
        );

      return stored
        ? JSON.parse(stored)
        : null;
    });

  useEffect(() => {
    if (result) {
      localStorage.setItem(
        "document_result",
        JSON.stringify(result)
      );
    }
  }, [result]);

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