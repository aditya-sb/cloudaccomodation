import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState, AppDispatch } from "../store";

const getAuthToken = async () => {
  try {
    const token = localStorage.getItem("auth_Token");
    console.log("Auth Token in api:", token); // Log the auth token
    return token ? `Bearer ${token}` : "";
  } catch (error) {
    console.error("Failed to retrieve auth token from storage:", error);
    return "";
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const token = await getAuthToken();

    const baseQuery = fetchBaseQuery({
      //  baseUrl: 'http://digimonk.net:2783/api',
      baseUrl: "http://localhost:8000/api",
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", token);
        }
        return headers;
      },
    });

    // Extract relevant fields for logging
    const {
      url,
      method = "GET",
      body,
      params,
    } = typeof args === "object" ? args : { url: args };

    // Log the request details
    console.log("--- API Request Start ---");
    console.log("Request URL:", url);
    console.log("Request Method:", method);
    console.log("Request Body:", body);
    console.log("Request Params:", params);

    // Make the API request
    const result = await baseQuery(args, api, extraOptions);

    return result;
  },

  tagTypes: ["User", "Auth", "Property"], // Add tag types for invalidation
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
      // Invalidate User and Auth queries upon registration
      invalidatesTags: ["User", "Auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      // Invalidate User and Auth queries upon login
      invalidatesTags: ["User", "Auth"],
    }),
    getUserDetails: builder.query({
      query: () => "/user/getUserDetails",
      providesTags: ["User"], // Tag this endpoint for future invalidation
    }),
    saveUserDetails: builder.mutation({
      query: (userDetails) => ({
        url: "/user/updateUser",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["User"], // Invalidate the User tag after saving user details
    }),
    submitEnquiry: builder.mutation({
      query: (equiryDetails) => ({
        url: "/enquiry/submitEnquiry",
        method: "POST",
        body: equiryDetails,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: "/user/verify",
        method: "POST",
        body: otp,
      }),
      invalidatesTags: ["Auth"], // Invalidate Auth tag after OTP verification
    }),
    getCategory: builder.query({
      query: () => "/category/getCategory",
    }),
    getPlans: builder.query({
      query: (country) => ({
        url: `/plan/getPlan`,
        params: {
          country: country || "", // Add the country as a query parameter (defaults to empty string if not provided)
        },
      }),
    }),
    getPlanByUserId: builder.query({
      query: (userId) => `/getPlanByUserId/${userId}`,
    }),
    getContent: builder.query({
      query: () => `/content/allContent`,
    }),
    getMySubscriptions: builder.query({
      query: () => `/user/mySubscription`,
    }),
    getUserPlan: builder.query({
      query: (queryParams) => ({
        url: `/userplan`,
        params: queryParams,
      }),
    }),
    createSubscription: builder.mutation({
      query: (planId) => ({
        url: `/userplan`,
        method: "POST",
        body: planId,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/delete/${userId}`, // DELETE endpoint
        method: "DELETE", // Use DELETE method for deleting
      }),
      // Invalidate tags related to users after deleting
      invalidatesTags: ["User"],
    }),

    // New property-related endpoints
    createProperty: builder.mutation({
      query: (propertyData) => ({
        url: "/property",
        method: "POST",
        body: propertyData,
      }),
      invalidatesTags: ["Property"], // Invalidate Property tag after creating
    }),
    getProperties: builder.query({
      query: (queryParams) => ({
        url: "/property",
        params: queryParams, // Pass search queries as params
      }),
      providesTags: ["Property"], // Tag this endpoint for future invalidation
    }),
    editProperty: builder.mutation({
      query: ({ id, ...propertyData }) => ({
        url: `/property/${id}`,
        method: "PATCH",
        body: propertyData,
      }),
      invalidatesTags: ["Property"], // Invalidate Property tag after editing
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"], // Invalidate Property tag after deleting
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserDetailsQuery,
  useSaveUserDetailsMutation,
  useSubmitEnquiryMutation,
  useVerifyOtpMutation,
  useGetCategoryQuery,
  useGetPlansQuery,
  useLazyGetPlanByUserIdQuery,
  useGetPlanByUserIdQuery,
  useGetContentQuery,
  useGetMySubscriptionsQuery,
  useGetUserPlanQuery,
  useCreateSubscriptionMutation,
  useDeleteUserMutation,
  useCreatePropertyMutation, // New hook for creating property
  useGetPropertiesQuery, // New hook for fetching properties
  useEditPropertyMutation, // New hook for editing property
  useDeletePropertyMutation, // New hook for deleting property
} = apiSlice;

// Function to handle logout and invalidate user queries
export const logoutAndInvalidateQueries = (dispatch: AppDispatch) => {
  localStorage.removeItem("auth_Token");
  // Invalidate all user-related queries
  dispatch(apiSlice.util.invalidateTags(["User", "Auth"]));
};
