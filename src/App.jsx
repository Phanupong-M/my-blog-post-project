import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ViewPost from "./pages/ViewPost";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUpSuccess from "./pages/SignUpSuccess";
import ResetPassword from "./pages/ResetPassword";
import AdminArticaleManagement from "./pages/Admin/AdminArticleManagement";
import AdminCategoryManagement from "./pages/Admin/AdminCategoryManagement";
import AdminCreatArticle from "./pages/Admin/AdminCreatArticle";
import AdminCreatCategory from "./pages/Admin/AdminCreateCategory";
import AdminNotification from "./pages/Admin/AdminNotification";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminResetPassword from "./pages/Admin/AdminResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "./contexts/authentication.jsx";
import jwtInterceptor from "./utils/jwtInterceptor.js";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LoadingScreen } from "./components/LoadingScreen";

jwtInterceptor();

function App() {
  const { isAuthenticated, state } = useAuth();
  const role = state.user?.role;
  // Don't render routes until we know the authentication state
  // if (state.getUserLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="*" element={<NotFound />} />

        {/* Authentication Section */}
        <Route
          path="/signup"
          element={
            <AuthenticationRoute
              // isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUp />
            // </AuthenticationRoute>
          }
        />

        <Route path="/signup/success" element={<SignUpSuccess />} />

        <Route
          path="/login"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={role}
            >
              <Login />
            </AuthenticationRoute>
          }
        />

        {/* User Section */}
        <Route 
        path="/profile" 
        element={
          <ProtectedRoute
          isLoading={state.getUserLoading}
          isAuthenticated={isAuthenticated}
          userRole={role}
        >
          <Profile />
        </ProtectedRoute>
        
        } />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Section */}
        <Route
          path="/admin/article-management"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminArticaleManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/article-management/create"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCreatArticle />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/admin/article-management/edit/:postId"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminEditArticlePage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/admin/category-management"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCategoryManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/category-management/create"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCreatCategory />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/admin/category-management/edit/:categoryId"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminEditCategoryPage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notification"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminNotification />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reset-password"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminResetPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
