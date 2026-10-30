import {useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import {brands,cars,categories,money} from '../data.js'
import {CarCard,Page,PageHead} from '../components/ui.jsx'

const sorts={featured:['Featured',()=>0],pa:['Price: low to high',(a,b)=>a.price-b.price],pd:['Price: high to low',(a,b)=>b.price-a.price],hp:['Most powerful',(a,b)=>b.hp-a.hp],fast:['Quickest 0–60',(a,b)=>a.zero-b.zero],new:['Newest',(a,b)=>b.year-a.year]}
export default function Collection(){
  const [sp,setSp]=useSearchParams()
  const q=sp.get('q')||'',cat=sp.get('cat')||'',brand=sp.get('brand')||'',sort=sp.get('sort')||'featured',max=Number(sp.get('max'))||700000
  const set=(k,v)=>{const n=new URLSearchParams(sp);v?n.set(k,v):n.delete(k);setSp(n,{replace:true})}
  const list=useMemo(()=>cars.filter(c=>(!cat||c.category===cat)&&(!brand||c.brand===brand)&&c.price<=max&&(`${c.full} ${c.category} ${c.fuel}`.toLowerCase().includes(q.trim().toLowerCase()))).sort((sorts[sort]||sorts.featured)[1]),[q,cat,brand,max,sort])
  const active=q||cat||brand||sp.get('max')
  return <Page><PageHead title="The collection" sub="Search, filter and sort every car in the garage."/>
    <div className="wrap pb-6"><div className="sticky top-[72px] z-30 -mx-5 grid gap-3 border-b border-white/10 bg-ink/90 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
      <input aria-label="Search cars" value={q} onChange={e=>set('q',e.target.value)} placeholder="Search by brand, model or fuel" className="input"/>
      <select aria-label="Brand" value={brand} onChange={e=>set('brand',e.target.value)} className="input"><option value="">All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select>
      <select aria-label="Sort" value={sort} onChange={e=>set('sort',e.target.value==='featured'?'':e.target.value)} className="input">{Object.entries(sorts).map(([k,[l]])=><option key={k} value={k}>{l}</option>)}</select>
      <label className="flex items-center gap-3 text-sm text-dim"><span className="whitespace-nowrap">Up to <b className="text-brass">{money(max)}</b></span><input type="range" min="80000" max="700000" step="10000" value={max} onChange={e=>set('max',Number(e.target.value)>=700000?'':e.target.value)} className="w-full accent-[#CBA45C]"/></label>
      <div className="flex flex-wrap gap-2 md:col-span-2 lg:col-span-4">{['',...categories].map(c=><button key={c||'all'} onClick={()=>set('cat',c)} aria-pressed={cat===c} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${cat===c?'border-brass bg-brass text-ink':'border-white/15 hover:border-brass hover:text-brass'}`}>{c||'All'}</button>)}
        {active&&<button onClick={()=>setSp({},{replace:true})} className="ml-auto text-sm text-brass underline underline-offset-4">Clear filters</button>}</div></div>
      <p className="mt-6 text-sm text-dim" aria-live="polite">{list.length} {list.length===1?'car':'cars'} found</p></div>
    <div className="wrap"><motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><AnimatePresence mode="popLayout">{list.map((c,i)=><CarCard key={c.id} car={c} i={i}/>)}</AnimatePresence></motion.div>
      {list.length===0&&<div className="rounded-3xl border border-dashed border-white/20 p-14 text-center"><p className="font-display text-2xl font-bold">No cars match those filters</p><p className="mt-2 text-dim">Try a wider price range or a different brand.</p><button onClick={()=>setSp({},{replace:true})} className="btn btn-brass mt-6">Reset filters</button></div>}</div></Page>
}
