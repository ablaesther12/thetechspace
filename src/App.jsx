
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import BlogPage from './pages/Blogs'
import Contact from './pages/Contact'

function App() {
  

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
      <Route index={true} element={<Home/>} />
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
      <Route path='/team' element= {<Team />} />
      <Route path='/blogs' element= {<BlogPage />} />
      <Route path='/contact' element= {<Contact />} />
      


      </Route>
    </Routes>

    </BrowserRouter>
   </div>
  )
}

export default App
