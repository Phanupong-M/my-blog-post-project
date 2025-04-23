import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ViewPost from './pages/ViewPost';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUpSuccess from './pages/SignUpSuccess';
import ResetPassword from './pages/ResetPassword';
import AdminArticaleManagement from './pages/Admin/AdminArticleManagement'
import AdminCategoryManagement from './pages/Admin/AdminCategoryManagement'
import AdminCreatArticle  from './pages/Admin/AdminCreatArticle'
import AdminCreatCategory  from './pages/Admin/AdminCreateCategory'
import AdminNotification  from './pages/Admin/AdminNotification'
import AdminProfile  from './pages/Admin/AdminProfile'
import AdminResetPassword from './pages/Admin/AdminResetPassword'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostProvider } from "./contexts/PostContext";

function App() {
  return (
    <PostProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/success" element={<SignUpSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
          
        <Route path="/admin/article-management" element={<AdminArticaleManagement />} />
        <Route path="/admin/category-management" element={<AdminCategoryManagement />} />
        <Route path="/admin/article-management/create" element={<AdminCreatArticle />} />
        <Route path="/admin/category-management/create" element={<AdminCreatCategory />} />
        <Route path="/admin/notification" element={<AdminNotification />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
      </Routes>
    </Router>
    </PostProvider>
  )
}

export default App;

