# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { BrowserRouter as HashRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { FiBell } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(`${BASE_URL}/students`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        toast.error(error.message);
      });

    axios.get(`${BASE_URL}/attendance`)
      .then(response => {
        setAttendance(response.data);
      })
      .catch(error => {
        toast.error(error.message);
      });

    axios.get(`${BASE_URL}/grades`)
      .then(response => {
        setGrades(response.data);
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []);

  const handleStudentCreate = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/students`, data);
      setStudents([...students, response.data]);
      toast.success('Student created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAttendanceCreate = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/attendance`, data);
      setAttendance([...attendance, response.data]);
      toast.success('Attendance created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGradeCreate = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/grades`, data);
      setGrades([...grades, response.data]);
      toast.success('Grade created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <HashRouter>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        <h1 className="text-3xl font-bold mb-4">Student Management System</h1>
        <Routes>
          <Route path="/" element={
            <div>
              <h2 className="text-2xl font-bold mb-4">Students</h2>
              <ul>
                {students.map(student => (
                  <li key={student.id} className="py-2">
                    <Link to={`/students/${student.id}`} className="text-blue-600 hover:text-blue-900">
                      {student.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <button onClick={() => setSelectedStudent({})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <AiOutlinePlus size={16} className="mr-2" /> Create Student
              </button>
              {selectedStudent && (
                <form onSubmit={handleSubmit(handleStudentCreate)}>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" {...register('name')} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Student
                  </button>
                </form>
              )}
            </div>
          } />
          <Route path="/students/:id" element={
            <div>
              <h2 className="text-2xl font-bold mb-4">Student Details</h2>
              {students.map(student => (
                student.id === parseInt(window.location.pathname.split('/').pop()) && (
                  <div key={student.id}>
                    <p>Name: {student.name}</p>
                    <p>Attendance:</p>
                    <ul>
                      {attendance.map(attendanceItem => (
                        attendanceItem.studentId === student.id && (
                          <li key={attendanceItem.id} className="py-2">
                            <p>Date: {format(new Date(attendanceItem.date), 'yyyy-MM-dd')}</p>
                            <p>Status: {attendanceItem.status}</p>
                          </li>
                        )
                      ))}
                    </ul>
                    <button onClick={() => setSelectedAttendance({ studentId: student.id })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <AiOutlinePlus size={16} className="mr-2" /> Create Attendance
                    </button>
                    {selectedAttendance && selectedAttendance.studentId === student.id && (
                      <form onSubmit={handleSubmit(handleAttendanceCreate)}>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" {...register('date')} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select {...register('status')} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </select>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Create Attendance
                        </button>
                      </form>
                    )}
                    <button onClick={() => setSelectedGrade({ studentId: student.id })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <AiOutlinePlus size={16} className="mr-2" /> Create Grade
                    </button>
                    {selectedGrade && selectedGrade.studentId === student.id && (
                      <form onSubmit={handleSubmit(handleGradeCreate)}>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" {...register('subject')} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <label className="block text-sm font-medium text-gray-700">Grade</label>
                        <input type="number" {...register('grade')} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Create Grade
                        </button>
                      </form>
                    )}
                  </div>
                )
              ))}
            </div>
          } />
        </Routes>
        <ToastContainer />
      </div>
    </HashRouter>
  );
}

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
// No need for a separate api.js file as API calls are handled in App.jsx
=== END ===