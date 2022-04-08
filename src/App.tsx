import { useState } from "react";
import TheMap from "./components/Map";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [count, setCount] = useState(0);

  return <TheMap />;
}

export default App;
