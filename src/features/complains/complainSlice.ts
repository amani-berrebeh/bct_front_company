import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Complain {
    _id:string,
    id_corporate:string,
    id_student:string,
    id_parent:string,
    id_employee?:
    {
      _id?:string,
      email?:string,
      firstName?:string,
      lastName?:string,
      mobile?:string,
      photos?:string
    },
    subject:string,
    description:string,
    complainDate:string,
    responseMessage:string,
    responseAuthor:string,
    responseDate:string,
    status:string,
    pdf:string,
    pdfBase64String:string,
    pdfExtension:string,
    createdAt:string,
    updatedAt:string,
    photo:string,
    photoBase64Strings:string,
    photoExtension:string,
    video:string,
    videoBase64Strings:string,
    videoExtension:string,
    resPhoto:string,
    resVideo:string,
    resPhotoBase64Strings:string,
    resVideoBase64Strings:string,
    ResPhotoExtension:string,
    ResVideoExtension:string
}
// export interface ResComplain {
//   _id:string,
//   responseMessage:string,
//   resPhoto:string,
//     resVideo:string,
//     resPhotoBase64Strings:string,
//     resVideoBase64Strings:string,
//     ResPhotoExtension:string,
//     ResVideoExtension:string

// }

export const complainSlice = createApi({
    reducerPath: "Complain",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8800/complains/",
    }),
    tagTypes: ["Complain"],
    endpoints(builder) {
      return {
        fetchComplain: builder.query<Complain[], number | void>({
          query() {
            return `/getAllComplains`;
          },
          providesTags: ["Complain"],
        }),
        addComplain: builder.mutation<void, Complain>({
          query(payload) {
            return {
              url: "/newComplain",
              method: "POST",
              body: payload,
            };
          },
          invalidatesTags: ["Complain"],
        }),

        // updateComplainResponse: builder.mutation<void, Complain>({
        //     query:({_id, responseMessage})=> {
        //       return {
        //         url: "/response",
        //         method: "POST",
        //         body: {_id, responseMessage},
        //       };
        //     },
        //     invalidatesTags: ["Complain"],
        //   }),
        updateComplainResponse: builder.mutation<void, Complain>({
          query:(payload)=> {
            return {
              url: "/response",
              method: "POST",
              body: payload,
            };
          },
          invalidatesTags: ["Complain"],
        }),
          updateComplainToPushed: builder.mutation<void, Complain>({
            query:({_id})=> {
              return {
                url: "/updateToPushed",
                method: "PUT",
                body: {_id},
              };
            },
            invalidatesTags: ["Complain"],
          }),
        updateComplain: builder.mutation<void, Complain>({
          query: ({ _id, ...rest }) => ({
            url: `/updateComplain/${_id}`,
            method: "PUT",
            body: rest,
          }),
          invalidatesTags: ["Complain"],
        }),
        deleteComplain: builder.mutation<void, number>({
          query: (_id) => ({
            url: `deleteComplain/${_id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Complain"],
        }),
      };
    },
  });
  
  export const {
    useAddComplainMutation,
    useFetchComplainQuery,
    useDeleteComplainMutation,
    useUpdateComplainMutation,
    useUpdateComplainResponseMutation,
    useUpdateComplainToPushedMutation
  } = complainSlice;