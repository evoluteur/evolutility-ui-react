module.exports = {
    id: 'todo',
    label: 'To Do',
    name: 'task',
    namePlural: 'tasks',
    icon: 'todo.gif',
    fnTitle:'title',
    fnSearch: ['title', 'description', 'notes'],
	fields:[
    {
      id: 'title',
      label: 'Title',
      type: 'text',
      width: 70,
      required: true,
      inList: true
    },
    {
      id: 'duedate', 
      type: 'date', 
      label: 'Due Date', 
      width: 30,
      required: true,
      inList: true
    },
    {
      id: 'category', 
      type: 'lov', 
      label: 'Category',
      lovtable: 'todo_category',
      list: [
        {id: 1, text: 'Home'},
        {id: 2, text: 'Work'},
        {id: 3, text: 'Fun'},
        {id: 4, text: 'Others'},
        {id: 5, text: 'Misc.'}
      ], 
      width: 40,
      required: true,
      inList: true
    },
    {
        id: 'priority', type: 'lov', label: 'Priority', 
        width: 30,  inMany: true,
        lovtable: 'todo_priority',
        list: [
            {id: 1, text: '1 - ASAP'},
            {id: 2, text: '2 - Urgent'},
            {id: 3, text: '3 - Important'},
            {id: 4, text: '4 - Medium'},
            {id: 5, text: '5 - Low'}
        ]
    },
    {
      id: 'complete', 
      type: 'boolean', 
      label: 'Complete', 
      width: 30,
      inList: true
    },
    {
      id: 'description', 
      type: 'textmultiline', 
      label: 'Description', 
      height: 5
    }
	],
  elements: [
    {id:'p1', type:'panel', fields: ['title', 'duedate', 'category',]},
    {id:'p2', type:'panel', fields: []},
    {id:'p3', type:'panel', fields: ['description']}
  ]

}

