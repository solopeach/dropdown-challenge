import "./styles.css";
import Dropdown from "./Dropdown";

// dummy data
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "John Smith",
  "Paul Jones",
];
const ages = ["Twenty", "Twenty one", "Twenty one and a half"];

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Dropdown
          name={"Names"}
          items={names}
          isMultiselect={true}
          width={250}
        />
        <Dropdown name={"Ages"} items={ages} width={200} />
      </div>
    </div>
  );
}
