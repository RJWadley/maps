import { useState } from "react";
import TheMap from "./components/Map";
import logo from "./logo.svg";

function App() {
  const [count, setCount] = useState(0);

  return <TheMap />;
}

export default App;