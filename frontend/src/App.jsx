import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import DocumentList from "./pages/DocumentList";
import Uploader from "./pages/Uploader";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/upload" element={<Uploader />} />
        {/* 404-Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
