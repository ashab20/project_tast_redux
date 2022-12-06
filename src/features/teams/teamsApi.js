import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `/teams`,
    }),
    getOwnersTeams: builder.query({
      query: (id) => `/teams?creatorId=${id}`,
    }),
    getTeamById: builder.query({
      query: (id) => `/teams/${id}`,
    }),
    addTeams: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const { name, id } = getState().auth.user || {};

        const res = await queryFulfilled;
        try {

          if (res?.data?.id) {
            await dispatch(
              teamsApi.endpoints.addTeamMembers.initiate({
                teamName: res?.data?.teamName,
                teamId: res?.data?.id,
                user: {
                  id: id,
                  name: name,
                },
              })
            ).unwrap();

            dispatch(
              apiSlice.util.updateQueryData(
                "getOwnersTeams",
                arg.creatorId,
                (draft) => {
                  draft.push(res.data);
                }
              )
            );
          }
        } catch (error) {
          
        }
      },
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await dispatch(
            teamsApi.endpoints.getTeamById.initiate(arg)
          ).unwrap();

          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getOwnersTeams",
              res?.creatorId,
              (draft) => {
                const draftedStage =  draft.filter((p) => p.id != arg )
                // console.log(JSON.parse(JSON.stringify(draft)));
               return draft = draftedStage;
              }
            )
          );
        } catch (err) {}
      },
    }),
    getTeamMembers: builder.query({
      query: (id) => `/members?teamId=${id}`,
    }),
    addTeamMembers: builder.mutation({
      query: (data) => ({
        url: `/members`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          if (res?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTeamMembers",
                res.data.teamId,
                (draft) => {
                  draft.push(res.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    deleteTeamMembers: builder.mutation({
      query: (id) => ({
        url: `/members/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        
        await queryFulfilled;
       dispatch(
          apiSlice.util.updateQueryData("getTeamMembers", arg, (draft) => {
            const draftedStage =  draft.filter((p) => p.id != arg )
            console.log(JSON.parse(JSON.stringify(draft)));
           return draft = draftedStage;
          })
        );
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetOwnersTeamsQuery,
  useGetTeamByIdQuery,
  useAddTeamsMutation,
  useAddTeamMembersMutation,
  useGetTeamMembersQuery,
  useDeleteTeamMembersMutation,
  useDeleteTeamMutation,
} = teamsApi;
