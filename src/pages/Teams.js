import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/teams/Card";
import Error from "../components/Error";
import Modal from "../components/teams/Modal";
import TeamOptions from "../components/teams/Options";
import TopHeader from "../components/TopHeader";
import { useGetOwnersTeamsQuery } from "../features/teams/teamsApi";

function Teams() {
  const { user } = useSelector((state) => state.auth);
  const { id } = user || {};
  const [open, setOpen] = useState(false);
  const [teamOptions, setTeamOptions] = useState(false);
  const { data, isLoading, isError, error } = useGetOwnersTeamsQuery(id);
  const [teamId, setTeamId] = useState(null);

  const controler = (id) => {
    setTeamOptions(!teamOptions);
    setTeamId(id);
  };

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error text={error} />;
  if (!isLoading && !isError && data?.length === 0)
    content = <p>Create New Teams to getting start</p>;
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((team) => {
      return (
        <Card key={team.id} team={team} control={() => controler(team.id)} />
      );
    });
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <TopHeader title="Teams" control={() => setOpen(!open)} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        
        {content}
      </div>
      {open && <Modal open={open} control={() => setOpen(!open)} />}
      {teamOptions && (
        <TeamOptions
          open={teamOptions}
          control={() => setTeamOptions(!teamOptions)}
          id={teamId}
        />
      )}
    </div>
  );
}

export default Teams;
