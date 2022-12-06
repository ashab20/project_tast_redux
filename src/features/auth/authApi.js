import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: res.data.accessToken,
                  user: res.data.user,
              })
          );

          dispatch(
              userLoggedIn({
                  accessToken: res.data.accessToken,
                  user: res.data.user,
              })
          );
                  
            
        } catch (err) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
