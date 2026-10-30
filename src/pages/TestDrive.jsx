import {useSearchParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {LeadForm} from '../components/Forms.jsx'
import {Page,PageHead} from '../components/ui.jsx'

export default function TestDrive(){
  const [sp,setSp]=useSearchParams(),tab=sp.get('tab')==='enquiry'?'enquiry':'drive',car=sp.get('car')||''
  const go=t=>{const n=new URLSearchParams(sp);t==='drive'?n.delete('tab'):n.set('tab',t);setSp(n,{replace:true})}
  return <Page><PageHead title="Book a test drive or ask a question" sub="We reply within one business day."/>
    <div className="wrap max-w-3xl"><div className="relative mb-6 inline-flex rounded-full border border-white/10 bg-panel p-1" role="tablist">{[['drive','Test drive'],['enquiry','Enquiry']].map(([k,l])=><button key={k} role="tab" aria-selected={tab===k} onClick={()=>go(k)} className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition ${tab===k?'text-ink':'text-mist'}`}>{tab===k&&<motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-brass" transition={{type:'spring',stiffness:400,damping:32}}/>}<span className="relative">{l}</span></button>)}</div>
      <LeadForm key={tab+car} mode={tab} carId={car}/></div></Page>
}
