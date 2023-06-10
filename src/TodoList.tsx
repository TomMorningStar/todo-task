import React, { useState } from 'react';
import { Todo } from './components/Todo';
import { Form } from './components/Form';
import BackPage from './components/BackPage';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

enum TaskFilter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task-1', completed: true },
    { id: 2, name: 'Task-2', completed: false },
  ]);
  const [newTaskName, setNewTaskName] = useState('');
  const [taskFilter, setTaskFilter] = useState<string>(TaskFilter.All);
  const [currentTasksStatus, setCurrentTasksStatus] = useState<number>(0);

  const [nextPage, setNextPage] = useState<string>('up');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newTask: Task = {
        id: tasks.length + 1,
        name: newTaskName,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskName('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (filter: string, index: number) => {
    setTaskFilter(filter);
    setCurrentTasksStatus(index);
    setNextPage('down');

    setTimeout(() => {
      setNextPage('up');
    }, 100);
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === TaskFilter.Active) {
      return !task.completed;
    } else if (taskFilter === TaskFilter.Completed) {
      return task.completed;
    }
    return true;
  });

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <div className='todo-list'>
      <h1>Todos</h1>
      <div className='todos'>
        <Form
          handleAddTask={handleAddTask}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          newTaskName={newTaskName}
        />

        <ul className={nextPage === 'down' ? 'list up' : 'list down'}>
          {filteredTasks.length === 0 && <div className='no-tasks'>No tasks</div>}
          {filteredTasks.map((task) => (
            <Todo key={task.id} task={task} handleCheckboxChange={handleCheckboxChange} />
          ))}
        </ul>

        <nav>
          <div className='count-left'>{tasks.filter(task => !task.completed).length} items left</div>
          <div className='todo-status'>
            {Object.keys(TaskFilter).map((status, i) => (
              <button
                key={status}
                className={currentTasksStatus === i ? 'active' : ''}
                onClick={() => handleFilterChange(status, i)}
              >
                {status}
              </button>
            ))
            }
          </div>
          <button data-testid='clear-completed' onClick={handleClearCompleted} className='clear-completed'>Clear completed</button>
        </nav>
      </div>
      <BackPage width={'490px'} />
      <BackPage width={'480px'} />
    </div>
  );
};

export default TodoList;
