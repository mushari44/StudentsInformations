import { useState } from "react";
import axios from "axios";

function AddStudent({ showAddStudent, setShowAddStudent, fetchData }) {
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentId, setStudentId] = useState("");
  const [ageError, setAgeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");

  // Function to handle student name change
  const handleNameChange = (event) => {
    setStudentName(event.target.value);
    setNameError("");
  };

  // Function to handle student age change
  const handleAgeChange = (event) => {
    setStudentAge(event.target.value);
    setAgeError("");
  };

  // Function to handle student ID change
  const handleIdChange = (event) => {
    setStudentId(event.target.value);
    setIdError("");
  };

  // Function to add a new student
  const handleAddStudent = async () => {
    try {
      if (/\d/.test(studentName) || !studentName.trim()) {
        setNameError("Name cannot contain numbers");
        return;
      }

      if (!studentAge || isNaN(studentAge) || studentAge <= 0) {
        setAgeError("Please enter a valid age");
        setTimeout(() => {
          setAgeError("");
        }, 1500);
        return;
      }

      if (!/^\d+$/.test(studentId.trim())) {
        setIdError("ID must contain only numbers");
        return;
      }

      await axios.post(
        "https://student-server.vercel.app/students/addStudent",
        {
          name: studentName,
          age: studentAge,
          Id: studentId,
        }
      );

      // Clear input fields after adding student
      fetchData();

      setStudentName("");
      setStudentAge("");
      setStudentId("");
      console.log("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    setShowAddStudent(false);
  };

  return (
    <div className="Addapp">
      {showAddStudent && (
        <div className="studentsDataInfo">
          <h2>Students Information</h2>
          <div className="StudentsAddCard">
            <div className="AddAndCancel">
              <button onClick={handleAddStudent}>Add Student</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Age</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="addStudentInputTable">
                    <input
                      className="addInput"
                      onChange={handleNameChange}
                      value={studentName}
                      placeholder="Enter name"
                    />
                    {nameError && <div className="error">{nameError}</div>}
                  </td>

                  <td className="addStudentInputTable">
                    <input
                      className="addInput"
                      onChange={handleAgeChange}
                      value={studentAge}
                      placeholder="Enter age"
                      type="number"
                    />
                    {ageError && <div className="error">{ageError}</div>}
                  </td>

                  <td className="addStudentInputTable">
                    <input
                      className="addInput"
                      onChange={handleIdChange}
                      value={studentId}
                      placeholder="Enter ID"
                      type="text"
                    />
                    {idError && <div className="error"> {idError}</div>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddStudent;
