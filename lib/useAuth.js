    /*lib/useAuth.js*/
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Récupérer session actuelle
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      if (data?.session?.user) fetchProfile(data.session.user.id);
    });

    // Écoute des changements (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchProfile = async (id) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
    setProfile(data);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return { user, profile, logout };
}
