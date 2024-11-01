export type SearchHistoryItem = {
  searchTerm: string;
  genre: string;
  difficulty: string;
};

export const getSearchHistory = (): SearchHistoryItem[] => {
  const history = localStorage.getItem("searchHistory");
  return history ? JSON.parse(history) : [];
};

export const addSearchHistory = (
  searchTerm: string,
  genre: string,
  difficulty: string
) => {
  const history = getSearchHistory();
  const newEntry = { searchTerm, genre, difficulty };
  const exists = history.some(
    (item) =>
      item.searchTerm === searchTerm &&
      item.genre === genre &&
      item.difficulty === difficulty
  );

  if (!exists) {
    const updatedHistory = [newEntry, ...history].slice(0, 5); // Keep only the last 5 searches
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  }
};
