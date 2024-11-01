import React from "react";
import Image from "next/image";

const VideoList: React.FC<{
  videos: { id: string; title: string; thumbnail: string }[];
}> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={480}
            height={360}
            className="w-full rounded-lg"
          />
          <h2 className="mt-2 text-lg">{video.title}</h2>
        </a>
      ))}
    </div>
  );
};

export default VideoList;
