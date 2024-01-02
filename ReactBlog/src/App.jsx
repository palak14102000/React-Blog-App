import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import authService from './appwrite/auth'
import './App.css'
import {login ,logout} from './store/authSlice'
import authSlice from './store/authSlice'
import { Header,Footer } from './component/index'
function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  
  useEffect(()=>{
    
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    }).catch((e)=>{console.log("hhhhhhhhhhhhhhhhhhhh",e)})
    .finally(()=>setLoading(false))
  },[])


return !loading?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
     <div className='w-full block'>
        <Header />
        <main>
        
        </main>
        <Footer />
      </div>

  </div>
):null
}

export default App
