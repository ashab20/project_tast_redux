import React, { useEffect, useState } from "react";
import DatalistInput from "react-datalist-input";
import { useDispatch, useSelector } from "react-redux";
import { addNotice, removeNotice } from "../../features/Notification/NotificationSlice";
import { useAddProjectMutation } from "../../features/project/projectApi";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import Error from "../Error";

function Modal({ open, control, stage }) {
  const { user } = useSelector((state) => state.auth);
  // const { id } = user || {};
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState({});
  const [error, setError] = useState("");

  const {
    data: teams,
    isLoading: teamsLoading,
  } = useGetTeamsQuery({ skip: !open });

  const [addProject, { isLoading, error: responseError, isSuccess }] =
    useAddProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
      control();
      dispatch(
        addNotice({
          notice: "Project added successfully",
          condition: "success",
        })
      );

    } else {
      setError(responseError);     
      dispatch(
        removeNotice({
          notice: "Can not add the project",
          condition: "error",
        })
      );
    }
  }, [control, dispatch, isSuccess, responseError]);

  useEffect(() => {}, []);

  


  const handleSubmit = (e) => {
    e.preventDefault();
    let {id:teamId,value:teamName} = team;
    addProject({
      title,
      teamId,teamName,
      stage: "backlog",
      created_at: Date.now(),
      creator: user,
    });
  };

  const reset = () => {
    setTitle("");
  };

  let teamList = null;
  if (!teamsLoading && teams.length > 0) {
    const team = teams.map((team) => ({
      id: team.id,
      value: team.teamName,
    }));

    teamList = (
      <DatalistInput
        placeholder="Select Team"
        typeof="text"
        onSelect={(team) => setTeam(team)}
        items={team}
        defaultValue={team.teamName}
      />
    );
  }

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-600">
            Add Team
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="underline_select" className="sr-only">
                  Select Team
                </label>
                {teamList}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                Add Team
              </button>
            </div>

            {/* {teams?.length === 0 && (
                <Error message="This user does not exist!" />
            )}
            {participant?.length > 0 &&
                participant[0].email === myEmail && (
                    <Error message="You can not send message to yourself!" />
                ) */}

            {responseError && <Error text={error} />}
          </form>
        </div>
      </>
    )
  );
}

export default Modal;
