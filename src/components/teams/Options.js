import React, { useEffect, useState } from "react";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { useDispatch } from "react-redux";
import { addNotice, removeNotice } from "../../features/Notification/NotificationSlice";
import {
  useAddTeamMembersMutation,
  useDeleteTeamMembersMutation,
  useGetTeamMembersQuery,
  useDeleteTeamMutation
} from "../../features/teams/teamsApi";
import { useGetUsersQuery } from "../../features/users/usersApi";
import Error from "../Error";

function TeamOptions({ open, control, id }) {
  const [name] = useState("");
  const [error, setError] = useState("");
  const [deleteTeam] = useDeleteTeamMutation();
  const [addTeamMembers] =
    useAddTeamMembersMutation();
  const {
    data: users,
    isError: usersIsError,
    isLoading: userLoading,
  } = useGetUsersQuery();
  const { data: teamMembers, isLoading: membersLoading } =
    useGetTeamMembersQuery(id);
  const [deleteTeamMembers, isSuccess] = useDeleteTeamMembersMutation();
const dispatch = useDispatch();



  useEffect(() => {
    if (isSuccess) {

      dispatch(
        addNotice({
          notice: "Successfully removed",
          condition: "success",
        })
      );
    } else {
     
      dispatch(
        removeNotice({
          notice: "Can;t removed",
          condition: "error",
        })
      );
    }
  }, [dispatch, isSuccess]);


  const handleSelect = (item) => {
    const checkMember = teamMembers.find(
      (member) => member.user.id === item.id
    );

    if (checkMember === undefined) {
      addTeamMembers({
        teamId: id,
        user: {
          id: item.id,
          name: item.value,
        },
      });
    } else {
      setError("already a member!");
    }
  };

  const deleteMember = (id) => {
    deleteTeamMembers(id);
  };

  const addMemberHandler = (e) => {
    e.preventDefault();
  };

  let userList = null;
  if (userLoading) userList = <span>Loding...</span>;
  if (!userLoading && !usersIsError && users.length > 0) {
    const user = users.map((user) => ({
      id: user.id,
      value: user.name,
    }));
    userList = (
      <DatalistInput
        placeholder="Member username"
        label="Add Member"
        typeof="text"
        onSelect={(item) => handleSelect(item)}
        items={user}
        defaultValue={name}
      />
    );
  }

  const handleTeamDelete =() =>{
    deleteTeam(id);
    control();
  }

  return (
    open && (
      <>
        <div
          onClick={control}
          className=" w-full h-full inset-0 z-10 bg-black/50 cursor-pointer absolute"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-600">
            Add Members
          </h2>
          <div>
            <h5 className="p-4">
              {!membersLoading && teamMembers?.length > 0 && "Team Members: "}
            </h5>
            {!membersLoading &&
              teamMembers?.length > 0 &&
              teamMembers.map((member) => {
                return (
                  <button
                    key={member.user.id}
                    title="remove?"
                    className="bg-gray-100 justify-between p-1 px-2 rounded-md mx-2"
                    type="button"
                    onClick={() => deleteMember(member.id)}
                  >
                    {member.user.name}
                    <span className="text-red-700 text-xl mx-2">x</span>
                  </button>
                );
              })}
          </div>
          <form className="mt-8 space-y-6" onSubmit={addMemberHandler}>
            {error && <Error text={error} />}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex justify-around my-6 items-center">
                <div className="w-full">{userList}</div>
              </div>
              <div className="my-4"></div>
            </div>
          </form>

          <div className="flex justify-center">
            <button 
            onClick={() => handleTeamDelete()}
            type="button"
            className="bg-red-500 px-4 py-2 text-white rounded-md font-semibold hover:bg-red-600">
              Delete team
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default TeamOptions;
