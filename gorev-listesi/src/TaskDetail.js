import React from "react";
import { useParams } from "react-router-dom";

function TaskDetail({tasks}){
    const {taskId} = useParams();

    const task = tasks[taskId];

    return(
        <div>
            <h1>Görev Detayı</h1>
            <p>Görev: {task}</p>
        </div>
    );
}
export default TaskDetail;