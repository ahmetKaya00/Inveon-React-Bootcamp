import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "./TaskContext";
import { Alert, Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import alertify from "alertifyjs";

function TaskDetail(){
    const {taskId} = useParams();

    const{taskList, setTaskList} = useContext(TaskContext);

    const [uptatedTask, setUpdatedTask] = useState('');

    const task = taskList[taskId];
    const navigate = useNavigate();

    if(!task){
        return <Alert color="danger">Görev Bulunamadı!</Alert>
    }

    const handleUpdateTask = () =>{
        if(uptatedTask.trim() === ''){
            alertify.error('Görev adı boş olamaz!');
            return;
        }else{
            const newTaskList = [...taskList];
            newTaskList[taskId] = uptatedTask;
            setTaskList(newTaskList);
            alertify.success('Görev başarıyla güncellendi!');
            setUpdatedTask('');
        }
    };

    const handleDeleteTask = () =>{
        const newTaskList = taskList.filter((_, index)=> index !== parseInt(taskId));
        setTaskList(newTaskList);
        alertify.success('Görev başarıyla silindi!');
        navigate('/');
    }

    return(
        <div className="container mt-4">
            <h1>Görev Detayı</h1>
            <ListGroup>
                <ListGroupItem>
                    <strong>Görev:</strong>{task}
                </ListGroupItem>
            </ListGroup>

            <div className="mt-4">
                <Input
                type="text"
                value={uptatedTask}
                onChange={(e)=> setUpdatedTask(e.target.value)}
                placeholder="Görevi güncelle"
                className="mb-2"
                ></Input>

                <Button color="primary" onClick={handleUpdateTask} className="me-2">Güncelle</Button>
                <Button color="danger" onClick={handleDeleteTask} className="me-2">Sil</Button>
            </div>
        </div>
    );
}
export default TaskDetail;