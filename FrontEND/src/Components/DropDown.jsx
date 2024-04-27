import Select from "react-select";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
function DropDown() {
  const navigate = useNavigate();
  const options = [
    { value: "op3", label: "View" },
    { value: "op1", label: "Add" },
    { value: "op2", label: "Edit and delete" },
  ];

  const handleOptionChange = (selected) => {
    if (selected.value === "op1") {
      navigate("/create");
    } else if (selected.value === "op2") {
      navigate("/edit");
    } else {
      navigate("/");
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
    </div>
  );
}

export default DropDown;
