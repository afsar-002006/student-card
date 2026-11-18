import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import GenerateCard from "./pages/GenerateCard";
import Settings from "./pages/Settings";
import { loadStudents, saveStudents, loadCollege, saveCollege, sampleStudents } from "./data/studentData";

export default function App() {
  const [students, setStudents] = useState(loadStudents);
  const [college, setCollege] = useState(loadCollege);
  const [menu, setMenu] = useState(false);

  useEffect(() => saveStudents(students), [students]);
  useEffect(() => saveCollege(college), [college]);

  const add = (s) => setStudents((p) => [...p, s]);
  const update = (s) => setStudents((p) => p.map((x) => (x.id === s.id ? s : x)));
  const remove = (id) => setStudents((p) => p.filter((x) => x.id !== id));
  const markGenerated = (id) => setStudents((p) => p.map((x) => (x.id === id ? { ...x, cardGenerated: true } : x)));

  return (
    <BrowserRouter>
      <Sidebar open={menu} onClose={() => setMenu(false)} />
      <div className="lg:pl-64">
        <Navbar onMenu={() => setMenu(true)} />
        <main className="p-4 sm:p-8">
          <Routes>
            <Route path="/" element={<Dashboard students={students} />} />
            <Route path="/students" element={<Students students={students} onUpdate={update} onDelete={remove} />} />
            <Route path="/add-student" element={<AddStudent students={students} onAdd={add} />} />
            <Route path="/generate-card" element={<GenerateCard students={students} college={college} onGenerated={markGenerated} />} />
            <Route path="/settings" element={<Settings college={college} onSaveCollege={setCollege} onResetData={() => setStudents(sampleStudents)} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
