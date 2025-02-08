import React from "react";

const Loading = () => {
  return (
    <div class="spinner-4 relative w-12 animate-spin">
      <div class="absolute top-0 left-0  bg-primary w-4 h-4 rounded-full"></div>
      <div class="absolute top-1/2 right-0 bg-black w-4 h-4 rounded-full"></div>
    </div>
  );
};

export default Loading;
