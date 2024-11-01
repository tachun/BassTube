import { fetchVideos } from "@/app/api/fetchVideos";
import VideoList from "@/components/VideoList";

export default async function VideoFetcher({
  searchTerm,
  genre,
  difficulty,
  sort,
}: {
  searchTerm: string;
  genre: string;
  difficulty: string;
  sort: string;
}) {
  const videos = await fetchVideos(searchTerm, genre, difficulty, sort);
  return videos.videos.length > 0 ? (
    <VideoList videos={videos.videos} />
  ) : (
    <p>No results found. Try different keywords.</p>
  );
}
