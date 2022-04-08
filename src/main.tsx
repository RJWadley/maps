import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container == undefined) throw new Error("nowhere to display");
const root = createRoot(container);
root.render(<App />);
