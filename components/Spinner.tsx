import React from "react";

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
