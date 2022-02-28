import { useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';
import '../styles/tasklist.scss';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const newTask = {
      id: Math.random(),                                                // random ID
      title: newTaskTitle,
      isComplete: false,
    }

    newTaskTitle !== '' && (setTasks(prevState => [...prevState, newTask]))   // confirm task title is not null
    setNewTaskTitle('')
  }


  function handleToggleTaskCompletion(IDofClickedTask: number) {
    const newTasks = tasks.map(task => task.id === IDofClickedTask ? {
      ...task, 
      isComplete: !task.isComplete,
    } :
      task
    )
    setTasks(newTasks)
  }


  function handleRemoveTask(IDofClickedTask: number) {
    const filteredTasks = tasks.filter(task => task.id !== IDofClickedTask)
    setTasks(filteredTasks)
  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}

function title(title: any) {
  throw new Error('Function not implemented.');
}
