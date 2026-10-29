import Link from "next/link";
import { ArrowRight, Eye, Shield, Users, BookOpen, UserRound } from "lucide-react";

const features = [
  { icon: Eye, title: "OUR HISTORY", text: "Explore the symbolism, origins, and stories behind the Order.", link: "/about", action: "Learn More" },
  { icon: Shield, title: "OUR PRINCIPLES", text: "Discover the values of integrity, curiosity, and personal growth.", link: "/principles", action: "Explore" },
  { icon: BookOpen, title: "MEMBERSHIP", text: "Learn about participation and submit an application.", link: "/membership", action: "Apply Now" },
  { icon: Users, title: "OUR COMMUNITY", text: "A community built around learning, respect, and shared purpose.", link: "/membership", action: "Meet Us" }
];

export default function Home() {
  return <>
    <header className="site-nav">
      <Link className="brand" href="/"><span className="brand-mark">𓂀</span><span>ORDER OF THE VEIL</span></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link className="active" href="/">Home</Link><Link href="/about">About</Link><Link href="/principles">Principles</Link><Link href="/membership">Membership</Link><Link href="/announcements">Announcements</Link><Link href="/contact">Contact</Link>
      </nav>
      <Link className="btn" href="/login"><UserRound size={15}/> Member Login</Link>
    </header>
    <main>
      <section className="hero">
        <div>
          <div className="eyebrow">Power · Knowledge · Unity</div>
          <h1>ORDER OF<br/>THE VEIL</h1>
          <p>Beyond what you see lies the opportunity to learn, question, and grow. A community shaped by curiosity, integrity, and unity.</p>
          <div className="hero-actions"><Link className="btn primary" href="/membership">Explore Membership <ArrowRight size={15}/></Link><Link className="btn" href="/about">Discover the Order</Link></div>
        </div>
        <div>
          <div className="sigil-wrap"><div className="sigil"><div className="sigil-inner"><div className="sigil-eye">𓂀</div><div className="sigil-caption">KNOWLEDGE · UNITY</div></div></div></div>
          <div className="quote">“Seek understanding.<br/>Act with integrity.<br/>Build with purpose.”</div>
        </div>
      </section>
      <section className="feature-grid">{features.map(({icon:Icon,title,text,link,action})=><article className="feature" key={title}><Icon className="feature-icon" size={31} strokeWidth={1.3}/><h3>{title}</h3><p>{text}</p><Link className="text-link" href={link}>{action} <ArrowRight size={12} style={{display:"inline",verticalAlign:"middle"}}/></Link></article>)}</section>
      <section className="section about-grid" id="about">
        <div className="art-panel"><div className="art-symbol">𓂀</div></div>
        <div><div className="eyebrow">About the Order</div><h2>A SYMBOL OF CURIOSITY</h2><p className="section-copy">The Order of the Veil is presented as a community concept centered on the pursuit of knowledge, reflection, and personal growth. Our visual language draws on ancient symbolism and the timeless appeal of mystery—not claims of supernatural power or guaranteed influence.</p><p className="section-copy">Explore the principles, learn about the community, and decide whether its stated purpose aligns with your own.</p><Link className="btn" href="/about">Read Our Story <ArrowRight size={14}/></Link></div>
      </section>
      <section className="section mission"><div className="mission-symbol">𓂀</div><div><div className="eyebrow">Our Mission</div><h2>TO SEEK · TO LEARN · TO BUILD</h2><p className="section-copy">A shared commitment to curiosity, ethical conduct, open-minded learning, and building a better tomorrow through informed choices.</p></div></section>
      <section className="stats"><div className="stat"><strong>01</strong><span>Shared Purpose</span></div><div className="stat"><strong>∞</strong><span>Room to Learn</span></div><div className="stat"><strong>100%</strong><span>Respect Matters</span></div><div className="stat"><strong>ONE</strong><span>Community Vision</span></div></section>
      <section className="cta"><div className="eyebrow">Your next chapter starts with curiosity</div><h2>KNOWLEDGE IS A JOURNEY.</h2><p className="muted">Read the principles and submit an application if you wish to take part.</p><Link className="btn primary" href="/membership">Explore Membership <ArrowRight size={15}/></Link></section>
    </main>
    <footer className="footer"><Link className="brand" href="/"><span className="brand-mark">𓂀</span><span>ORDER OF THE VEIL</span></Link><div className="footer-links"><Link href="/about">About</Link><Link href="/principles">Principles</Link><Link href="/membership">Membership</Link><Link href="/contact">Contact</Link></div><span>© {new Date().getFullYear()} Order of the Veil</span></footer>
  </>;
}
