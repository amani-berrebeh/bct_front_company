import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Program {
  _id?: string;
  programName: string,
  origin_point: {
    placeName: string,
    coordinates: {
      lat: number,
      lng: number,
    },
  },
  stops: 
    {
      id: string,
      address: string,
      time: string
    }[],
  destination_point: {
    placeName: string,
    coordinates: {
      lat: number,
      lng: number,
    },
  },
  pickUp_date: string,
  droppOff_date: string,
  freeDays_date: string[],
  exceptDays: string[],
  recommanded_capacity: string,
  extra: string[],
  notes: string,
  dropOff_time:string,
  pickUp_Time:string,
  workDates:string[]
  
}

export const programSlice = createApi({
  reducerPath: "program",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8800/programs",
  }),
  tagTypes: ["Program"],
  endpoints(builder) {
    return {
      fetchPrograms: builder.query<Program[], number | void>({
        query() {
          return `/getAllPrograms`;
        },
        providesTags: ["Program"],
      }),
     
      addProgram: builder.mutation<void, Program>({
        query(payload) {
          return {
            url: "/newProgram",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Program"],
      }),
     
      
    };
  },
});

export const {
  useAddProgramMutation,
  useFetchProgramsQuery,
} = programSlice;