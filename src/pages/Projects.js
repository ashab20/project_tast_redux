import React from "react";
import ProjectBody from "../components/Projects";

function Project() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      <ProjectBody />
    </div>
  );
}

export default Project;
