import { v4 as uuidv4 } from 'uuid';

export const initialTodos = {
    importantUrgent: [
      { isChecked: false, id: uuidv4(), text: 'Buy groceries asap' },
      { isChecked: false, id: uuidv4(), text: 'Schedule meeting now' },
      { isChecked: false, id: uuidv4(), text: 'Read book today' },
    ],
    importantNotUrgent: [
      { isChecked: false, id: uuidv4(), text: 'Buy groceries later' },
      { isChecked: false, id: uuidv4(), text: 'Schedule meeting later' },
      { isChecked: false, id: uuidv4(), text: 'Read book later' },
    ],
    notImportantUrgent: [
      { isChecked: false, id: uuidv4(), text: 'Buy groceries later' },
      { isChecked: false, id: uuidv4(), text: 'Read book later' },
    ],
    notImportantNotUrgent: [
      { isChecked: false, id: uuidv4(), text: 'Buy groceries later' },
      { isChecked: false, id: uuidv4(), text: 'Schedule meeting later' },
    ],
  };