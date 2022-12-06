import React from "react";
import { useDispatch } from "react-redux";
import { addNotice } from "../../features/Notification/NotificationSlice";
import { useDeleteProjectMutation } from "../../features/project/projectApi";

function Options({ author, id }) {
  const [deleteProject] = useDeleteProjectMutation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (author) {
      deleteProject(id);
    } else {
      dispatch(
        addNotice({
          notice: "You Can't Delete this project!",
          condition: "error",
        })
      );
    }
  };
  return (
    <ul className="absolute justify-end right-0 mt-4">
      <li className="bg-gray-100 py-2 px-4 m-2 rounded-md text-red-600">
        <button type="button" onClick={handleDelete}>
          Delete Project
        </button>{" "}
      </li>
      {/* <li className="bg-gray-100 py-2 px-4 m-2 rounded-md">
        <button>View Project</button>{" "}
      </li> */}
    </ul>
  );
}

export default Options;
