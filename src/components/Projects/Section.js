import React, { useState } from "react";
import { useDrop } from "react-dnd";
import {
  useChangeProjectMutation,
  useGetProjectsQuery,
} from "../../features/project/projectApi";
import Error from "../Error";
import Card from "./Card";
import Modal from "./Modal";
import TitleBar from "./TitleBar";

function Section({ title, total }) {
  const [open, setOpen] = useState(false);
  const stage = title.toLowerCase();
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery(stage);

  const [changeProject, { isSuccess, isError: responseError }] =
    useChangeProjectMutation();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => handleDropCard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDropCard = (id) => {
    changeProject({
      id,
      data: { stage },
    });
  };

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error text={error} />;
  if (!isLoading && !isError && projects.length === 0)
    content = <p> {title === "Backlog" && "Create New Project."}</p>;

  if (!isLoading && !isError && projects.length > 0) {
    content = projects.map((project) => (
      <Card key={project.id} project={project} />
    ));
  }

  return (
    <div className="flex flex-col flex-shrink-0 w-72" ref={drop}>
      <TitleBar
        title={title}
        total={!isLoading && !isError && projects.length}
        control={stage === "backlog" ? () => setOpen(!open) : ""}
      />
      <div className="flex flex-col pb-2 overflow-auto">{content}</div>
      {open && (
        <Modal open={open} control={() => setOpen(!open)} stage={stage} />
      )}
    </div>
  );
}

export default Section;
