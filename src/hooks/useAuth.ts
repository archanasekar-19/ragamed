import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppStore } from "../store/appStore";

export function useAuth() {
  const { user, authLoading, setUser, setAuthLoading } = useAppStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAuthLoading(false);
    }, 5000);

    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          clearTimeout(timeout);
          setUser(firebaseUser);
          setAuthLoading(false);
        },
        (_error) => {
          clearTimeout(timeout);
          setUser(null);
          setAuthLoading(false);
        }
      );
    } catch {
      clearTimeout(timeout);
      setAuthLoading(false);
    }

    return () => {
      clearTimeout(timeout);
      unsubscribe?.();
    };
  }, [setUser, setAuthLoading]);

  return { user, authLoading };
}