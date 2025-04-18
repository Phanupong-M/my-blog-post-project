import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ViewPost from './pages/ViewPost';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import MemberManagement from './pages/MemberManagement';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member" element={<MemberManagement />} />
      </Routes>
    </Router>
  )
}

export default App;

