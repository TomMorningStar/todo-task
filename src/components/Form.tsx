import * as React from 'react';

export interface IFormProps {
  handleAddTask: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  newTaskName: string;
}

export function Form({ handleAddTask, newTaskName, handleInputChange }: IFormProps) {

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className='form'>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={newTaskName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
