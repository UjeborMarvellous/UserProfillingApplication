import React, { useState, useEffect } from "react";
import app from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database"
import { useNavigate, useParams } from "react-router-dom";


function UpdateWrite() {

  const navigate = useNavigate();
  const {firebaseId} = useParams();

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Tasks/DailyTask/"+firebaseId);
      const MainTask = await get(dbRef);
      if (MainTask.exists()) {
        const targerObject = MainTask.val();
        setInputValue1(targerObject.TaskName);
        setInputValue2(targerObject.TaskDescription);
      } else {
        alert("No Data Found");
      }
    }
    fetch();
  }, [firebaseId]);

  const overWriteData = async () => {
    const db = getDatabase(app);
    const MainTask = ref(db, "Tasks/DailyTask/"+firebaseId);
    set(MainTask, {  
      TaskName: inputValue1,
      TaskDescription: inputValue2,
    }).then(() => {
      alert("Task Updated Successfully");
    }).catch((error) => {
      alert("Error while creating", error.message, + " Task Please try again");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      overWriteData();
    }
  };
  return (
    <>
      <div>
        <h1>Update Write</h1>
        <input type="text"
          value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} onKeyDown={handleKeyDown}
        />
        <input type="text"
          value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} onKeyDown={handleKeyDown}
        />
        <button onClick={overWriteData}>Update Task</button>
        <button onClick={() => navigate("/Read")}>Go To Read</button>
        <button onClick={() => navigate("/Update")}>Go To Update Task</button>
      </div>
    </>
  );
}
export default UpdateWrite;
