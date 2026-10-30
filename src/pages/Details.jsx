import {useEffect,useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import {cars,money} from '../data.js'
import {CarImage,CarCard,Heading,Icon,Page,Reveal,heartD} from '../components/ui.jsx'
import {useStore} from '../store.jsx'

const views=[[1,'side','Photo 1'],[2,'front','Photo 2'],[3,'rear','Photo 3'],[4,'flip','Photo 4']]
export default function Details(){
  const {id}=useParams(),car=cars.find(c=>c.id===id),[v,setV]=useState(1),{wish,cmp,toggleWish,toggleCmp}=useStore()
  useEffect(()=>{setV(1);window.scrollTo(0,0)},[id])
  if(!car)return <Page><div className="wrap pt-44 text-center"><h1 className="title">Car not found</h1><Link to="/collection" className="btn btn-brass mt-8">Back to collection</Link></div></Page>
  const specs=[['Engine',car.engine],['Power',`${car.hp} hp`],['0–60 mph',`${car.zero} s`],['Top speed',`${car.top} mph`],['Transmission',car.trans],['Drivetrain',car.drive],['Fuel',car.fuel],['Model year',car.year]]
  const bars=[['Power',car.hp/1100],['Top speed',car.top/220],['Acceleration',1-(car.zero-1.8)/2]]
  const related=cars.filter(c=>c.category===car.category&&c.id!==car.id).concat(cars.filter(c=>c.category!==car.category)).slice(0,3)
  const liked=wish.includes(car.id),cmpd=cmp.includes(car.id)
  return <Page><div className="wrap pt-28">
    <nav className="mb-6 text-sm text-dim" aria-label="Breadcrumb"><Link to="/" className="hover:text-brass">Home</Link> / <Link to="/collection" className="hover:text-brass">Collection</Link> / <span className="text-mist">{car.full}</span></nav>
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div><div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-panel2 to-panel"><div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(203,164,92,.22),transparent_70%)]"/>
        <AnimatePresence mode="wait"><motion.div key={v} initial={{opacity:0,x:40,scale:.96}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:-40}} transition={{duration:.35}}><CarImage car={car} n={v} view={views.find(x=>x[0]===v)[1]} pad="p-6 sm:p-12" className="relative mx-auto aspect-[16/10] w-full object-cover"/></motion.div></AnimatePresence></div>
        <div className="mt-4 grid grid-cols-4 gap-3">{views.map(([k,view,l])=><button key={k} onClick={()=>setV(k)} aria-label={`Show ${l} view`} aria-pressed={v===k} className={`overflow-hidden rounded-2xl border bg-panel p-2 transition ${v===k?'border-brass':'border-white/10 hover:border-white/30'}`}><CarImage car={car} n={k} view={view} pad="p-1" className="aspect-[16/10] w-full rounded-lg object-cover"/><span className="mt-1 block text-center text-xs text-dim">{l}</span></button>)}</div></div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-brass">{car.category} · {car.year}</p><h1 className="title mt-2 !text-4xl sm:!text-5xl">{car.full}</h1>
        <p className="mt-4 text-dim">{car.blurb}</p><p className="mt-6 font-display text-3xl font-extrabold text-brass">{money(car.price)}<span className="ml-2 text-sm font-medium text-dim">starting price</span></p>
        <div className="mt-6 flex flex-wrap gap-3"><Link to={`/test-drive?car=${car.id}`} className="btn btn-brass">Book test drive</Link><Link to={`/test-drive?car=${car.id}&tab=enquiry`} className="btn btn-ghost">Enquire</Link>
          <button onClick={()=>toggleWish(car.id)} aria-pressed={liked} className={`btn ${liked?'btn-brass':'btn-ghost'}`}><Icon d={heartD}/>{liked?'Saved':'Save'}</button>
          <button onClick={()=>toggleCmp(car.id)} aria-pressed={cmpd} className={`btn ${cmpd?'btn-brass':'btn-ghost'}`}>{cmpd?'In comparison':'Compare'}</button></div>
        <div className="mt-8 space-y-4">{bars.map(([l,p],i)=><div key={l}><div className="mb-1 flex justify-between text-sm"><span className="text-dim">{l}</span></div><div className="h-2 overflow-hidden rounded-full bg-panel2"><motion.div initial={{width:0}} animate={{width:`${Math.max(8,Math.min(100,p*100))}%`}} transition={{duration:1,delay:.2+i*.15}} className="h-full rounded-full bg-gradient-to-r from-brass/60 to-brass"/></div></div>)}</div></div></div>
    <section className="pt-20"><Heading>Specifications</Heading><dl className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">{specs.map(([k,x])=><Reveal key={k} y={14}><div className="flex justify-between gap-4 bg-panel px-6 py-4"><dt className="text-dim">{k}</dt><dd className="text-right font-semibold">{x}</dd></div></Reveal>)}</dl></section>
    <section className="pt-20"><Heading>You may also like</Heading><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map(c=><CarCard key={c.id} car={c}/>)}</div></section></div></Page>
}
