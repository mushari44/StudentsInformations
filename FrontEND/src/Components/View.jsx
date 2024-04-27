import DropDown from "./DropDown.jsx";
import LightDarkMode from "./light-dark-mode/index.jsx";
import StudentsTable from "./StudentsTable.jsx";

function View() {
  return (
    <div className="app">
      <LightDarkMode mode="dark"></LightDarkMode>
      <div className="studentsDataInfo">
        <h2>Students Information</h2>
        <div className="StudentsCard">
          <DropDown />
          <StudentsTable />
        </div>
      </div>
    </div>
  );
}

export default View;
