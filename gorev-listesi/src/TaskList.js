import React, {useState} from "react";
import { Link } from "react-router-dom";

function TaskList({tasks}){
    const [taskList, setTaskList] = useState(tasks);

    const [newTask, setNewTask] = useState('');

    const [error, setError] = useState('');

    const handleAddTask = () => {
        if(newTask.trim() === ''){
            setError('Görev adı boş olamaz!');
            return;
        }else{
            setTaskList([...taskList, newTask]);
            setNewTask('');
            setError('');
        }
    }
    return(
        <div>
            <h1>Görev Listesi</h1>
            {taskList.length === 0 ? (
                <p>Henüz bir görev eklenmedi!</p>
            ):(
            <ul>
                {taskList.map((task, index) => (
                    <li key={index}>{task} - <Link to={`/task/${index}`}>Detaya Git</Link></li>
                ))}
            </ul>
            )}
            <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Yeni Görev ekleyin."
            />
            <button onClick={handleAddTask}>Görev Ekle</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default TaskList;