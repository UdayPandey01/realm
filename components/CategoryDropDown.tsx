interface CategoryDropdownProps {
    category: string;
    setCategory: (category: string) => void;
  }

const CategoryDropdown = ({category, setCategory} : CategoryDropdownProps) => {

  const categories = [
    "Style",
    "Fashion",
    "Tech",
    "Culture",
    "Food",
    "Travel",
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor="category" className="block text-lg font-medium text-gray-700">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={category}
        onChange={handleCategoryChange}
        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
