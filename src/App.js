import "./App.css";
import { Colors } from "./assets/colors";
import { MyRoutes } from "./routes";

function App() {
  return (
    <div className="App" style={{ backgroundColor: Colors.BACKGROUND_COLOR }}>
      <MyRoutes />
    </div>
  );
}

export default App;
