import moment from "moment";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import Cancel from "../../assets/images/cancel.svg";
import { useGetTeamByIdQuery } from "../../features/teams/teamsApi";
import Options from "./Options";

function Card({ project, control }) {
  const { search } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  // const [color, setColor] = useState("");
  const [searchColor, setSearchColor] = useState(false);
  const [show,setShow] = useState(false);
  const { title, created_at, creator, teamName, teamId, stage, id } =
    project || {};
  const { avatar,email,name } = creator || {};
  const { data, isLoading, isError } = useGetTeamByIdQuery(teamId) || {};
  const {color} = data || {}

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

const author = user?.id === creator?.id ? true : false;




  const searchResult = search.find((s) => s.id === id);
  if(searchResult && searchResult.length > 0){
    setSearchColor(!searchColor)
  }

  return (
    <div
      ref={drag}
      className={`relative flex flex-col items-start p-4  mt-3  bg-white rounded-lg cursor-pointer bg-opacity-90 group ${ searchResult ? 'border-2 border-orange-500' : ''  } hover:bg-opacity-100 ${isDragging ? ":opacity-25" : "opacity-90"}`}
      draggable="true"
    >
    {stage === "backlog" &&
      <button
        className={`absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-${color}-500 rounded hover:bg-${color}-200 hover:text-${color}-700 group-hover:flex`}
        onMouseUp={() => setShow(!show)}
      >{ !show ?
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg> : <img src={Cancel} alt="cancel"/>}
      </button> }
      <span
        className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-100 rounded-full`}
      >
        {teamName}
      </span>
      <h4 className="mt-3 text-sm font-medium">{title}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">
            {moment(created_at).format("MMM Do YY")}
          </span>
        </div>
        {avatar !== "" ? (
          <img className="w-6 h-6 ml-auto rounded-full" src={`${avatar}`} alt="avatar" />
        ) :
        <Avatar className="w-6 h-6 ml-auto rounded-full" size="50px" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={name}  />}
      </div>

      { stage === "backlog" && show && <Options author={author} id={id}/>}
    </div>
  );
}

Card.defaultProps = {
  name: "ttile",
  title: "This is the title of the card for the thing that needs to be done.",
  color: "green",
  avatar: "https://randomuser.me/api/portraits/women/26.jpg",
  created_at: "Dec 12",
};

export default Card;
