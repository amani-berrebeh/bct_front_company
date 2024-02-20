import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GroupInterface {
    _id?:string,
    groupName: string,
    startPoint: string,
    dateStart: string,
    timeStart: string,
    Destination: string,
    dateEnd: string,
    timeEnd: string,
    status: string,
    id_company: String,
}

export const groupSlice = createApi({
  reducerPath: "Group",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8800/groupEmployee/",
  }),
  tagTypes: ["Group"],
  endpoints(builder) {
    return {
      fetchGroup: builder.query<GroupInterface[], number | void>({
        query() {
          return `/getAllGroups`;
        },
        providesTags: ["Group"],
      }),
      addGroup: builder.mutation<void, GroupInterface>({
        query(payload) {
          return {
            url: "/addNewGroup",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Group"],
      }),
      updateGroup: builder.mutation<void, GroupInterface>({
        query: ({ _id, ...rest }) => ({
          url: `/updateGroupById/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Group"],
      }),
      deleteGroup: builder.mutation<void, number>({
        query: (_id) => ({
          url: `deleteGroup/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Group"],
      }),
    };
  },
});

export const {
  useAddGroupMutation,
  useFetchGroupQuery,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} = groupSlice;