import { Task } from '../TodoList';

export interface ITodoProps {
  task: Task;
  handleCheckboxChange: (taskId: number) => void;
}

export function Todo({ task, handleCheckboxChange }: ITodoProps) {
  return (
    <li className='list-item' >
      <label className='checkbox-container'>
        <input
          type='checkbox'
          checked={task.completed}
          onChange={() => handleCheckboxChange(task.id)}
        />
        <span className={task.completed ? 'checkmark active' : 'checkmark'}></span>
      </label>
      <span className={task.completed ? 'completed' : ''}>{task.name}</span>
    </li>
  );
}
