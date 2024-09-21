import { useMemo, useState, useCallback } from "react";

// Custom Hook For Filtering Products
export const useProductFilter = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 8]);
  const [filteredCategory, setFilteredCategory] = useState("");

  // Memoize categories that have products with a price greater than 0
  const categories = useMemo(() => {
    const filteredProducts = products.filter(product => product.price > 0);
    return [...new Set(filteredProducts.map(product => product.category))];
  }, [products]);
  
  // Memoize categories that have products without a price greater than 0
  const categoriesAdmin = useMemo(() => {
     return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Filter products based on category, price range, and search term
  const filteredProducts = useMemo(() =>
    products.filter((product) => {
      const matchesCategory = filteredCategory
        ? product.category === filteredCategory
        : true;

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm)
        : true;

      return matchesCategory && matchesPrice && matchesSearch;
    }),
  [products, filteredCategory, priceRange, searchTerm]);

  // Handlers for setting filters
  const handlePriceChange = useCallback((range) => setPriceRange(range), []);
  const handleCategoryChange = useCallback((category) => setFilteredCategory(category), []);
  const handleSearchChange = useCallback((term) => setSearchTerm(term.toLowerCase()), []);

  return {
    categories,
    filteredProducts,
    categoriesAdmin,
    handlePriceChange,
    handleCategoryChange,
    handleSearchChange,
  };
};
