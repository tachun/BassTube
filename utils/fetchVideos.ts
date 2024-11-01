type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export const fetchVideos = async (
  searchTerm: string,
  genre: string,
  difficulty: string,
  sort: string
): Promise<Video[]> => {
  const bassSpecificTerm = "bass guitar";
  const genreQuery = genre !== "All" ? ` ${genre}` : "";
  const difficultyQuery = difficulty !== "All" ? ` ${difficulty}` : "";
  const sortBy = sort === "Newest" ? "date" : "viewCount"; // Default to 'viewCount' for popularity

  const query = `${bassSpecificTerm} ${searchTerm}${genreQuery}${difficultyQuery}`;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(
      query
    )}&type=video&order=${sortBy}&key=${
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }`
  );
  const data = await response.json();

  const relevantKeywords = [
    "bass",
    "bassline",
    "bass guitar",
    "bass lesson",
    "bass tutorial",
    "bass jam",
  ];

  // If data.items is undefined or empty, return an empty array
  if (!data.items || data.items.length === 0) {
    return [];
  }

  // Map and filter videos for relevancy
  return data.items
    .map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description ?? "", // Default to empty string if description is undefined
    }))
    .filter((video: any) =>
      relevantKeywords.some(
        (keyword) =>
          video.title.toLowerCase().includes(keyword) ||
          (video.description &&
            video.description.toLowerCase().includes(keyword))
      )
    );
};
