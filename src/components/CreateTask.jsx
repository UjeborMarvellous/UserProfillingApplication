import React, { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database"
import { useNavigate } from "react-router-dom";

function CreateTask() {

  const navigate = useNavigate();

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const handleSubmit = async () => {
    const db = getDatabase(app);
    const MainTask = push(ref(db, "Tasks/DailyTask"));
    set(MainTask, {  
      TaskName: inputValue1,
      TaskDescription: inputValue2,
    }).then(() => {
      alert("Task Created Successfully");
    }).catch((error) => {
      alert("Error while creating", error.message, + " Task Please try again");
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div>
        <h1>Create Task</h1>
        <input type="text"
          value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} onKeyDown={handleKeyDown}
        />
        <input type="text"
          value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Create Task</button>
        <button onClick={() => navigate("/Read")}>Go To Read</button>
        <button onClick={() => navigate("/Update")}>Go To Update Task</button>
      </div>
    </>
  );
}
export default CreateTask;
