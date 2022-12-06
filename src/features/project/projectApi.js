import { apiSlice } from "../api/apiSlice";

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProject: builder.query({
      query: () => `/projects`,
    }),
    getProjects: builder.query({
      query: (stage) => `/projects?stage=${stage}`,
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try{
          const res = await queryFulfilled;
          if(res?.data?.id){
            dispatch(
              apiSlice.util.updateQueryData(
                "getProjects",
                res.data.stage,
                (draft)=>{
                  draft.push(res.data);
                }
              )
            )
          }
        }catch (err) {

        }
      },
    }),
    changeProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({id,data},{queryFulfilled,dispatch}){
        
       const oldData = await dispatch(projectApi.endpoints.getProjectById.initiate(id)).unwrap();
      //  console.log(oldData);
        dispatch(
          apiSlice.util.updateQueryData(
            "getProjects",
            oldData.stage,
            (draft) => {
              const draftedStage =  draft.filter((p) => p.id !== id )
             return draft = draftedStage;
            }
          )
        )

        const res = await queryFulfilled;

        try{
           dispatch(
            apiSlice.util.updateQueryData(
              "getProjects",
              data.stage,
              (draft) => {
                draft.push(res.data);
              }
            )
          );
        }catch(err){
          
        }

      }
    }),
    deleteProject:builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(arg,{queryFulfilled,dispatch}){
       
        const data = await dispatch(projectApi.endpoints.getProjectById.initiate(arg)).unwrap();
        await queryFulfilled;
        try{
          dispatch(
            apiSlice.util.updateQueryData(
              "getProjects",
              data.stage,
              (draft) => {
                const draftedStage =  draft.filter((p) => p.id !== arg )
                // console.log(JSON.parse(JSON.stringify(draft)));
               return draft = draftedStage;
              }))
          
        }catch(err){

        }
      }
    }),
    search: builder.query({
      query: (q) => `/projects?title_like=${q}`,
    }),
  }),
});

export default projectApi;
export const {
  useGetAllProjectQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
  useChangeProjectMutation,
  useSearchQuery,
  useDeleteProjectMutation
} = projectApi;
