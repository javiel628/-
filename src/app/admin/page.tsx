import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function Admin(){let supabase;try{supabase=await createClient()}catch{return <main className="page-shell"><div className="notice">Configure Supabase before using admin tools.</div></main>}
 const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).maybeSingle();if(profile?.role!=="admin")redirect("/dashboard");
 const {data:apps,error}=await supabase.from("membership_applications").select("id,full_name,email,reason,status,created_at").order("created_at",{ascending:false}).limit(100);
 return <main className="page-shell"><div className="eyebrow">Restricted</div><h1 style={{fontFamily:"Cinzel,serif",color:"var(--gold2)",fontWeight:500}}>ADMIN PANEL</h1><div className="panel"><p className="muted">Recent membership applications. This view is protected by authentication and database role policies.</p>{error?<div className="notice">Unable to load applications. Check the database schema and RLS policies.</div>:!apps?.length?<p className="muted">No applications yet.</p>:<div className="stack">{apps.map(app=><article className="dashboard-card" key={app.id}><div className="row-between"><strong>{app.full_name}</strong><span className="muted">{app.status}</span></div><p className="muted">{app.email} · {new Date(app.created_at).toLocaleString()}</p><p className="section-copy">{app.reason}</p></article>)}</div>}</div><p><Link className="text-link" href="/dashboard">← Dashboard</Link></p></main>
}
