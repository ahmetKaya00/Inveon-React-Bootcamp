import React from "react";
import TaskList from "./TaskList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetail from "./TaskDetail";

function App(){

  const tasks = [];

  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks}/>}></Route>
          <Route path="/task/:taskId" element={<TaskDetail tasks={tasks}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;