import { useState } from "react";
import axios from "axios";
import StudentsTable from "./StudentsTable";
import LightDarkMode from "./light-dark-mode";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentId, setStudentId] = useState("");
  const [inputError, setInputError] = useState(null); 
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  const handleNameChange = (event) => {
    setStudentName(event.target.value);
    setInputError(null); 
  };

  const handleAgeChange = (event) => {
    setStudentAge(event.target.value);
    setInputError(null); // Clear input error message
  };

  const handleIdChange = (event) => {
    setStudentId(event.target.value);
    setInputError(null); // Clear input error message
  };

  const handleAddStudent = async () => {
    try {
      if (
        /\d/.test(studentName) || // Check if name contains numbers
        !studentName.trim() // Check if name is empty
      ) {
        setInputError("Name cannot contain numbers");
        return;
      }

      if (
        !studentAge ||
        isNaN(studentAge) || // Check if age is not a number
        studentAge <= 0 // Check if age is not positive
      ) {
        setInputError("Please enter a valid age");
        setTimeout(() => {
          setInputError(null); // Clear input error message after 1.5 seconds
        }, 1500);
        return;
      }

      if (!/^\d+$/.test(studentId.trim())) {
        setInputError("ID must contain only numbers");
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
      setRefresh((c) => c + 1);
      setStudentName("");
      setStudentAge("");
      setStudentId("");
      console.log("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className="app">
        <div className="studentsDataInfo">
          <h2>Students Information</h2>
          <LightDarkMode />
          <DropDown />
          <div className="StudentsAddCard">
            <div className="AddAndCancel">
              <button onClick={handleAddStudent}>Add Student</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
            {inputError && <div className="error">{inputError}</div>}

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
                  </td>

                  <td className="addStudentInputTable">
                    <input
                      className="addInput"
                      onChange={handleAgeChange}
                      value={studentAge}
                      placeholder="Enter age"
                      type="number"
                    />
                  </td>

                  <td className="addStudentInputTable">
                    <input
                      className="addInput"
                      onChange={handleIdChange}
                      value={studentId}
                      placeholder="Enter ID"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <StudentsTable refresh={refresh} />
        </div>
      </div>
    </>
  );
}

export default AddStudent;
