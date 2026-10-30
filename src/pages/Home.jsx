import {useState} from 'react'
import {Link} from 'react-router-dom'
import {motion,useScroll,useTransform} from 'framer-motion'
import {brands,cars,categories,catInfo} from '../data.js'
import {EXT,CarImage,GroupImage,CarCard,Counter,Heading,Icon,Page,Reveal,heartD} from '../components/ui.jsx'
import {useStore} from '../store.jsx'

function HeroPhoto(){
  const [i,setI]=useState(0)
  if(i>=EXT.length)return null
  return <img src={`${import.meta.env.BASE_URL}cars/hero.${EXT[i]}`} alt="" onError={()=>setI(x=>x+1)} className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"/>
}
function Hero(){
  const {scrollY}=useScroll()
  const bx=useTransform(scrollY,[0,600],[0,-260]),cx=useTransform(scrollY,[0,600],[0,220]),op=useTransform(scrollY,[0,500],[1,0])
  const words=['Drive','the','cars','you’ve','only','dreamed','about.']
  return <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
    <HeroPhoto/><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(203,164,92,.22),transparent_55%),radial-gradient(ellipse_at_10%_0%,rgba(23,56,47,.9),transparent_60%)]"/>
    <motion.p style={{x:bx}} aria-hidden className="outline-text pointer-events-none absolute -left-10 bottom-24 select-none whitespace-nowrap font-display text-[26vw] font-extrabold leading-none">COLLECTION</motion.p>
    <div className="wrap relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
      <motion.div style={{opacity:op}}>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}} className="mb-5 inline-flex items-center gap-2 rounded-full border border-brass/40 px-4 py-1.5 text-sm text-brass"><span className="h-2 w-2 animate-pulse rounded-full bg-brass"/>New arrivals: Revuelto, Spectre, Urus SE</motion.p>
        <h1 className="title !text-5xl sm:!text-6xl lg:!text-7xl">{words.map((w,i)=><span key={i} className="mr-[.25em] inline-block overflow-hidden align-bottom"><motion.span className="inline-block" initial={{y:'110%'}} animate={{y:0}} transition={{duration:.9,delay:.3+i*.08,ease:[.22,1,.36,1]}}>{w}</motion.span></span>)}</h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.1}} className="mt-6 max-w-md text-lg text-dim">Fourteen hand-picked supercars, grand tourers, SUVs and electric rockets. Compare them, save your favourites and book a drive.</motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.25}} className="mt-8 flex flex-wrap gap-3"><Link to="/collection" className="btn btn-brass">Explore the collection</Link><Link to="/test-drive" className="btn btn-ghost">Book a test drive</Link></motion.div>
        <motion.dl initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}} className="mt-12 flex gap-8 sm:gap-12">{[['1,020','hp peak power'],['1.99s','fastest 0–60 mph'],['11','marques']].map(([a,b])=><div key={b}><dt className="font-display text-2xl font-extrabold text-brass sm:text-3xl">{a}</dt><dd className="text-xs text-dim">{b}</dd></div>)}</motion.dl>
      </motion.div>
      <motion.div style={{x:cx}} className="relative">
        <motion.div initial={{x:-500,opacity:0}} animate={{x:0,opacity:1}} transition={{type:'spring',stiffness:40,damping:14,delay:.4}} className="relative">
          <motion.div animate={{y:[0,-6,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}><CarImage car={cars.find(c=>c.id==='revuelto')} className="aspect-[16/10] w-full rounded-3xl object-cover shadow-[0_30px_60px_rgba(0,0,0,.6)]"/></motion.div>
          <div className="absolute -right-10 top-[58%] h-10 w-2/3 origin-left rounded-full bg-gradient-to-r from-[#FFF3C4]/60 to-transparent blur-xl [animation:beam_3s_ease-in-out_infinite]"/>
        </motion.div>
        <div className="road mx-auto mt-2 h-[3px] w-full rounded opacity-60"/>
      </motion.div>
    </div>
    <motion.div animate={{y:[0,10,0]}} transition={{duration:1.8,repeat:Infinity}} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-dim sm:block"><Icon d="M6 9l6 6 6-6"/></motion.div>
  </section>
}

const Features=[['Verified provenance','Every car is inspected and documented before it joins the collection.','M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'],['Private test drives','Drive on your route, at your pace, with a specialist beside you.','M5 17l2-6h10l2 6M7 17v2M17 17v2M7 11l1-3h8l1 3'],['Concierge delivery','Insured, enclosed transport and handover at your door, worldwide.','M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0 .1M17 19a1.5 1.5 0 1 0 0 .1'],['Finance & trade-in','Flexible terms and a fair valuation of your current car.','M12 3v18M16 7.5c0-1.500-1.800-2.500-4-2.500s-4 1-4 2.500 1.800 2.500 4 2.500 4 1 4 2.500-1.800 2.500-4 2.500-4-1-4-2.500']]
const Steps=[['Choose','Filter by brand, category or budget, then compare up to three cars.'],['Drive','Book a private test drive. We bring the car to you or meet at the showroom.'],['Own','Sign off, relax, and let our team handle paperwork and delivery.']]
const Quotes=[['Aarav M.','The Revuelto test drive was booked in two minutes and the handover felt like an event.'],['Priya S.','Comparing the Taycan and Plaid side by side made a hard decision simple.'],['Daniel R.','Honest advice, no pressure, and the car arrived exactly as promised.']]

export default function Home(){
  const {say}=useStore(),[mail,setMail]=useState(''),[err,setErr]=useState('')
  const sub=e=>{e.preventDefault();if(!/^\S+@\S+\.\S+$/.test(mail)){setErr('Enter a valid email address.');return}setErr('');setMail('');say('Subscribed. Watch your inbox for new arrivals.')}
  const feat=cars.filter(c=>['revuelto','spectre','911gt3','urus','taycan','db12'].includes(c.id))
  return <Page>
    <Hero/>
    <div className="overflow-hidden border-y border-white/10 bg-panel/50 py-5" aria-label="Brands"><div className="marquee flex w-max gap-14 whitespace-nowrap font-display text-2xl font-bold text-dim">{[...brands,...brands,...brands,...brands].map((b,i)=><Link to={`/collection?brand=${encodeURIComponent(b)}`} key={i} className="transition hover:text-brass">{b}</Link>)}</div></div>

    <section className="wrap pt-24"><Heading sub="A short list of what our specialists would drive today.">Featured this month</Heading>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{feat.map((c,i)=><Reveal key={c.id} delay={(i%3)*.08}><CarCard car={c} i={0}/></Reveal>)}</div>
      <Reveal className="mt-10 text-center"><Link to="/collection" className="btn btn-ghost">View all {cars.length} cars</Link></Reveal></section>

    <section className="wrap pt-28"><Heading sub="Pick the kind of drive you want.">Shop by category</Heading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map((c,i)=>{const grp=cars.filter(x=>x.category===c);return <Reveal key={c} delay={i*.07}><Link to={`/collection?cat=${c}`} className="group relative block h-72 overflow-hidden rounded-3xl border border-white/10 bg-panel p-5 transition hover:border-brass/60">
        <div className="absolute inset-0 bg-gradient-to-t from-brass/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"/>
        <h3 className="relative font-display text-2xl font-extrabold">{c}</h3><p className="relative mt-1 text-sm text-dim">{catInfo[c]}</p>
        <GroupImage list={grp} ph="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brass/20 to-transparent" className="absolute inset-x-0 bottom-0 h-40 w-full object-cover transition duration-700 group-hover:scale-110"/></Link></Reveal>})}</div></section>

    <section className="mt-28 border-y border-white/10 bg-panel/40 py-20"><div className="wrap grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
      {[[14,'','Cars in the collection'],[11,'','Marques represented'],[1020,' hp','Most powerful car'],[98,'%','Clients who recommend us']].map(([n,s,l],i)=><Reveal key={l} delay={i*.08}><p className="font-display text-5xl font-extrabold text-brass sm:text-6xl"><Counter to={n} suffix={s}/></p><p className="mt-2 text-dim">{l}</p></Reveal>)}</div></section>

    <section className="wrap pt-28"><Heading sub="From first click to the keys in your hand.">Why Apex Garage</Heading>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Features.map(([t,d,p],i)=><Reveal key={t} delay={i*.08}><div className="h-full rounded-3xl border border-white/10 bg-panel p-6 transition hover:-translate-y-1 hover:border-brass/50"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brass/15 text-brass"><Icon d={p} c="h-6 w-6"/></span><h3 className="mt-5 font-display text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-dim">{d}</p></div></Reveal>)}</div></section>

    <section className="wrap pt-28"><Heading>Three steps to your next car</Heading>
      <ol className="grid gap-5 md:grid-cols-3">{Steps.map(([t,d],i)=><Reveal key={t} delay={i*.1}><li className="relative h-full overflow-hidden rounded-3xl bg-panel2 p-7"><span aria-hidden className="outline-text absolute -right-2 -top-4 font-display text-9xl font-extrabold">{i+1}</span><h3 className="relative font-display text-2xl font-bold">{t}</h3><p className="relative mt-3 max-w-xs text-dim">{d}</p></li></Reveal>)}</ol></section>

    <section className="wrap pt-28"><Heading>What drivers say</Heading>
      <div className="grid gap-5 md:grid-cols-3">{Quotes.map(([n,q],i)=><Reveal key={n} delay={i*.1}><figure className="h-full rounded-3xl border border-white/10 bg-panel p-7"><p className="text-brass" aria-label="5 stars">★★★★★</p><blockquote className="mt-4 text-lg leading-relaxed">“{q}”</blockquote><figcaption className="mt-5 text-sm text-dim">{n}, verified buyer</figcaption></figure></Reveal>)}</div></section>

    <section className="wrap pt-28"><Reveal><div className="relative overflow-hidden rounded-[2rem] bg-brass p-8 text-ink sm:p-14">
      <CarImage car={cars.find(c=>c.id==='911gt3')} chip="hidden" className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-90 [mask-image:linear-gradient(to_left,black,transparent)] sm:block"/>
      <h2 className="title relative max-w-xl">Feel it before you decide.</h2><p className="relative mt-4 max-w-md text-ink/80">Book a private test drive in under a minute. We confirm within one business day.</p>
      <Link to="/test-drive" className="btn relative mt-8 bg-ink text-mist hover:bg-white hover:text-ink">Book a test drive</Link></div></Reveal></section>

    <section className="wrap pt-28"><div className="mx-auto max-w-xl text-center"><Heading center sub="New arrivals and private previews, once a month.">Stay in the fast lane</Heading>
      <form onSubmit={sub} noValidate className="flex flex-col gap-3 sm:flex-row"><div className="flex-1 text-left"><input aria-label="Email address" type="email" value={mail} onChange={e=>setMail(e.target.value)} placeholder="you@example.com" className="input"/>{err&&<p role="alert" className="mt-2 text-sm text-red-400">{err}</p>}</div><button className="btn btn-brass">Subscribe</button></form></div></section>
  </Page>
}
