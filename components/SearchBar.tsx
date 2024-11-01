import React, { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const genres = ["All", "Rock", "Jazz", "Funk", "Blues", "Pop"];
const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Relevance", "Newest"];

const FilterTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => (
  <Tooltip.Root>
    <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
    <Tooltip.Content className="bg-gray-800 text-white text-sm rounded-md p-2 shadow-lg">
      {content}
      <Tooltip.Arrow className="fill-gray-800" />
    </Tooltip.Content>
  </Tooltip.Root>
);

const SearchBar: React.FC<{
  onSearch: (
    term: string,
    genre: string,
    difficulty: string,
    sort: string
  ) => void;
}> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Relevance");

  const handleSearch = () => {
    onSearch(searchTerm, selectedGenre, selectedDifficulty, selectedSort);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for bass videos..."
        className="w-full md:w-auto p-2 border rounded-md mb-2 md:mb-0"
      />

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="p-2 border rounded-md"
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
        className="p-2 border rounded-md"
      >
        {difficultyLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        className="p-2 border rounded-md"
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export { SearchBar, FilterTooltip };
