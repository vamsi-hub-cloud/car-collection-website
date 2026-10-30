import {useState} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {cars} from '../data.js'
import {Icon} from './ui.jsx'
import {useStore} from '../store.jsx'

const slots=['10:00','11:30','13:00','14:30','16:00','17:30']
const today=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}
const Field=({label,error,children})=><label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span>{children}<AnimatePresence>{error&&<motion.span role="alert" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="mt-1.5 block text-sm text-red-400">{error}</motion.span>}</AnimatePresence></label>

export function LeadForm({mode='drive',carId='',title}){
  const {say}=useStore()
  const empty={name:'',email:'',phone:'',car:carId,date:'',slot:'',message:'',topic:'Pricing'}
  const [f,setF]=useState(empty),[e,setE]=useState({}),[done,setDone]=useState(false)
  const up=k=>ev=>{setF(s=>({...s,[k]:ev.target.value}));setE(s=>({...s,[k]:''}))}
  const submit=ev=>{ev.preventDefault();const x={}
    if(f.name.trim().length<2)x.name='Enter your full name.'
    if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email address.'
    if(f.phone.replace(/\D/g,'').length<7)x.phone='Enter a phone number with at least 7 digits.'
    if(mode==='drive'){if(!f.car)x.car='Choose a car.';if(!f.date)x.date='Pick a date.';else if(f.date<today())x.date='Choose today or a later date.';if(!f.slot)x.slot='Choose a time slot.'}
    else if(f.message.trim().length<10)x.message='Tell us a little more (at least 10 characters).'
    setE(x);if(Object.keys(x).length)return
    setDone(true);say(mode==='drive'?'Test drive request sent':'Enquiry sent')}
  if(done)return <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} className="rounded-3xl border border-brass/40 bg-panel p-10 text-center"><motion.span initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',delay:.15}} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brass text-ink"><Icon d="M5 12l5 5L20 7" c="h-8 w-8"/></motion.span>
    <h3 className="mt-5 font-display text-2xl font-bold">{mode==='drive'?'Test drive requested':'Enquiry received'}</h3><p className="mt-2 text-dim">Thanks {f.name.split(' ')[0]}. We will email {f.email} within one business day.</p><button onClick={()=>{setF(empty);setDone(false)}} className="btn btn-ghost mt-6">Send another</button></motion.div>
  return <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8">
    {title&&<h3 className="font-display text-2xl font-bold">{title}</h3>}
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" error={e.name}><input className="input" value={f.name} onChange={up('name')} autoComplete="name"/></Field><Field label="Email" error={e.email}><input className="input" type="email" value={f.email} onChange={up('email')} autoComplete="email"/></Field></div>
    <Field label="Phone" error={e.phone}><input className="input" type="tel" value={f.phone} onChange={up('phone')} autoComplete="tel"/></Field>
    {mode==='drive'?<>
      <Field label="Car" error={e.car}><select className="input" value={f.car} onChange={up('car')}><option value="">Select a car</option>{cars.map(c=><option key={c.id} value={c.id}>{c.full}</option>)}</select></Field>
      <Field label="Preferred date" error={e.date}><input className="input" type="date" min={today()} value={f.date} onChange={up('date')}/></Field>
      <div><p className="mb-1.5 text-sm font-medium">Time slot</p><div className="flex flex-wrap gap-2">{slots.map(s=><button type="button" key={s} aria-pressed={f.slot===s} onClick={()=>{setF(x=>({...x,slot:s}));setE(x=>({...x,slot:''}))}} className={`rounded-full border px-4 py-2 text-sm transition ${f.slot===s?'border-brass bg-brass text-ink':'border-white/15 hover:border-brass'}`}>{s}</button>)}</div>{e.slot&&<p role="alert" className="mt-1.5 text-sm text-red-400">{e.slot}</p>}</div>
      <Field label="Notes (optional)"><textarea className="input min-h-24" value={f.message} onChange={up('message')} placeholder="Trade-in, route preference, questions"/></Field></>:<>
      <div className="grid gap-5 sm:grid-cols-2"><Field label="Topic"><select className="input" value={f.topic} onChange={up('topic')}>{['Pricing','Financing','Trade-in','Customisation','Delivery','Other'].map(t=><option key={t}>{t}</option>)}</select></Field><Field label="Car (optional)"><select className="input" value={f.car} onChange={up('car')}><option value="">Any car</option>{cars.map(c=><option key={c.id} value={c.id}>{c.full}</option>)}</select></Field></div>
      <Field label="Message" error={e.message}><textarea className="input min-h-32" value={f.message} onChange={up('message')}/></Field></>}
    <button className="btn btn-brass w-full sm:w-auto">{mode==='drive'?'Request test drive':'Send enquiry'}</button></form>
}
