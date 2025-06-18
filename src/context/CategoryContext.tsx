"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useApiQuery from "../../hooks/useApiQuery";

interface CategoryParent {
  id: string;
  name: string;
  position: number;
  level: number;
  source_id: string | null;
  children: CategoryParent[];
}

interface CategoryContextType {
  categories: CategoryParent[];
  isLoading: boolean;
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  isLoading: false,
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { data, isLoading } = useApiQuery<CategoryParent[]>(
      `/gateway/category/category-list`,
      {}
    );
  return (
    <CategoryContext.Provider value={{ categories: data || [], isLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
