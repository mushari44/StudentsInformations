import { useState } from "react";
import Select from "react-select";
import AddStudent from "./AddStudent";

function DropDown({ setShowEditStudent, fetchData }) {
  const options = [
    { value: "op3", label: "View" },
    { value: "op1", label: "Add" },
    { value: "op2", label: "Edit and delete" },
  ];

  const [showAddStudent, setShowAddStudent] = useState(false);

  const handleOptionChange = (selected) => {
    if (selected.value === "op1") {
      setShowAddStudent(true);
      setShowEditStudent(false);
      fetchData();
    } else if (selected.value === "op2") {
      setShowAddStudent(false);
      setShowEditStudent(true);
      fetchData();
    } else {
      setShowAddStudent(false);
      setShowEditStudent(false);
      fetchData();
    }
  };

  return (
    <div className="Drop-down">
      <Select
        isSearchable={false}
        options={options}
        placeholder="Select an option"
        onChange={handleOptionChange}
      />
      {showAddStudent && (
        <AddStudent
          setShowAddStudent={setShowAddStudent}
          showAddStudent={showAddStudent}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default DropDown;
