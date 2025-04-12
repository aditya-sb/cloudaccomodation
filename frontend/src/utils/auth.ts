    export const extractUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("auth_Token");
    if (!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const parsedToken = JSON.parse(jsonPayload);
    const userId = parsedToken._id || parsedToken.id;

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    return userId;
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};
