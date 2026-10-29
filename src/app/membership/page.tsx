 "use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Membership(){
 const [form,setForm]=useState({name:"",email:"",reason:""});
 const [status,setStatus]=useState(""); const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setStatus("");
  try{const supabase=createClient();const {error}=await supabase.from("membership_applications").insert({full_name:form.name,email:form.email,reason:form.reason});
   if(error) throw error;setStatus("Application submitted. Keep an eye on the email address you provided for any follow-up.");setForm({name:"",email:"",reason:""});
  }catch(err){setStatus(err instanceof Error && err.message.includes("not configured") ? "Setup required: add your Supabase URL and public key, then run the SQL setup in supabase/schema.sql." : "Could not submit the application. Check the Supabase setup and database policies, then try again.");}
  finally{setBusy(false)}
 }
 return <main className="page-shell"><div className="eyebrow">Membership</div><h1 style={{fontFamily:"Cinzel,serif",color:"var(--gold2)",fontWeight:500}}>EXPRESS YOUR INTEREST</h1><p className="muted">Read the principles first. Applications are stored in the connected database once setup is complete.</p><div className="panel"><form className="form" onSubmit={submit}><label className="field">Full name<input required minLength={2} maxLength={100} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} autoComplete="name"/></label><label className="field">Email address<input type="email" required maxLength={254} value={form.email} onChange={e=>setForm({...form,email:e.target.value})} autoComplete="email"/></label><label className="field">Why are you interested?<textarea required minLength={10} maxLength={1500} rows={5} value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/></label><button className="btn primary" disabled={busy}>{busy?"Submitting…":"Submit Application"}</button>{status&&<div className="notice" role="status">{status}</div>}<p className="muted">Submitting this form does not guarantee membership. Never submit passwords, payment details, or sensitive personal information here.</p></form></div><p><Link className="text-link" href="/">← Return home</Link></p></main>
}
