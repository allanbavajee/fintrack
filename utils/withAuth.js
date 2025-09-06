// utils/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.replace("/auth"); // si pas login → redirect
        }
      };
      checkSession();
    }, [router]);

    return <Component {...props} />;
  };
}
