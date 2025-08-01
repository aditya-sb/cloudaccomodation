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
      // baseUrl: "http://localhost:8000/api",
      baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
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

  tagTypes: ["User", "Auth", "Property", "Booking", "Dashboard", "Payment", "Enquiry", "Review", "Verification", "Wishlist", "Agent"],
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
    googleAuth: builder.mutation({
      query: (googleUserData) => ({
        url: "/user/google-auth",
        method: "POST",
        body: googleUserData,
      }),
      invalidatesTags: ["User", "Auth"],
    }),
    verifyEmail: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/user/verify-email",
        method: "POST",
        body: { email, otp },
      }),
      invalidatesTags: ["User", "Verification"],
    }),
    resendVerification: builder.mutation({
      query: ({ email }) => ({
        url: "/user/resend-verification",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Verification"],
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
    updateUser: builder.mutation({
      query: (userData) => {
        // For FormData, let the browser set the Content-Type with boundary
        const headers = userData instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' };

        return {
          url: '/user/updateUser',
          method: 'POST',
          headers,
          body: userData,
        };
      },
      invalidatesTags: ['User'],
    }),
    submitEnquiry: builder.mutation({
      query: (equiryDetails) => ({
        url: "/enquiry/submitEnquiry",
        method: "POST",
        body: equiryDetails,
      }),
      invalidatesTags: ["Enquiry"],
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
        params: {
          ...queryParams,
          verified: true
        },
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

    // New booking-related endpoints
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking/create",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"], // Invalidate Booking tag after creating
    }),
    getBookings: builder.query({
      query: () => "/booking/all",
      providesTags: ["Booking"], // Tag this endpoint for future invalidation
    }),
    getBookingById: builder.query({
      query: (id) => `/booking/${id}`,
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    getUserBookings: builder.query({
      query: (userId) => `/booking/user/${userId}`,
      providesTags: ["Booking"],
    }),
    getPropertyBookings: builder.query({
      query: ({ id }) => `/booking/property/${id}`,
      providesTags: ["Booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/booking/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Booking", id },
        "Booking",
      ],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"], // Invalidate Booking tag after deleting
    }),

    // Dashboard stats endpoint
    getDashboardStats: builder.query({
      query: (params) => ({
        url: "/analytics/dashboard",
        params: params,
      }),
      providesTags: ["Dashboard"],
    }),

    // Reviews-related endpoints
    getPropertyReviews: builder.query({
      query: (propertyId) => `/analytics/reviews/property/${propertyId}`,
      providesTags: ["Review"],
    }),
    addReview: builder.mutation({
      query: ({ propertyId, reviewData }) => ({
        url: `/analytics/review/${propertyId}`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    // Enquiry-related endpoints
    getEnquiries: builder.query({
      query: () => "/enquiry/all",
      providesTags: ["Enquiry"],
    }),
    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/enquiry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiry"],
    }),

    // Payment-related endpoints
    createPaymentIntent: builder.mutation({
      query: (data) => {
        console.log("Creating payment intent with data:", data);
        return {
          url: "/payment/create-payment-intent",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Payment", "Booking"],
    }),
    confirmPayment: builder.mutation({
      query: (paymentIntentId) => ({
        url: "/payment/confirm-payment",
        method: "POST",
        body: paymentIntentId,
      }),
      invalidatesTags: ["Payment", "Booking"],
    }),
    getPaymentStatus: builder.query({
      query: (bookingId) => `/payment/status/${bookingId}`,
      providesTags: (result, error, bookingId) => [{ type: "Payment", id: bookingId }],
    }),

    // Universities-related endpoint
    getUniversitiesByLocation: builder.query({
      query: ({ city, country }) => ({
        url: `/property/universities`,
        params: {
          ...(city && { city }),
          ...(country && { country })
        },
      }),
      transformResponse: (response) => {
        // If response is an array, return it; otherwise, return an empty array
        return Array.isArray(response) ? response : [];
      },
    }),
    // Updated API routes for wishlist
    getWishlist: builder.query({
      query: (userId) => `/wishlist/${userId}`,
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/add",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ userId, propertyId }) => ({
        url: "/wishlist/remove",
        body: { userId, propertyId },
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    // Agent endpoints
    createAgentRequest: builder.mutation({
      query: (agentData: any) => ({
        url: '/getAgent/createAgentRequest',
        method: 'POST',
        body: agentData,
      }),
      invalidatesTags: ['Agent'],
    }),

    getAllAgentRequests: builder.query<any, void>({
      query: () => '/getAgent/getAllAgentRequest',
      providesTags: ['Agent'],
    }),

    getAgentRequest: builder.query<any, string>({
      query: (id: string) => `/getAgent/getAgentRequest/${id}`,
      providesTags: (result, error, id) => [{ type: 'Agent' as const, id }],
    }),

    updateAgentRequest: builder.mutation<unknown, { id: string; updates: any }>({
      query: ({ id, updates }) => ({
        url: `/getAgent/updateAgentRequest/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Agent',
        { type: 'Agent' as const, id },
      ],
    }),

    deleteAgentRequest: builder.mutation<unknown, string>({
      query: (id: string) => ({
        url: `/getAgent/deleteAgentRequest/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Agent'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useGoogleAuthMutation,
  useGetUserDetailsQuery,
  useSaveUserDetailsMutation,
  useUpdateUserMutation,
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
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useEditPropertyMutation,
  useDeletePropertyMutation,
  // Booking hooks
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
  // Dashboard hooks
  useGetDashboardStatsQuery,
  useLazyGetDashboardStatsQuery,
  // Review hooks
  useGetPropertyReviewsQuery,
  useAddReviewMutation,
  // Enquiry hooks
  useGetEnquiriesQuery,
  useDeleteEnquiryMutation,
  // Payment hooks
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentStatusQuery,
  // Universities hook
  useGetUniversitiesByLocationQuery,
  // User-specific bookings hook
  useGetUserBookingsQuery,
  useGetPropertyBookingsQuery,
  // Wishlist hooks
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  // Agent hooks
  useCreateAgentRequestMutation,
  useGetAllAgentRequestsQuery,
  useGetAgentRequestQuery,
  useUpdateAgentRequestMutation,
  useDeleteAgentRequestMutation,
} = apiSlice;

// Function to handle logout and invalidate user queries
export const logoutAndInvalidateQueries = (dispatch: AppDispatch) => {
  localStorage.removeItem("auth_Token");
  // Invalidate all user-related queries
  dispatch(apiSlice.util.invalidateTags(["User", "Auth"]));
};
