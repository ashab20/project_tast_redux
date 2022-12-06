import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import Section from "./Section";


function ProjectBody() {
  


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        
        <Section title="Backlog" />
        <Section title="Ready"  />
        <Section title="Doing"  />
        <Section title="Review"  />
        <Section title="Blocked"  />
        <Section title="Done"  />
        <div className="flex-shrink-0 w-6"></div>
      </div>
    </DndProvider>
  );
}

export default ProjectBody;
