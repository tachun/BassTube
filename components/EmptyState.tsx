import React from "react";
import Image from "next/image";

type EmptyStateProps = {
  message: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="flex flex-col items-center text-center mt-8">
    <Image
      src="/no-results.webp"
      width="600"
      height="600"
      alt="No Results"
      className="mb-4"
    />
    <p className="text-lg font-semibold text-gray-600">{message}</p>
  </div>
);

export default EmptyState;
