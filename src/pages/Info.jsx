import {useState} from 'react'
import {Link} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import {faqs} from '../data.js'
import {LeadForm} from '../components/Forms.jsx'
import {Counter,Heading,Icon,Page,PageHead,Reveal} from '../components/ui.jsx'

export function Faq({limit}){
  const [open,setOpen]=useState(0),list=limit?faqs.slice(0,limit):faqs
  return <div className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-panel">{list.map(([q,a],i)=><div key={q}>
    <button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold transition hover:text-brass">{q}<motion.span animate={{rotate:open===i?45:0}} className="shrink-0 text-brass"><Icon d="M12 5v14M5 12h14"/></motion.span></button>
    <AnimatePresence initial={false}>{open===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><p className="px-6 pb-6 text-dim">{a}</p></motion.div>}</AnimatePresence></div>)}</div>
}
export const FaqPage=()=><Page><PageHead title="Frequently asked questions" sub="Booking, pricing, delivery and more."/><div className="wrap"><Faq/><p className="mt-8 text-center text-dim">Still unsure? <Link to="/contact" className="text-brass underline underline-offset-4">Ask our team</Link>.</p></div></Page>

export const About=()=><Page><PageHead title="Built by people who love driving" sub="Apex Garage began as a small group of friends who kept finding the best cars through each other. Now we do it for you."/>
  <section className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[[14,'','cars on show'],[11,'','marques'],[12,' yrs','of experience'],[2400,'+','handovers']].map(([n,s,l],i)=><Reveal key={l} delay={i*.08}><div className="rounded-3xl border border-white/10 bg-panel p-6"><p className="font-display text-4xl font-extrabold text-brass"><Counter to={n} suffix={s}/></p><p className="mt-1 text-dim">{l}</p></div></Reveal>)}</section>
  <section className="wrap pt-24"><Heading>What we stand for</Heading><div className="grid gap-5 md:grid-cols-3">{[['Curation over volume','We list fewer cars, and every one earns its place.'],['Plain talk','Clear prices, honest condition reports and advice that puts your needs first.'],['Service after the sale','Servicing, storage and upgrades are a call away long after handover.']].map(([t,d],i)=><Reveal key={t} delay={i*.1}><div className="h-full rounded-3xl bg-panel2 p-7"><h3 className="font-display text-xl font-bold">{t}</h3><p className="mt-3 text-dim">{d}</p></div></Reveal>)}</div></section>
  <section className="wrap pt-24"><Heading>The team</Heading><div className="grid gap-5 sm:grid-cols-3">{[['Rohan Verma','Founder & head of acquisitions'],['Ananya Rao','Client experience lead'],['Karthik Iyer','Technical specialist']].map(([n,r],i)=><Reveal key={n} delay={i*.1}><div className="rounded-3xl border border-white/10 bg-panel p-6"><span className="grid h-16 w-16 place-items-center rounded-full bg-brass font-display text-xl font-extrabold text-ink">{n.split(' ').map(x=>x[0]).join('')}</span><p className="mt-4 font-display text-lg font-bold">{n}</p><p className="text-sm text-dim">{r}</p></div></Reveal>)}</div></section></Page>

export const Contact=()=><Page><PageHead title="Contact us" sub="Visit the showroom, call, or send a message."/>
  <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.4fr]"><div className="space-y-4">{[['Showroom','18 Pit Lane Avenue, Hyderabad','M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 12a2 2 0 1 0 0-.1'],['Phone','+91 40 5555 0100','M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'],['Email','hello@apexgarage.example','M3 6h18v12H3zM3 7l9 7 9-7'],['Hours','Monday to Saturday, 10:00–19:00','M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z']].map(([t,v,p],i)=><Reveal key={t} delay={i*.07}><div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-panel p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brass/15 text-brass"><Icon d={p} c="h-6 w-6"/></span><div><p className="text-sm text-dim">{t}</p><p className="font-semibold">{v}</p></div></div></Reveal>)}</div>
    <LeadForm mode="enquiry" title="Send us a message"/></div>
  <section className="wrap pt-24"><Heading center>Quick answers</Heading><Faq limit={4}/></section></Page>
