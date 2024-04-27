import { useEffect, useState } from "react";
import axios from "axios";
import DropDown from "./DropDown.jsx";
import LightDarkMode from "./light-dark-mode/index.jsx";
export default function EditStudents() {
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
      console.log("ERORR DELETEing " + error);
    }
  }

  return (
    <div className="app">
      <div className="studentsDataInfo">
        <h2>Students Information</h2>

        <div className="StudentsCard">
          <DropDown fetchData={fetchData} />
          <LightDarkMode></LightDarkMode>

          <input
            className="search"
            id="searchInput"
            type="text"
            placeholder="Search by name, age, or ID"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {!loading ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Age</th>
                  <th>ID</th>
                  <th className="action">Action</th>
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
                    {
                      <td>
                        {editRowId === student._id ? (
                          <>
                            <button
                              onClick={saveEditedStudent}
                              className="editButton"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="editButton "
                            >
                              Cancel
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
                    }
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
