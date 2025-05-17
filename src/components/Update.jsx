import React, { useState, useEffect } from "react";
import app from "../firebase";
import { getDatabase, ref, get, remove } from "firebase/database"
import { useNavigate } from "react-router-dom";


function Update() {

  const navigate = useNavigate();

  const [taskArray, setTaskArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Tasks/DailyTask");
    const MainTask = await get(dbRef);
    if (MainTask.exists()) {
      const newTaskUpdate = MainTask.val();
      const tempoaryArray = Object.keys(newTaskUpdate).map( myFirstId => {
        return {
          ...newTaskUpdate[myFirstId],
          TaskID: myFirstId
        }
      });
      setTaskArray(tempoaryArray);
    } else {
      alert("No Data Found");
    }
  };

  

  const deleteTask = async (taskIDParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `Tasks/DailyTask/${taskIDParam}`);
    await remove(dbRef);
    window.location.reload();
  };


  return (
    <>
      <div className="container">
        <button onClick={fetchData}>Display Data</button>
        <h1>Display Task</h1>
        <ul>
          {taskArray.map((task, index) => (
            <li key={index} style={{ fontWeight: "bold" }}>
              {task.TaskName}: {task.TaskDescription } : {task.TaskID}
              <button className="buttom" onClick={ () => navigate(`/UpdateTask/${task.TaskID}`)}>Update</button>
              <button className="buttom" onClick={() => deleteTask(task.TaskID)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/Read")}>Back</button>
        <button onClick={() => navigate("/CreateTask")}>Create Task</button>
      </div>
    </>
  );
}
export default Update;