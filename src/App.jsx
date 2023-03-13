import { useState } from "react";
// import "./App.css";
import { register } from "./register";
import { Buffer } from "buffer";
function App() {
  const [displayIndex, setDisplayIndex] = useState(1);
  const selection = (
    <select
      value={displayIndex}
      onChange={(e) => {
        setDisplayIndex(Number(e.target.value));
      }}
    >
      {register.map((v, i) => {
        return (
          <option key={i} value={i}>
            {v.name}
          </option>
        );
      })}
    </select>
  );

  const MyComponent = register[displayIndex].component;
  return (
    <div className="App">
      <div>{selection}</div>
      <hr />
      <MyComponent />
    </div>
  );
}

export default App;
