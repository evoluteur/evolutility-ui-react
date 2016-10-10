module.exports = {
  id: 'todo',
  label: 'To-Do List',
  name: 'task',
  namePlural: 'tasks',
  icon: 'todo.gif',
  titleField: 'title',

	fields:[
    {
      id: 'title',
      label: 'Title',
      type: 'text',
      width: 70,
      required: true,
      inMany: true
    },
    {
      id: 'duedate', 
      type: 'date', 
      label: 'Due Date', 
      width: 30,
      inMany: true
    },
    {
      id: 'category', 
      type: 'lov', 
      label: 'Category',
      list: [
        {id: 1, text: 'Home'},
        {id: 2, text: 'Work'},
        {id: 3, text: 'Fun'},
        {id: 4, text: 'Others'},
        {id: 5, text: 'Misc.'}
      ], 
      width: 40,
      inMany: true
    },
    {
        id: 'priority', type: 'lov', 
        label: 'Priority', 
        width: 100,  inMany: true,
        list: [
            {id: 1, text: '1 - ASAP'},
            {id: 2, text: '2 - Urgent'},
            {id: 3, text: '3 - Important'},
            {id: 4, text: '4 - Medium'},
            {id: 5, text: '5 - Low'}
        ],
        defaultValue: 4
    },
    {
      id: 'complete', 
      type: 'boolean', 
      label: 'Complete', 
      width: 100,
      inMany: true
    },
    {
      id: 'description', 
      type: 'textmultiline', 
      label: 'Description', 
      height: 5
    }
	],

  groups: [
    {
      id:'p1', type:'panel', 
      label: 'Task', width: 62,
      fields: ['title', 'duedate', 'category']
    },
    {
      id:'p2', type:'panel', 
      label: 'Status', width: 38,
      fields: ['priority', 'complete']
    },
    {
      id:'p3', type:'panel', 
      label: 'Task Description', width: 100,
      fields: ['description']
    }
  ]

}

