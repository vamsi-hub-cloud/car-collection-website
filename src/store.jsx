import {createContext,useContext,useEffect,useState,useCallback} from 'react'
const Ctx=createContext()
const load=k=>{try{return JSON.parse(localStorage.getItem(k))||[]}catch{return[]}}
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
export function Store({children}){
  const [wish,setWish]=useState(()=>load('ag-wish'))
  const [cmp,setCmp]=useState(()=>load('ag-cmp'))
  const [toast,setToast]=useState(null)
  useEffect(()=>save('ag-wish',wish),[wish])
  useEffect(()=>save('ag-cmp',cmp),[cmp])
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2200);return()=>clearTimeout(t)},[toast])
  const say=useCallback(m=>setToast({m,k:Date.now()}),[])
  const toggleWish=id=>{const has=wish.includes(id);setWish(w=>has?w.filter(x=>x!==id):[...w,id]);say(has?'Removed from wishlist':'Saved to wishlist')}
  const toggleCmp=id=>{
    if(cmp.includes(id)){setCmp(c=>c.filter(x=>x!==id));say('Removed from comparison')}
    else if(cmp.length>=3)say('You can compare up to 3 cars')
    else{setCmp(c=>[...c,id]);say('Added to comparison')}}
  return <Ctx.Provider value={{wish,cmp,setCmp,toggleWish,toggleCmp,toast,say}}>{children}</Ctx.Provider>
}
export const useStore=()=>useContext(Ctx)
