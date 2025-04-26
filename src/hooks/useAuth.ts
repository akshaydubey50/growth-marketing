import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserAuth } from "@/redux/slice/auth/auth.slice"; // Adjust import path as needed

export const useAuthState = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    // Update Redux auth state based on session status
    if (status === "authenticated" && session) {
      dispatch(setUserAuth(true));
    } else {
      dispatch(setUserAuth(false));
    }
  }, [session, status, dispatch]);

  return {
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    session,
    status
  };
};