import {useEffect} from 'react'
import {Link,Route,Routes,useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import {Footer,Navbar,Page,Toast} from './components/ui.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import Details from './pages/Details.jsx'
import Brands from './pages/Brands.jsx'
import Compare from './pages/Compare.jsx'
import Wishlist from './pages/Wishlist.jsx'
import TestDrive from './pages/TestDrive.jsx'
import {About,Contact,FaqPage} from './pages/Info.jsx'

const NotFound=()=><Page><div className="wrap pt-44 text-center"><h1 className="title">Page not found</h1><p className="mt-4 text-dim">The page you are looking for has moved or never existed.</p><Link to="/" className="btn btn-brass mt-8">Back to home</Link></div></Page>
export default function App(){
  const loc=useLocation()
  useEffect(()=>{if(loc.pathname!=='/collection')window.scrollTo(0,0)},[loc.pathname])
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brass focus:p-3 focus:text-ink">Skip to content</a>
    <Navbar/>
    <div id="main"><AnimatePresence mode="wait"><Routes location={loc} key={loc.pathname}>
      <Route path="/" element={<Home/>}/><Route path="/collection" element={<Collection/>}/><Route path="/car/:id" element={<Details/>}/>
      <Route path="/brands" element={<Brands/>}/><Route path="/compare" element={<Compare/>}/><Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/test-drive" element={<TestDrive/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/faq" element={<FaqPage/>}/>
      <Route path="*" element={<NotFound/>}/></Routes></AnimatePresence></div>
    <Footer/><Toast/></>
}
