import './App.css';
import { useState } from "react";
import { Task } from './Task'

function App() {
  const [todoList, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isTaskExisting, setIsTaskExisting] = useState(false);

  const handleChange = (event) => {
    setNewTodo(event.target.value);
    setIsTaskExisting(false);
  };

  const addTask = () => {
    if (newTodo.trim() !== '') {
      const isTaskExists = todoList.some(task => task.taskName === newTodo);
      if (isTaskExists) {
        setIsTaskExisting(true);
      } else {
        const task = {
          id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
          taskName: newTodo,
          status: false
        };
        const newTaskSet = [...todoList, task];
        setList(newTaskSet);
        setNewTodo(''); 
      }
    }
  };

  const removeTask = (id) => {
    setList(todoList.filter((task) => task.id !== id));
  };

  const statusOfTheTask = (id) => {
    setList(todoList.map(task => {
      if (task.id === id) {
        return { ...task, status: true };
      }
      return task;
    }));
  };

  const updateTaskName = (id, newName) => {
    const isNameExists = todoList.some(task => task.taskName === newName);
if(!isNameExists){
    setList(todoList.map(task => {
      if (task.id === id) {
        return { ...task, taskName: newName };
      }
      return task;
    }));
  }else{
    setIsTaskExisting(true);
  }
  };
  const sampleArray = [
    { key: "apple", value: 5 },
    { key: "banana", value: 3 },
    { key: "orange", value: 8 },
    { key: "grape", value: 10 }
];
  return (
    <>
    <div className='main'>
      <div className="App" >
        <h1 className='heading'>ToDo List</h1>
        <div className='inputrow'>
          <input className='input' onChange={handleChange} type="text" value={newTodo} />
          <button className='add-button' onClick={addTask}>Add Task</button>
        </div>
        {isTaskExisting && <h3 style={{color:'red',textAlign:'center'}}>Task already exists</h3>}
        {
          sampleArray.map((val)=>
          (<>
          
            <h1 key={val.key} style={{textAlign:'center'}}>{val.key}</h1>
            <h2>{val.value}</h2>
            </>
          ))
        }
        <div className='tasks'>
          {todoList.map((list) => (
            <Task
              key={list.id}
              taskName={list.taskName}
              id={list.id}
              removeTask={removeTask}
              statusOfTheTask={statusOfTheTask}
              status={list.status}
              updateTaskName={updateTaskName}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
