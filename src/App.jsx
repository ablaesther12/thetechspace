
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import BlogPage from './pages/Blogs'
import Contact from './pages/Contact'
import ProjectsPage from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import BlogDetail from './pages/BlogDetail'

// Admin imports
import { AuthProvider } from './admin/contexts/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'
import AdminLayout from './admin/layouts/AdminLayout'
import AdminLogin from './admin/pages/Login'
import AdminDashboard from './admin/pages/Dashboard'
import AdminPosts from './admin/pages/Posts'
import AdminTeam from './admin/pages/TeamManagement'
import AdminServices from './admin/pages/ServicesManagement'
import AdminContacts from './admin/pages/Contacts'
import AdminSettings from './admin/pages/Settings'
import AdminHelp from './admin/pages/HelpCenter'
import AdminMilestones from './admin/pages/MilestonesManagement'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public site ── */}
          <Route path='/' element={<RootLayout />}>
            <Route index={true} element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/team' element={<Team />} />
            <Route path='/blogs' element={<BlogPage />} />
            <Route path='/blogs/:slug' element={<BlogDetail />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/projects/:id' element={<ProjectDetail />} />
          </Route>

          {/* ── Admin dashboard ── */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path='posts' element={<AdminPosts />} />
            <Route path='team' element={<AdminTeam />} />
            <Route path='services' element={<AdminServices />} />
            <Route path='milestones' element={<AdminMilestones />} />
            <Route path='contacts' element={<AdminContacts />} />
            <Route path='settings' element={<AdminSettings />} />
            <Route path='help' element={<AdminHelp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
