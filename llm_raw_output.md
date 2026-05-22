# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const App = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [grades, setGrades] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get(`${BASE_URL}/students`).then(response => {
      setStudents(response.data);
    });
  }, []);

  const addStudent = (data) => {
    axios.post(`${BASE_URL}/students`, data).then(response => {
      setStudents([...students, response.data]);
      toast.success('Student added successfully');
    });
  };

  const markAttendance = (studentId, attendanceStatus) => {
    axios.put(`${BASE_URL}/attendance`, { studentId, attendanceStatus, date: format(selectedDate, 'yyyy-MM-dd') }).then(response => {
      setAttendance({ ...attendance, [studentId]: attendanceStatus });
      toast.success('Attendance marked successfully');
    });
  };

  const logGrade = (studentId, grade) => {
    axios.put(`${BASE_URL}/grades`, { studentId, grade, date: format(selectedDate, 'yyyy-MM-dd') }).then(response => {
      setGrades({ ...grades, [studentId]: grade });
      toast.success('Grade logged successfully');
    });
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <HashRouter>
      <div className="max-w-5xl mx-auto p-4 mt-6">
        <h1 className="text-3xl font-bold mb-4">Student Management System</h1>
        <div className="flex justify-between mb-4">
          <Link to="/add-student" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <FiPlus size={20} className="mr-2" /> Add Student
          </Link>
          <Link to="/attendance" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Mark Attendance
          </Link>
          <Link to="/grades" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Log Grades
          </Link>
        </div>
        <Routes>
          <Route path="/add-student" element={
            <div>
              <h2 className="text-2xl font-bold mb-4">Add Student</h2>
              <form onSubmit={handleSubmit(addStudent)}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input type="text" {...register('name')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input type="email" {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Add Student
                </button>
              </form>
            </div>
          } />
          <Route path="/attendance" element={
            <div>
              <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Date</label>
                <input type="date" value={format(selectedDate, 'yyyy-MM-dd')} onChange={(e) => handleSelectDate(new Date(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Student Name</th>
                    <th className="px-4 py-2">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => markAttendance(student.id, 'present')} className={clsx('bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded', attendance[student.id] === 'present' ? 'bg-gray-500' : '')}>
                          Present
                        </button>
                        <button onClick={() => markAttendance(student.id, 'absent')} className={clsx('bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded', attendance[student.id] === 'absent' ? 'bg-gray-500' : '')}>
                          Absent
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          } />
          <Route path="/grades" element={
            <div>
              <h2 className="text-2xl font-bold mb-4">Log Grades</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Date</label>
                <input type="date" value={format(selectedDate, 'yyyy-MM-dd')} onChange={(e) => handleSelectDate(new Date(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Student Name</th>
                    <th className="px-4 py-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          logGrade(student.id, e.target.grade.value);
                        }}>
                          <input type="number" name="grade" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                            Log Grade
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          } />
        </Routes>
      </div>
      <ToastContainer />
      <Toaster />
    </HashRouter>
  );
};

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;
=== END ===

=== FILE: src/api.js ===
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
=== END ===