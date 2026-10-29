 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function SignOutButton(){const [busy,setBusy]=useState(false);const router=useRouter();async function signOut(){setBusy(true);try{const supabase=createClient();await supabase.auth.signOut();router.push("/login");router.refresh()}finally{setBusy(false)}}return <button className="btn" onClick={signOut} disabled={busy}>{busy?"Signing out…":"Sign Out"}</button>}
