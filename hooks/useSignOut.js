import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

export const useSignOut = () => {
  const auth = useAuth();
  const router = useRouter();

  const signOut = () => {
    auth.signOut.then(() => {
      router.push("/login");
    });
  };

  return signOut;
};
