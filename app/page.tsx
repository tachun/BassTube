"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import VideoList from "@/components/VideoList";
import Spinner from "@/components/Spinner";
import { fetchVideos } from "@/app/api/fetchVideos";
import {
  getSearchHistory,
  addSearchHistory,
  SearchHistoryItem,
} from "@/utils/searchHistory";
import EmptyState from "@/components/EmptyState";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Track search parameters
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    genre: "All",
    difficulty: "All",
    sort: "Relevance",
  });

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const handleSearch = async (
    searchTerm: string,
    genre: string,
    difficulty: string,
    sort: string
  ) => {
    setError(null);
    setLoading(true);
    setNoResults(false);

    // Save search history
    addSearchHistory(searchTerm, genre, difficulty);
    setSearchHistory(getSearchHistory());

    // Update searchParams state
    setSearchParams({ searchTerm, genre, difficulty, sort });

    try {
      const { videos: fetchedVideos, nextPageToken: token } = await fetchVideos(
        searchTerm,
        genre,
        difficulty,
        sort
      );
      setVideos(fetchedVideos);
      setNextPageToken(token);
      setNoResults(fetchedVideos.length === 0);
    } catch (err) {
      setError(`Failed to fetch videos. Please try again later. Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    const { videos: newVideos, nextPageToken: newNextPageToken } =
      await fetchVideos(
        searchParams.searchTerm,
        searchParams.genre,
        searchParams.difficulty,
        searchParams.sort,
        nextPageToken!
      );

    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    setNextPageToken(newNextPageToken);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bass Resource Finder</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Display search history */}
      <div className="flex space-x-2 overflow-x-auto mt-4">
        {searchHistory.map(({ searchTerm, genre, difficulty }) => (
          <button
            key={`${searchTerm}-${genre}-${difficulty}`}
            onClick={() =>
              handleSearch(searchTerm, genre, difficulty, "Relevance")
            }
            className="p-2 bg-gray-200 rounded-md whitespace-nowrap"
          >
            {searchTerm} - {genre} - {difficulty}
          </button>
        ))}
      </div>

      {error && (
        <EmptyState message="Failed to fetch videos. Please try again later." />
      )}

      {loading ? (
        <Spinner />
      ) : noResults ? (
        <EmptyState message="No results found. Try different keywords." />
      ) : (
        <VideoList videos={videos} />
      )}

      {videos.length > 0 && nextPageToken && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md flex items-center justify-center space-x-2"
        >
          {loading ? <Spinner /> : "Load More"}
        </button>
      )}
    </div>
  );
}
