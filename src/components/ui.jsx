import {useEffect,useId,useRef,useState} from 'react'
import {Link,NavLink,useLocation} from 'react-router-dom'
import {AnimatePresence,animate,motion,useInView,useScroll,useSpring} from 'framer-motion'
import {useStore} from '../store.jsx'
import {money} from '../data.js'

const ease=[.22,1,.36,1]
export const Reveal=({children,delay=0,x=0,y=36,className=''})=>
  <motion.div className={className} initial={{opacity:0,y,x}} whileInView={{opacity:1,y:0,x:0}} viewport={{once:true,margin:'-50px'}} transition={{duration:.8,delay,ease}}>{children}</motion.div>

export const Heading=({children,sub,center})=>
  <div className={`mb-10 max-w-2xl ${center?'mx-auto text-center':''}`}>
    <motion.h2 className="title" initial={{clipPath:'inset(0 100% 0 0)',opacity:0}} whileInView={{clipPath:'inset(0 0% 0 0)',opacity:1}} viewport={{once:true}} transition={{duration:1,ease}}>{children}</motion.h2>
    {sub&&<Reveal delay={.15}><p className="mt-4 text-dim">{sub}</p></Reveal>}
  </div>

export function Counter({to,suffix='',decimals=0}){
  const ref=useRef(null),inView=useInView(ref,{once:true}),[v,setV]=useState(0)
  useEffect(()=>{if(!inView)return;const c=animate(0,to,{duration:1.8,ease,onUpdate:x=>setV(x)});return()=>c.stop()},[inView,to])
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>
}

// Vector car illustration: no external images, so nothing can break.
const BODY={
  coupe:{b:'M14 116 L34 98 Q62 90 112 84 L152 58 Q196 44 250 50 L292 74 Q344 82 376 100 L388 116 L388 126 L14 126 Z',w:'M160 62 Q196 52 240 56 L276 74 L132 82 Z'},
  sedan:{b:'M14 116 L30 96 Q60 88 100 82 L146 54 Q200 40 262 48 L306 76 Q352 84 380 102 L390 116 L390 126 L14 126 Z',w:'M152 58 Q200 47 252 53 L292 76 L124 82 Z'},
  suv:{b:'M14 118 L22 84 Q36 72 92 70 L128 38 Q150 32 260 34 L306 40 L346 76 Q378 82 388 102 L390 118 L390 126 L14 126 Z',w:'M134 44 Q150 40 256 40 L300 46 L330 76 L112 76 Z'}}
