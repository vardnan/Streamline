// data.js
import { v4 as uuidv4 } from 'uuid';

export const initialTodos = {
  importantUrgent: [
    { type: 'header', id: uuidv4(), text: 'scheduled' },
    // ... other to-do items for importantUrgent
    { type: 'header', id: uuidv4(), text: 'not scheduled' },
    // ... other to-do items for importantUrgent
  ],
  importantNotUrgent: [
    { type: 'header', id: uuidv4(), text: 'scheduled' },
    // ... other to-do items for importantNotUrgent
    { type: 'header', id: uuidv4(), text: 'not scheduled' },
    // ... other to-do items for importantNotUrgent
  ],
  notImportantUrgent: [
    { type: 'header', id: uuidv4(), text: 'scheduled' },
    // ... other to-do items for notImportantUrgent
    { type: 'header', id: uuidv4(), text: 'not scheduled' },
    // ... other to-do items for notImportantUrgent
  ],
  notImportantNotUrgent: [
    { type: 'header', id: uuidv4(), text: 'scheduled' },
    // ... other to-do items for notImportantNotUrgent
    { type: 'header', id: uuidv4(), text: 'not scheduled' },
    // ... other to-do items for notImportantNotUrgent
  ],
  // ... add more categories if necessary
};
