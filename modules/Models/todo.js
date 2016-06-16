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
      type: 'list', 
      label: 'Category',
      list: [
          {id: 'work', text: 'Work'},
          {id: 'fun', text: 'Fun'},
          {id: 'misc', text: 'Misc.'},
          {id: 'others', text: 'Others'}
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
      type: 'text', 
      label: 'Description', 
      height: 5
    }
	],

	data: [
    {
      "id": "1",
      "title": "Release React-Evolutility",
      "duedate": "2016-07-25",
      "category": "others",
      "priority": "3",
      "complete": false,
      "description": "10 generic views + a ui-modeling language.",
      "notes": ""
    },
    {
      "id": "2",
      "title": "Fix open bugs",
      "duedate": "2014-07-25",
      "category": "work",
      "priority": "3",
      "complete": false,
      "description": "bla bla"
    },
    {
      "id": "3",
      "title": "Testing App",
      "duedate": "2014-06-11",
      "category": "work",
      "priority": "3",
      "complete": false,
      "description": "test"
    },
    {
      "id": "4",
      "title": "Prepare demo",
      "duedate": "2014-05-12",
      "category": "work",
      "priority": "1",
      "complete": false,
      "description": "Check this out"
    },
    {
      "id": "5",
      "title": "Test latest code",
      "category": "misc",
      "priority": "5",
      "complete": true,
      "description": "notes for my test todo task."
    },
    {
      "id": "6",
      "title": "Car wash",
      "category": "work",
      "priority": "4",
      "complete": false
    },
    {
      "id": "7",
      "title": "Watch Inception",
      "duedate": "2014-01-10",
      "category": "fun",
      "priority": "5",
      "complete": true
    },
    {
      "id": "8",
      "title": "Test TODO",
      "duedate": "2015-01-01",
      "category": "work",
      "priority": "1",
      "complete": true,
      "description": "Test TODO "
    },
    {
      "id": "9",
      "title": "Dentist",
      "category": "home",
      "priority": "3",
      "complete": true
    },
    {
      "id": "10",
      "title": "French translation",
      "category": "work",
      "priority": "4",
      "complete": true
    },
    {
      "id": "11",
      "title": "Italian translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "12",
      "title": "Chinese translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "13",
      "title": "Japanese translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "14",
      "title": "German translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "15",
      "title": "Russian translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "16",
      "title": "Polish translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "17",
      "title": "Klingon translation",
      "category": "work",
      "priority": "4"
    },
    {
      "id": "18",
      "title": "Code optimization",
      "duedate": "2015-01-01",
      "category": "work",
      "priority": "4",
      "complete": false
    },
    {
      "id": "19",
      "title": "Setup demo server",
      "category": "work",
      "priority": "2",
      "complete": false
    },
    {
      "id": "20",
      "title": "Add sample data",
      "duedate": "2014-04-23",
      "category": "work",
      "priority": "3",
      "complete": true
    }
  ]
}

