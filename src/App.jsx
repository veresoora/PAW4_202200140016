import axios from "axios";
import React from "react";
import { useState } from "react";
export default function App() {
  const [backgroundImage, setBackgrounImage] = useState("");
  const [advice, setAdvice] = useState("");
  async function getAdviceAndImage() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    const imageResponse = await axios.get(
      "https://api.unsplash.com/photos/random",
      {
        params: {
          query: "sea,mountain,forest",
          client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
        },
      }
    );
    if (imageResponse.status !== 200) {
      throw new Error("Failed to fetch image");
    }
    setBackgrounImage(imageResponse.data.urls.regular);
  }

  return (
    <div
      className="flex flex-col items-center justifycenter min-h-screen bg-white p-4 "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-gray-500 p-10 rounded-lg shadowmd max-w-md w-full bg-clip-padding backdrop-filter
backdrop-blur-sm bg-opacity-10 border border-gray-100"
      >
        <h1
          className="text-xl font-light font-mono mb-4
text-center"
        >
          "{advice || "Click the button to get advice"}"
        </h1>
        <button
          onClick={getAdviceAndImage}
          className="bg-black font-bold font-mono border
border-gray-100 text-white py-2 px-4 rounded hover:bggray-500 hover:bg-opacity-10 hover:border-black
hover:text-black transition duration-300 w-full"
        >
          Get Advice
        </button>
      </div>
    </div>
  );
}
