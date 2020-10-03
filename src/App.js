import React, { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskRow } from "./components/TaskRow";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {
  //establecemos el estado inicial y tareas predefinidas 
  const [userName, setUserName] = useState("GRUPO1 ");
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: true },
    { name: "Task Four", done: false }
  ]);
  const [showCompleted, setshowCompleted] = useState(true);
//guaramos localmente en el navegador
  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data != null) {
        setTaskItems(JSON.parse(data))
    } else {
          setUserName("Invitado");
          setTaskItems([
              { name: "Task One", done: false },
              { name: "Task Two", done: false },
              { name: "Task Three", done: true },
              { name: "Task Four", done: false }
          ]);
          setshowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);
//creamos una tarea para la tabla 
  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };
//hacemos una revision por toda la tabla y si el valor coincide se el cambia de valor 
//al objeto encontrado con el mismo pasaria de verdadero = falso y similar  
  const toggleTask = task =>
    setTaskItems(
      taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const taskTableRows = doneValue =>
    taskItems
      .filter(task => task.done === doneValue)
      .map(task => (
        <TaskRow key={task.name} task={task} toggleTask={toggleTask} />
      ));

  return (
    //cambio de estado y se muestran en otra tabla las actividades realizadas 
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <div className="container-fluid">
        <TaskCreator callback={createNewTask} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>{taskTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Tareas completadas "
            isChecked={showCompleted}
            callback={checked => setshowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripcion </th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
