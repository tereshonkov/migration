import { createContext, useState, useContext } from "react";

interface TabContextType {
  page: {
    analitycs: boolean;
    messages: boolean;
    reviews: boolean;
    products: boolean;
    users: boolean;
  };
  setPage: React.Dispatch<
    React.SetStateAction<{
      analitycs: boolean;
      messages: boolean;
      reviews: boolean;
      products: boolean;
      users: boolean;
    }>
  >;
}

const TabContext = createContext<TabContextType>(null!);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState({
    analitycs: true,
    messages: false,
    reviews: false,
    products: false,
    users: false,
  });

  return (
    <TabContext.Provider value={{ page, setPage }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
}
