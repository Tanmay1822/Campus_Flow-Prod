import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import MultiSelectDropdown from '../components/common/MultiSelectDropdown';
import BatchListItem from '../components/timetable/BatchList';
import { ClassCell } from '../components/timetable/TimetableGrid';


// --- CONFIGURATION ---
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
// Attach JWT to all requests if available
axios.interceptors.request.use((config) => {
  const stored = localStorage.getItem('userInfo');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- PREDEFINED DATA ---
// const PREDEFINED_SUBJECTS = [
//   "Engineering Maths-I", "Physics", "Intro to Programming", "Digital Design", "Communication Skills", "Physics Lab", "Programming Lab", "Digital Design Lab",
//   "Data Structures", "Object-Oriented Programming", "Discrete Mathematics", "Computer Organization", "Operating Systems", "Data Structures Lab", "OOP Lab", "OS Lab",
//   "Applied Chemistry", "Basic Electrical Engineering", "Engineering Mechanics", "Workshop Practice", "Applied Chemistry Lab", "Basic Electrical Engineering Lab", "Workshop",
//   "Signals & Systems", "Analog Electronics", "Digital Circuits", "Network Theory", "Electromagnetic Fields", "Analog Electronics Lab", "Digital Circuits Lab", "Network Theory Lab",
//   "Database Management", "Software Engineering", "Computer Networks", "DBMS Lab", "Networks Lab",
// ].sort();


const PREDEFINED_SUBJECTS = [
  // Semester I Courses
  "Digital Design (DD)", 
  "Engineering Physics (EP)", 
  "Fundamentals of Computer Programming (FCP)", 
  "Engineering Mathematics - I (EM-I)", 
  "Electrical Circuit Analysis (ECA)",
  "Indian Constitution (IC)",
  "Digital Design Lab (DD LAB)",
  "ICT Workshop - I Lab (ICTW-I LAB)",
  "Engineering Physics Lab (EP LAB)", 
  "Fundamentals of Computer Programming Lab (FCP LAB)", 
  "Physics Lab (PHY LAB)", 
  // "ADVOCATE Session (ADVOCATE)", // Listed as a session with an instructor's title

  // Semester III Courses
  "Principles of Fundamentals of Programming Structures (PFPS)", 
  "Probability & Statistical Analysis (P&SA)", 
  "Automata and Formal Languages (A&FL)", 
  "Discrete Mathematical Structures (DMS)", 
  "Operating Systems (OS)", 
  "Economics & Business Management (E&BM)", 
  "Signals & Systems (S&S)", 
  "Electronic Circuits (EC)", 
  "Electrical Networks (EN)", 
  "DBMS Lab", 
  "PFPS Lab", 
  "OS Lab", 
  "Signals & Systems Lab (S&S LAB)", 
  "Electronic Circuits Lab (EC LAB)", // Appears as EC LAB-2, EC LAB-3

  // Semester V Courses
  "Image Processing & Computer Vision (IP&CV)", 
  "Cloud Computing & Big Data Infrastructure (CC&BDI)", 
  "Object Oriented Programming (OOP)", 
  "Wireless Communication (WC)", 
  "Nanoscale Device Engineering (NDE)",
  "Innovation & Entrepreneurship (I&E)", 
  "Fuzzy & Neural Networks (F&NN)", 
  "Computer Graphics (CG)", 
  "High-Performance Computing (HPC)", 
  "Data Science (DS)", 
  "Image Processing & Computer Vision Lab (IP&CV Lab)", 
  "Cloud Computing & Big Data Infrastructure Lab (CC&BDI Lab)", 
  "Wireless Communication Lab (WC Lab)", 
  "Data Science Lab (DS Lab)", 
  "Computer Graphics Lab (CG Lab)", 
  "HPC Lab", 

  // Semester VII Courses
  "Behavioral Aspects of Law (BaL)", 
  "Cyber Ethics & Professional Practice (CE&PP)", 
  "Natural Language Processing (NLP)", 
  "Artificial Intelligence (Al)", 
  "Internet of Things (IOT)", 
  "NS", // Unspecified subject name
  "Natural Language Processing Lab (NLP Lab)", 
  "NS Lab", 
  "AI Lab", 
  "Communication Lab (CL Lab)",
  "IOT Lab", 

  // Generic Labs appearing across semesters (CSE/ECE)
  "Computer Science Lab (CS LAB)",
  "Extra Curricular Activity (ECA)" // Treated as a non-academic slot in the time table
].sort();
// --- HELPER COMPONENTS ---





// --- AUTH PAGES (MODIFIED for Email Login) ---


// --- ADMIN DASHBOARD ---
const AdminDashboard = ({ userInfo, onLogout }) => {
  const [timetables, setTimetables] = useState([]);
  const [activeTab, setActiveTab] = useState("timetable");
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [classrooms, setClassrooms] = useState("CR1, CR2, CR3, CR4, CR5");
  const [labs, setLabs] = useState("LB1, LB2, LB3, LB4");

  const [newTeacherName, setNewTeacherName] = useState("");
  const [selectedTeacherSubjects, setSelectedTeacherSubjects] = useState([]);
  const [newBatchName, setNewBatchName] = useState("");
  const [selectedBatchSubjects, setSelectedBatchSubjects] = useState([]);
  const [selectedBatchLabs, setSelectedBatchLabs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Invite member state
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Check if user is authenticated
      const stored = localStorage.getItem('userInfo');
      if (!stored) {
        setError("Please login to access the dashboard.");
        setLoading(false);
        return;
      }

      const [teachersRes, batchesRes, timetablesRes] = await Promise.all([
        axios.get(`${API_URL}/teachers`),
        axios.get(`${API_URL}/timetables/batch`),
        axios.get(`${API_URL}/timetables`),
      ]);
      setTeachers(teachersRes.data || []);
      setBatches(batchesRes.data || []);
      setTimetables(timetablesRes.data || []);
      if (batchesRes.data && batchesRes.data.length > 0 && !selectedBatchName) {
        setSelectedBatchName(batchesRes.data[0].name);
      } else if (!batchesRes.data || batchesRes.data.length === 0) {
        setSelectedBatchName("");
      }
    } catch (err) {
      console.error('Fetch data error:', err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        // Clear invalid token
        localStorage.removeItem('userInfo');
        window.location.reload();
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to fetch initial data. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/teachers`, {
        name: newTeacherName,
        subjects: selectedTeacherSubjects,
      });
      setNewTeacherName("");
      setSelectedTeacherSubjects([]);
      setSuccess("Teacher added successfully!");
      fetchData();
    } catch (err) {
      console.error('Add teacher error:', err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem('userInfo');
        window.location.reload();
      } else {
        setError(err.response?.data?.message || "Failed to add teacher.");
      }
    }
  };
  const handleInvite = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${API_URL}/users/invite`, {
        name: inviteName,
        email: inviteEmail,
        password: invitePassword,
      });
      setInviteName("");
      setInviteEmail("");
      setInvitePassword("");
      setSuccess("Member invited successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to invite member.");
    }
  };
  const handleAddBatch = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/timetables/batch`, {
        name: newBatchName,
        subjects: selectedBatchSubjects,
        labs: selectedBatchLabs,
      });
      setSelectedBatchName(newBatchName);
      setNewBatchName("");
      setSelectedBatchSubjects([]);
      setSelectedBatchLabs([]);
      setSuccess("Batch added successfully!");
      fetchData();
    } catch (err) {
      console.error('Add batch error:', err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem('userInfo');
        window.location.reload();
      } else {
        setError(err.response?.data?.message || "Failed to add batch.");
      }
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`${API_URL}/teachers/${teacherId}`);
        setSuccess("Teacher deleted successfully!");
        fetchData();
      } catch (err) {
        console.error('Delete teacher error:', err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('userInfo');
          window.location.reload();
        } else {
          setError(err.response?.data?.message || "Failed to delete teacher.");
        }
      }
    }
  };
  const handleDeleteBatch = async (batchId) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      try {
        await axios.delete(`${API_URL}/timetables/batch/${batchId}`);
        setSuccess("Batch deleted successfully!");
        fetchData();
      } catch (err) {
        console.error('Delete batch error:', err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('userInfo');
          window.location.reload();
        } else {
          setError(err.response?.data?.message || "Failed to delete batch.");
        }
      }
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    setSuccess("");
    try {
      const generationConfig = {
        classrooms: classrooms
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        labs: labs
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const { data } = await axios.post(
        `${API_URL}/timetables/generate`,
        generationConfig
      );
      setSuccess(data.message || "Timetables generated successfully!");
      await fetchData();
    } catch (err) {
      console.error('Generate timetables error:', err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem('userInfo');
        window.location.reload();
      } else {
        setError(err.response?.data?.message || "Failed to generate timetables.");
      }
    } finally {
      setGenerating(false);
    }
  };

  const batchNamesForDropdown = useMemo(
    () => batches.map((b) => b.name).sort(),
    [batches]
  );
  
  const dynamicSubjects = useMemo(() => {
    const subjects = new Set(PREDEFINED_SUBJECTS);
    teachers.forEach(t => {
      (t.subjects || []).forEach(s => subjects.add(s));
    });
    batches.forEach(b => {
      (b.subjects || []).forEach(s => subjects.add(s));
      (b.labs || []).forEach(l => subjects.add(l));
    });
    return Array.from(subjects).sort();
  }, [teachers, batches]);
  const selectedTimetable = useMemo(
    () => timetables.find((t) => t.batchName === selectedBatchName),
    [timetables, selectedBatchName]
  );
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-7xl">
      <header className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left mb-10">
        <div>
          <h1 className="text-4xl font-bold text-bronco drop-shadow-sm">Timetable Generator</h1>
          <p className="text-bronco/80 mt-1">
            Welcome, <span className="font-semibold">{userInfo.name}</span>
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-white text-bronco font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-stone transition-colors"
          >
            ← Back to Home
          </button>
          <button
            onClick={onLogout}
            className="bg-bronco text-creme font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-bronco/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {error && <Alert message={error} />}
      {success && <Alert message={success} />}

      <div className="border-b border-bronco/10 mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("timetable")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "timetable"
                ? "border-bronco text-bronco"
                : "border-transparent text-bronco/60 hover:text-bronco/80 hover:border-bronco/20"
            }`}
          >
            Generate & View Timetable
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "teachers"
                ? "border-bronco text-bronco"
                : "border-transparent text-bronco/60 hover:text-bronco/80 hover:border-bronco/20"
            }`}
          >
            Manage Teachers
          </button>
          <button
            onClick={() => setActiveTab("batches")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "batches"
                ? "border-bronco text-bronco"
                : "border-transparent text-bronco/60 hover:text-bronco/80 hover:border-bronco/20"
            }`}
          >
            Manage Batches
          </button>
          {userInfo.role === "admin" && (
            <button
              onClick={() => setActiveTab("invite")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "invite"
                  ? "border-bronco text-bronco"
                  : "border-transparent text-bronco/60 hover:text-bronco/80 hover:border-bronco/20"
              }`}
            >
              Invite Member
            </button>
          )}
        </nav>
      </div>

      <div className="w-full">
        {activeTab === "invite" && userInfo.role === "admin" && (
          <div className="w-full mb-8">
            <div className="bg-stone border border-bronco/10 shadow-sm p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-bronco/80 mb-6 text-center">Invite Member</h3>
              <form onSubmit={handleInvite} className="space-y-3">
                <input type="text" placeholder="Name" value={inviteName} onChange={(e)=>setInviteName(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10" required />
                <input type="email" placeholder="Email" value={inviteEmail} onChange={(e)=>setInviteEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10" required />
                <input type="password" placeholder="Temp Password" value={invitePassword} onChange={(e)=>setInvitePassword(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10" required />
                <button type="submit" className="bg-indigo-600 text-creme px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold w-full">Invite</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="w-full mb-8">
            <div className="bg-stone border border-bronco/10 shadow-sm p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-bronco/80 mb-6 text-center">Manage Teachers</h3>
              <form onSubmit={handleAddTeacher} className="space-y-3">
                <input
                  type="text"
                  placeholder="Teacher Name"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10"
                  required
                />
                <MultiSelectDropdown
                  placeholder="Select Subjects"
                  allOptions={dynamicSubjects}
                  selectedOptions={selectedTeacherSubjects}
                  setSelectedOptions={setSelectedTeacherSubjects}
                />
                <button
                  type="submit"
                  className="bg-mesa-clay text-creme px-4 py-2 rounded-md hover:bg-mesa-clay font-semibold w-full"
                >
                  Add Teacher
                </button>
              </form>
              <div className="mt-6 h-48 overflow-y-auto border rounded-md p-2 bg-white/5 bg-white/50 text-bronco border-bronco/10">
                <div className="text-sm p-2 border-b border-bronco/10 font-semibold text-bronco/80">
                  Existing Teachers
                </div>
                {teachers.map((t) => (
                  <div
                    key={t._id}
                    className="flex justify-between items-center text-sm p-2 border-b border-bronco/10"
                  >
                    <span>
                      {t.name}{" "}
                      <span className="text-bronco/60">
                        ({t.subjects.join(", ")})
                      </span>
                    </span>
                    <button
                      onClick={() => handleDeleteTeacher(t._id)}
                      className="text-bronco hover:text-bronco p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "batches" && (
          <div className="w-full mb-8">
            <div className="bg-stone border border-bronco/10 shadow-sm p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-bronco/80 mb-6 text-center">Manage Batches</h3>
              <form onSubmit={handleAddBatch} className="space-y-3">
                <input
                  type="text"
                  placeholder="Batch Name (e.g., FY-CSE)"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10"
                  required
                />
                <MultiSelectDropdown
                  placeholder="Select Subjects"
                  allOptions={dynamicSubjects.filter(
                    (s) =>
                      !s.toLowerCase().includes("lab") &&
                      !s.toLowerCase().includes("workshop")
                  )}
                  selectedOptions={selectedBatchSubjects}
                  setSelectedOptions={setSelectedBatchSubjects}
                />
                <MultiSelectDropdown
                  placeholder="Select Labs"
                  allOptions={dynamicSubjects.filter(
                    (s) =>
                      s.toLowerCase().includes("lab") ||
                      s.toLowerCase().includes("workshop")
                  )}
                  selectedOptions={selectedBatchLabs}
                  setSelectedOptions={setSelectedBatchLabs}
                />
                <button
                  type="submit"
                  className="bg-mesa-clay text-creme px-4 py-2 rounded-md hover:bg-mesa-clay font-semibold w-full"
                >
                  Add Batch
                </button>
              </form>
              <div className="mt-6 h-48 overflow-y-auto border rounded-md bg-white/5 bg-white/50 text-bronco border-bronco/10">
                <div className="text-sm p-2 border-b border-bronco/10 font-semibold text-bronco/80">
                  Existing Batches
                </div>
                {batches.map((b) => (
                  <BatchListItem
                    key={b._id}
                    batch={b}
                    onDelete={handleDeleteBatch}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "timetable" && (
          <div className="w-full mb-8 space-y-8">
            <div className="bg-stone border border-bronco/10 shadow-sm p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-bronco/80 mb-6 text-center">Generate Timetable</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-bronco/80 mb-1">
                    Classrooms
                  </label>
                  <textarea
                    rows="2"
                    value={classrooms}
                    onChange={(e) => setClassrooms(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-bronco/80 mb-1">
                    Labs
                  </label>
                  <textarea
                    rows="2"
                    value={labs}
                    onChange={(e) => setLabs(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white/50 text-bronco border-bronco/10"
                  ></textarea>
                </div>
                <button
                  onClick={handleGenerate}
                  className="w-full h-[62px] bg-mesa-clay text-creme font-semibold rounded-md shadow-sm hover:bg-mesa-clay/80 transition-colors disabled:bg-gray-400"
                  disabled={generating}
                >
                  {generating ? "Generating..." : "Generate All Timetables"}
                </button>
              </div>
            </div>

            {loading ? (
              <Spinner />
            ) : (
              batchNamesForDropdown.length > 0 && (
                <div className="bg-stone border border-bronco/10 shadow-sm p-4 sm:p-6 rounded-xl">
                  <div className="flex justify-center mb-6">
                    <select
                      value={selectedBatchName}
                      onChange={(e) => setSelectedBatchName(e.target.value)}
                      className="px-4 py-2 border rounded-md shadow-sm bg-stone border-bronco/10 bg-white/50 text-bronco"
                    >
                      <option value="">Select a Batch</option>
                      {batchNamesForDropdown.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedTimetable ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-3 font-semibold text-left text-xs text-bronco/70 uppercase w-32">
                              Time Slot
                            </th>
                            {weekdays.map((day) => (
                              <th
                                key={day}
                                className="p-3 font-semibold text-center text-xs text-bronco/70 uppercase"
                              >
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {timeSlots.map((slot) => (
                            <tr key={slot} className="border-t border-bronco/10">
                              <td className="p-3 font-medium text-sm text-bronco/70 align-top">
                                {slot}
                              </td>
                              {weekdays.map((day) => (
                                <td
                                  key={day}
                                  className="p-2 align-top"
                                  style={{ minWidth: "150px", height: "80px" }}
                                >
                                  <ClassCell
                                    entry={selectedTimetable.schedule[day]?.[slot]}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : selectedBatchName ? (
                    <div className="text-center p-8 text-bronco/70">
                      No timetable generated for this batch yet. Click "Generate All Timetables".
                    </div>
                  ) : (
                    <div className="text-center p-8 text-bronco/60">
                      Please select a batch to view its timetable.
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP CONTROLLER ---
function TimetableApp({ userInfo, onLogout }) {
  return (
    <div className="bg-creme text-bronco min-h-screen font-sans">
      <AdminDashboard userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default TimetableApp;
