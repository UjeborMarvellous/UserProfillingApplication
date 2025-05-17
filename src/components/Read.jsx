import React, { useState, useEffect } from "react";
import app from "../firebase";
import { getDatabase, ref, get } from "firebase/database"
import { useNavigate } from "react-router-dom";


function Read() {

  const navigate = useNavigate();

  const [taskArray, setTaskArray] = useState([]);

  const handleSubmit = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Tasks/DailyTask");
    const MainTask = await get(dbRef);
    setTaskArray(MainTask);
    if (MainTask.exists()) {
      setTaskArray(Object.values(MainTask.val()));
    } else {
      alert("No Data Found");
    }
  };

  return (
    <>
      <div className="container">
        <button onClick={handleSubmit}>Display Data</button>
        <h1>Display Task</h1>
        <ul>
          {taskArray.map((task, index) => (
            <li key={index}>
              {task.TaskName}: {task.TaskDescription}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/Update")}>Go To Update Task</button>
        <button onClick={() => navigate("/CreateTask")}>Create Task</button>
      </div>
    </>
  );
}
export default Read;