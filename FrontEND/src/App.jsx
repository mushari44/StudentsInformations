import { useEffect, useState } from "react";
import axios from "axios";
import DropDown from "./DropDown";
import LightDarkMode from "./light-dark-mode/index.jsx";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [editedStudent, setEditedStudent] = useState({});
  const [editRowId, setEditRowId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // "https://studentdataserver.onrender.com/students/getInfo";

      const response = await axios.get(
        "https://student-server.vercel.app/students/getInfo"
      );
      setStudentsData(response.data);
    } catch (error) {
      console.log("error getting the students data " + error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value.toLowerCase());
  }

  const filteredStudents = studentsData.filter((student) =>
    Object.values(student).some((value) => {
      return String(value).toLowerCase().includes(searchQuery);
    })
  );

  function handleEditButton(studentId) {
    setShowEditStudent(true);
    const studentToEdit = studentsData.find(
      (student) => student._id === studentId
    );
    setEditedStudent({ ...studentToEdit });
    setEditRowId(studentId);
  }

  async function saveEditedStudent() {
    try {
      await axios.put(
        `https://student-server.vercel.app/students/updateInfo/${editedStudent._id}`,
        editedStudent
      );
      fetchData();
      setEditedStudent({});
      setEditRowId(null);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  }

  function cancelEdit() {
    fetchData();
    setEditedStudent({});
    setEditRowId(null);
  }

  async function handleDelete(id) {
    try {
      await axios.delete(
        `https://student-server.vercel.app/students/DeleteInfo/${id}`
      );
      fetchData();
      console.log("Student Info deleted");
    } catch (error) {
      console.log(id);
      console.log("ERORR DELETEing " + error);
    }
  }

  return (
    <div className="app">
      <LightDarkMode mode="dark"></LightDarkMode>

      <h1>Student Data</h1>

      <div className="studentsDataInfo">
        <h2>Students Information</h2>
        <div className="StudentsCard">
          <input
            className="search"
            id="searchInput"
            type="text"
            placeholder="Search by name, age, or ID"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <DropDown
            setShowEditStudent={setShowEditStudent}
            fetchData={fetchData}
          />
          {!loading ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Age</th>
                  <th>ID</th>
                  {showEditStudent && <th className="action">Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>
                      {showEditStudent && editRowId === student._id ? (
                        <input
                          placeholder="please enter the new name"
                          className="addInput"
                          value={editedStudent.name}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td>
                      {showEditStudent && editRowId === student._id ? (
                        <input
                          placeholder="please enter the new age"
                          className="addInput"
                          type="Number"
                          value={editedStudent.age}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              age: e.target.value,
                            })
                          }
                        />
                      ) : (
                        student.age
                      )}
                    </td>
                    <td>
                      {showEditStudent && editRowId === student._id ? (
                        <input
                          value={editedStudent.Id}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              Id: e.target.value,
                            })
                          }
                          className="addInput"
                          placeholder="please enter the new Id"
                        />
                      ) : (
                        student.Id
                      )}
                    </td>
                    {showEditStudent && (
                      <td>
                        {editRowId === student._id ? (
                          <>
                            <button
                              onClick={saveEditedStudent}
                              className="save"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.46 10.52L3 7.06 4.47 5.6 6.47 7.58 11.53 2 13 3.47 6.46 10.52z"
                                />
                              </svg>
                            </button>
                            <button onClick={cancelEdit} className="cancel ">
                              X
                            </button>
                          </>
                        ) : (
                          <div className="EditAndDelete">
                            <button
                              className="editButton"
                              onClick={() => handleEditButton(student._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="editButton"
                              onClick={() => handleDelete(student._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="loading">Loading Students Informations...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
