import React, { useState } from "react";

export default function TodoList() {
  const [taskList, setTaskList] = useState([]);

  function addTask() {
    let uuid = crypto.randomUUID();
    let newTaskList = JSON.parse(JSON.stringify(taskList));
    newTaskList.push({ id: uuid, taskName: "taskName", isDone: false });
    setTaskList(newTaskList);
  }

  function handleNameChange(taskId, taskName) {
    let i;
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) break;
    }
    if (i < taskList.length) {
      taskList[i].taskName = taskName;
    }
  }

  function deleteTask(taskId) {
    let i;
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) break;
    }
    if (i < taskList.length) {
      let newTaskList = JSON.parse(JSON.stringify(taskList));
      newTaskList.splice(i, 1);
      setTaskList(newTaskList);
    }
  }

  function markDone(taskId) {
    let i;
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) break;
    }
    if (i < taskList.length) {
      let tempId, tempIsDone, tempTaskName;
      tempId = taskList[i].id;
      tempIsDone = taskList[i].isDone;
      tempTaskName = taskList[i].taskName;
      let newTaskList = JSON.parse(JSON.stringify(taskList));
      newTaskList.splice(i, 1);
      newTaskList.push({
        id: tempId,
        taskName: tempTaskName,
        isDone: !tempIsDone,
      });
      setTaskList(newTaskList);
    }
  }

  let renderList = taskList.map((task) => {
    return (
      <li key={task.id}>
        <Task
          id={task.id}
          isDone={task.isDone}
          handleNameChange={handleNameChange}
          deleteTask={deleteTask}
          markDone={markDone}
        />
      </li>
    );
  });

  return (
    <div>
      <h2 className="title">To do List</h2>
      <ol>{renderList}</ol>
      <button className="add-new-btn btn" onClick={addTask}>
        Add new task
      </button>
    </div>
  );
}

function Task({ id, isDone, handleNameChange, deleteTask, markDone }) {
  return (
    <div>
      <div>
        <input
          type="text"
          className={"strikeThroughTaskName-" + isDone}
          placeholder="I have to.."
          onChange={(e) => handleNameChange(id, e.target.value)}
        />
        <button className="delete-btn btn" onClick={() => deleteTask(id)}>
          delete
        </button>
        <button className="done-btn btn" onClick={() => markDone(id)}>
          mark done
        </button>
      </div>
    </div>
  );
}
