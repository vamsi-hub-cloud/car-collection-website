import {Link} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import {cars,money} from '../data.js'
import {CarArt,Page,PageHead} from '../components/ui.jsx'
import {useStore} from '../store.jsx'

const rows=[['Price',c=>money(c.price),'price',-1],['Power',c=>`${c.hp} hp`,'hp',1],['0–60 mph',c=>`${c.zero} s`,'zero',-1],['Top speed',c=>`${c.top} mph`,'top',1],['Engine',c=>c.engine],['Transmission',c=>c.trans],['Drivetrain',c=>c.drive],['Fuel',c=>c.fuel],['Year',c=>c.year]]
export default function Compare(){
  const {cmp,setCmp,toggleCmp}=useStore(),sel=cmp.map(id=>cars.find(c=>c.id===id)).filter(Boolean)
  const best=(k,d)=>{if(!k||sel.length<2)return null;const v=sel.map(c=>c[k]*d);return Math.max(...v)/d}
  return <Page><PageHead title="Compare cars" sub="Pick up to three cars. The best value in each row is highlighted."/>
    <div className="wrap">
      {sel.length<3&&<div className="mb-8 max-w-sm"><select aria-label="Add a car to compare" value="" onChange={e=>e.target.value&&toggleCmp(e.target.value)} className="input"><option value="">+ Add a car</option>{cars.filter(c=>!cmp.includes(c.id)).map(c=><option key={c.id} value={c.id}>{c.full}</option>)}</select></div>}
      {sel.length===0?<div className="rounded-3xl border border-dashed border-white/20 p-14 text-center"><p className="font-display text-2xl font-bold">Nothing to compare yet</p><p className="mt-2 text-dim">Add cars from the menu above or press Compare on any car.</p><Link to="/collection" className="btn btn-brass mt-6">Browse the collection</Link></div>:
      <div className="overflow-x-auto rounded-3xl border border-white/10"><table className="w-full min-w-[640px] border-collapse text-left"><thead><tr><th className="w-36 p-4"></th>
        <AnimatePresence>{sel.map(c=><motion.th key={c.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-4 align-top"><CarArt type={c.body} color={c.color} className="w-full max-w-[14rem]"/><Link to={`/car/${c.id}`} className="mt-2 block font-display text-lg font-bold hover:text-brass">{c.full}</Link><button onClick={()=>toggleCmp(c.id)} className="mt-1 text-sm font-normal text-dim underline underline-offset-4 hover:text-brass">Remove</button></motion.th>)}</AnimatePresence></tr></thead>
        <tbody>{rows.map(([l,f,k,d])=>{const b=best(k,d);return <tr key={l} className="border-t border-white/10"><th className="p-4 text-sm font-medium text-dim">{l}</th>{sel.map(c=><td key={c.id} className={`p-4 font-semibold ${b!==null&&c[k]===b?'text-brass':''}`}>{f(c)}{b!==null&&c[k]===b&&<span className="ml-2 text-xs">best</span>}</td>)}</tr>})}</tbody></table></div>}
      {sel.length>0&&<button onClick={()=>setCmp([])} className="mt-6 text-sm text-dim underline underline-offset-4 hover:text-brass">Clear comparison</button>}</div></Page>
}
