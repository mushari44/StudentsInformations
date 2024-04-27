import { useEffect, useState } from "react";
import axios from "axios";
function StudentsTable({ refresh }) {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
  return (
    <div className="StudentsTableContainer">
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
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.Id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="loading">Loading Students Informations...</p>
      )}
    </div>
  );
}
export default StudentsTable;
