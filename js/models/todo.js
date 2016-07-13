module.exports = {
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
      width: 70,
      inList: true
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
	]

}