export function CarArt({type='coupe',color='#CBA45C',view='side',className=''}){
  const id=useId().replace(/:/g,''),p=BODY[type]||BODY.coupe
  const vb={side:'0 0 400 160',front:'0 14 220 140',rear:'200 24 200 130',flip:'0 0 400 160'}[view]
  return <svg viewBox={vb} className={`${className} ${view==='flip'?'[transform:scaleX(-1)]':''}`} role="img" aria-label={`${type} car illustration`}>
    <defs>
      <linearGradient id={'g'+id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45"/><stop offset=".4" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".45"/></linearGradient>
      <radialGradient id={'r'+id}><stop offset="0" stopColor="#000" stopOpacity=".55"/><stop offset="1" stopColor="#000" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="200" cy="132" rx="185" ry="9" fill={`url(#r${id})`}/>
    <path d={p.b} fill={color}/><path d={p.b} fill={`url(#g${id})`}/>
    <path d={p.w} fill="#0A1A16" opacity=".85"/><path d={p.w} fill="#8FD0FF" opacity=".12"/>
    <path d="M40 104 Q200 92 380 106" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" fill="none"/>
    <rect x="368" y="102" width="20" height="5" rx="2.5" fill="#FFF3C4"/><rect x="14" y="104" width="14" height="5" rx="2.5" fill="#FF4B4B"/>
    {[100,308].map(x=><g key={x}><circle cx={x} cy="120" r="25" fill="#0b0f0e"/><circle cx={x} cy="120" r="15" fill="#c9cfd2"/><circle cx={x} cy="120" r="6" fill="#0b0f0e"/>
      {[0,60,120,180,240,300].map(a=><line key={a} x1={x} y1="120" x2={x+14*Math.cos(a*Math.PI/180)} y2={120+14*Math.sin(a*Math.PI/180)} stroke="#0b0f0e" strokeWidth="2"/>)}</g>)}
  </svg>
}

export const Logo=({className=''})=><span className={`inline-flex items-center gap-3 ${className}`}>
  <svg viewBox="0 0 44 44" className="h-10 w-10" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#CBA45C"/><path d="M22 7l14 30h-7l-7-15-7 15H8z" fill="#0A1A16"/><path d="M13 29h18" stroke="#CBA45C" strokeWidth="3"/><path d="M4 33h7M2 38h9" stroke="#0A1A16" strokeWidth="2" strokeLinecap="round" opacity=".5"/></svg>
  <span className="font-display leading-none"><b className="block text-[1.35rem] font-extrabold tracking-[.14em]">APEX</b><span className="mt-1 block text-[.62rem] font-semibold tracking-[.55em] text-brass">GARAGE</span></span></span>

export const EXT=['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP']
export function CarImage({car,n=1,view='side',pad='',className='',chip=''}){
  const [i,setI]=useState(0)
  useEffect(()=>setI(0),[car.id,n])
  if(i>=EXT.length)return chip?<span className={chip}>{car.name}</span>:<div className={pad}><CarArt type={car.body} color={car.color} view={view} className="w-full"/></div>
  return <img src={`${import.meta.env.BASE_URL}cars/${car.id}-${n}.${EXT[i]}`} alt={`${car.full}${n>1?`, photo ${n}`:''}`} loading="lazy" decoding="async" onError={()=>setI(x=>x+1)} className={className}/>
}

// Shows the first available photo among a group of cars (a brand or a category).
export function GroupImage({list,ph='',label='',className=''}){
  const cand=list.flatMap(c=>EXT.map(e=>[c,e])),[i,setI]=useState(0),key=list.map(c=>c.id).join()
  useEffect(()=>setI(0),[key])
  if(i>=cand.length)return <div className={ph}>{label}</div>
  const [c,e]=cand[i]
  return <img src={`${import.meta.env.BASE_URL}cars/${c.id}-1.${e}`} alt={c.full} loading="lazy" decoding="async" onError={()=>setI(x=>x+1)} className={className}/>
}

export function Toast(){
  const {toast}=useStore()
  return <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4" aria-live="polite">
    <AnimatePresence>{toast&&<motion.div key={toast.k} initial={{y:40,opacity:0,scale:.9}} animate={{y:0,opacity:1,scale:1}} exit={{y:20,opacity:0}} className="rounded-full border border-brass/40 bg-panel2 px-5 py-3 text-sm font-medium shadow-2xl">{toast.m}</motion.div>}</AnimatePresence></div>
}

export const Icon=({d,c='h-5 w-5'})=><svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
export const heartD='M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z'

export function Navbar(){
  const {wish,cmp}=useStore(),[open,setOpen]=useState(false),[solid,setSolid]=useState(false),loc=useLocation()
  const {scrollYProgress}=useScroll(),sx=useSpring(scrollYProgress,{stiffness:120,damping:25})
  useEffect(()=>{const f=()=>setSolid(window.scrollY>30);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
  useEffect(()=>setOpen(false),[loc.pathname])
  const links=[['/','Home'],['/collection','Collection'],['/brands','Brands'],['/compare','Compare'],['/about','About'],['/contact','Contact']]
  const cls=({isActive})=>`relative px-1 py-2 text-sm font-medium transition hover:text-brass ${isActive?'text-brass':'text-mist'}`
  return <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${solid||open?'bg-ink/85 backdrop-blur-xl border-b border-white/5':''}`}>
    <motion.div style={{scaleX:sx}} className="absolute inset-x-0 top-0 h-[2px] origin-left bg-brass"/>
    <div className="wrap flex h-[72px] items-center justify-between">
      <Link to="/" aria-label="Apex Garage home"><Logo/></Link>
      <nav className="hidden items-center gap-7 lg:flex">{links.map(([to,l])=><NavLink key={to} to={to} end={to==='/'} className={cls}>{l}{l==='Compare'&&cmp.length>0?` (${cmp.length})`:''}</NavLink>)}</nav>
      <div className="flex items-center gap-2">
        <Link to="/wishlist" aria-label="Wishlist" className="relative rounded-full p-2.5 transition hover:bg-white/10"><Icon d={heartD}/>{wish.length>0&&<span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1 text-[11px] font-bold text-ink">{wish.length}</span>}</Link>
        <Link to="/test-drive" className="btn btn-brass hidden sm:inline-flex !py-2.5">Book test drive</Link>
        <button className="rounded-full p-2.5 hover:bg-white/10 lg:hidden" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}><Icon d={open?'M6 6l12 12M18 6L6 18':'M4 7h16M4 12h16M4 17h16'} c="h-6 w-6"/></button>
      </div></div>
    <AnimatePresence>{open&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden lg:hidden"><div className="wrap flex flex-col gap-1 pb-6">
      {[...links,['/wishlist','Wishlist'],['/test-drive','Book test drive']].map(([to,l],i)=><motion.div key={to} initial={{x:-20,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:i*.04}}><NavLink to={to} end={to==='/'} className={({isActive})=>`block rounded-xl px-3 py-3 text-lg font-display font-bold ${isActive?'bg-panel text-brass':''}`}>{l}{l==='Compare'&&cmp.length>0?` (${cmp.length})`:''}</NavLink></motion.div>)}
    </div></motion.div>}</AnimatePresence></header>
}

export function Footer(){
  return <footer className="mt-24 border-t border-white/10 bg-panel/40">
    <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div><Logo/><p className="mt-3 max-w-xs text-sm text-dim">A curated collection of the world’s most desirable cars, with concierge-level service from first look to final handover.</p></div>
      {[['Explore',[['/collection','Collection'],['/brands','Brands & categories'],['/compare','Compare cars'],['/wishlist','Wishlist']]],['Company',[['/about','About us'],['/contact','Contact'],['/faq','FAQ'],['/test-drive','Book a test drive']]]].map(([h,ls])=><div key={h}><p className="font-display font-bold">{h}</p><ul className="mt-3 space-y-2 text-sm text-dim">{ls.map(([to,l])=><li key={to}><Link className="transition hover:text-brass" to={to}>{l}</Link></li>)}</ul></div>)}
      <div><p className="font-display font-bold">Showroom</p><address className="mt-3 space-y-2 text-sm not-italic text-dim"><p>18 Pit Lane Avenue, Hyderabad</p><p>Mon–Sat, 10:00–19:00</p><p>hello@apexgarage.example</p></address></div>
    </div>
    <div className="border-t border-white/5 py-5 text-center text-xs text-dim">© {new Date().getFullYear()} Apex Garage. Illustrations are stylised; specifications are manufacturer figures.</div>
  </footer>
}

export function CarCard({car,i=0}){
  const {wish,cmp,toggleWish,toggleCmp}=useStore(),liked=wish.includes(car.id),cmpd=cmp.includes(car.id)
  return <motion.article layout initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.92}} transition={{duration:.5,delay:Math.min(i,8)*.05,ease}} whileHover={{y:-8}} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-panel transition-colors duration-300 hover:border-brass/50">
    <div className="absolute right-3 top-3 z-10">
      <motion.button whileTap={{scale:.8}} onClick={()=>toggleWish(car.id)} aria-label={liked?'Remove from wishlist':'Add to wishlist'} aria-pressed={liked} className={`grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${liked?'bg-brass text-ink':'bg-ink/60 hover:bg-ink'}`}><Icon d={heartD}/></motion.button>
    </div>
    <Link to={`/car/${car.id}`} className="block">
      <div className="relative overflow-hidden bg-gradient-to-b from-panel2 to-panel">
        <span className="absolute left-4 top-4 z-[2] rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-brass">{car.category}</span>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-ink/60 to-transparent"/>
        <CarImage car={car} pad="p-6 pt-12" className="relative aspect-[16/10] w-full object-cover transition duration-700 ease-out group-hover:scale-105"/>
      </div>
      <div className="p-5"><p className="text-sm text-dim">{car.brand} · {car.year}</p><h3 className="font-display text-xl font-bold">{car.name}</h3>
        <div className="mt-3 flex gap-4 text-xs text-dim"><span>{car.hp} hp</span><span>0–60 in {car.zero}s</span><span>{car.fuel}</span></div></div>
    </Link>
    <div className="flex items-center justify-between border-t border-white/10 px-5 py-4"><p className="font-display font-bold text-brass">{money(car.price)}</p>
      <button onClick={()=>toggleCmp(car.id)} aria-pressed={cmpd} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${cmpd?'border-brass bg-brass text-ink':'border-white/20 hover:border-brass hover:text-brass'}`}>{cmpd?'Added':'Compare'}</button></div>
  </motion.article>
}

export const Page=({children})=><motion.main initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.45,ease}}>{children}</motion.main>
export const PageHead=({title,sub})=><section className="relative overflow-hidden pt-36 pb-12"><div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-brass/10 blur-3xl"/><div className="wrap relative"><h1 className="title max-w-3xl">{title}</h1>{sub&&<p className="mt-4 max-w-xl text-dim">{sub}</p>}</div></section>
