import {Link} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import {cars,money} from '../data.js'
import {CarCard,Page,PageHead} from '../components/ui.jsx'
import {useStore} from '../store.jsx'

export default function Wishlist(){
  const {wish,cmp,setCmp}=useStore(),list=wish.map(id=>cars.find(c=>c.id===id)).filter(Boolean)
  const total=list.reduce((s,c)=>s+c.price,0)
  return <Page><PageHead title="Your wishlist" sub={list.length?`${list.length} saved ${list.length===1?'car':'cars'} · combined value ${money(total)}`:'Save cars with the heart button and find them here.'}/>
    <div className="wrap">{list.length===0?<div className="rounded-3xl border border-dashed border-white/20 p-14 text-center"><p className="font-display text-2xl font-bold">No saved cars yet</p><p className="mt-2 text-dim">Tap the heart on any car to keep it here.</p><Link to="/collection" className="btn btn-brass mt-6">Browse the collection</Link></div>:<>
      <div className="mb-8 flex flex-wrap gap-3"><button className="btn btn-ghost" onClick={()=>setCmp(list.slice(0,3).map(c=>c.id))}>Compare first {Math.min(3,list.length)}</button>{cmp.length>0&&<Link to="/compare" className="btn btn-brass">Open comparison ({cmp.length})</Link>}</div>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><AnimatePresence mode="popLayout">{list.map((c,i)=><CarCard key={c.id} car={c} i={i}/>)}</AnimatePresence></motion.div></>}</div></Page>
}
