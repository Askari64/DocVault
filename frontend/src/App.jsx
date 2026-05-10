import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import DocumentList from "./pages/DocumentList";
import Uploader from "./pages/Uploader";
import ProtectedRoute from "./utils/ProtectedRoutes";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/upload" element={<Uploader />} />
        </Route>
        {/* 404-Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
