import React from "react";
import tik from "../../assets/images/checked.png";

function Color({color, handleColorChange }) {
  return (
    <div className="my-10">
      <label htmlFor="" className="mt-10">
        Select Color
      </label>
      <div className="flex mx-6 justify-center">
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-green-500 border-green-500 focus-within:border-green-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("green")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-green-500 bg-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "green" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-red-500 border-red-500 focus-within:border-red-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("red")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-red-500 bg-red-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "red" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-yellow-500 border-yellow-500 focus-within:border-yellow-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("yellow")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-yellow-500 bg-yellow-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "yellow" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-blue-500 border-blue-500 focus-within:border-blue-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("blue")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-red-500 bg-red-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "blue" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-pink-500 border-pink-500 focus-within:border-pink-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("pink")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-red-500 bg-red-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "pink" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-orange-500 border-orange-500 focus-within:border-orange-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("orange")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-red-500 bg-red-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "orange" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-violet-500 border-violet-500 focus-within:border-violet-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("violet")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-red-500 bg-red-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "violet" && <img src={tik} alt="tik" />}
        </div>
        <div className="rounded-full w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 bg-lime-500 border-lime-500 focus-within:border-lime-500">
          <input
            type="radio"
            className="opacity-0 absolute rounded-full cursor-pointer w-8 h-8"
            name="color"
            onClick={() => handleColorChange("lime")}
          />
          <svg
            className="hidden fill-current w-8 h-8 text-red-500 bg-red-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
          {color === "lime" && <img src={tik} alt="tik" />}
        </div>
      </div>
    </div>
  );
}

export default Color;
