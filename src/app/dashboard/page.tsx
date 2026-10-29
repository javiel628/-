import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

export default async function Dashboard(){
 let supabase;try{supabase=await createClient()}catch{return <main className="page-shell"><div className="notice">Supabase setup is required before the private dashboard can be used. Follow README.md.</div></main>}
 const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("display_name").eq("id",user.id).maybeSingle();
 const role = user.app_metadata?.role === "admin" ? "admin" : "member";
 return <main className="page-shell"><div className="row-between"><div><div className="eyebrow">Private Area</div><h1 style={{fontFamily:"Cinzel,serif",color:"var(--gold2)",fontWeight:500}}>MEMBER DASHBOARD</h1></div><SignOutButton/></div><div className="panel"><h2>Welcome{profile?.display_name?`, ${profile.display_name}`:""}.</h2><p className="muted">Signed in as {user.email}. This is your authenticated member area.</p><div className="dashboard-cards"><div className="dashboard-card"><strong>Account</strong><span className="muted">Authenticated</span></div><div className="dashboard-card"><strong>Role</strong><span className="muted">{role}</span></div><div className="dashboard-card"><strong>Community</strong><span className="muted">Learn and participate</span></div></div>{role==="admin"?<Link className="btn" href="/admin">Open Admin Panel</Link>:<p className="muted">Admin tools are available only to accounts explicitly assigned the admin role in the database.</p>}</div></main>
}
