export type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export async function fetchVideos(
  searchTerm: string,
  genre: string,
  difficulty: string,
  sort: string,
  pageToken: string = ""
): Promise<{ videos: Video[]; nextPageToken: string | null }> {
  const bassSpecificTerm = "bass guitar";
  const genreQuery = genre !== "All" ? ` ${genre}` : "";
  const difficultyQuery = difficulty !== "All" ? ` ${difficulty}` : "";
  const sortBy = sort === "Newest" ? "date" : "viewCount";

  const query = `${bassSpecificTerm} ${searchTerm}${genreQuery}${difficultyQuery}`;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(
      query
    )}&type=video&order=${sortBy}&key=${
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }&pageToken=${pageToken}`,
    { next: { revalidate: 300 } }
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

  if (!data.items || data.items.length === 0) {
    return { videos: [], nextPageToken: null };
  }

  const videos = data.items
    .map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle ?? "",
    }))
    .filter((video: any) =>
      relevantKeywords.some(
        (keyword) =>
          video.title.toLowerCase().includes(keyword) ||
          video.channelTitle.toLowerCase().includes(keyword)
      )
    ) as Video[];

  return { videos, nextPageToken: data.nextPageToken || null };
}
