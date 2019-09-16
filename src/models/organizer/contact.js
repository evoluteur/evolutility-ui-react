/*
  Evolutility UI model for Address book
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "contact",
	"title": "Address book",
	"name": "contact",
	"namePlural": "contacts",
	"icon": "contact.gif",
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "fistname",
	"fields": [
		{
			"id": "lastname",
			"type": "text",
			"label": "Lastname",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 62
		},
		{
			"id": "firstname",
			"type": "text",
			"label": "Firstname",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 38
		},
		{
			"id": "jobtitle",
			"type": "text",
			"label": "Title",
			"maxLength": 50,
			"width": 62
		},
		{
			"id": "company",
			"type": "text",
			"label": "Company",
			"maxLength": 50,
			"inMany": true,
			"width": 38
		},
		{
			"id": "email",
			"type": "email",
			"label": "email",
			"maxLength": 100,
			"inMany": true,
			"width": 100
		},
		{
			"id": "web",
			"type": "url",
			"label": "web",
			"maxLength": 255,
			"width": 100
		},
		{
			"id": "category",
			"type": "lov",
			"label": "Category",
			"list": [
				{
					"id": 1,
					"text": "Friends"
				},
				{
					"id": 2,
					"text": "Family"
				},
				{
					"id": 3,
					"text": "Work"
				},
				{
					"id": 4,
					"text": "Meditation"
				},
				{
					"id": 5,
					"text": "Travel"
				},
				{
					"id": 6,
					"text": "Business"
				},
				{
					"id": 7,
					"text": "Sport"
				},
				{
					"id": 8,
					"text": "Restaurants"
				},
				{
					"id": 9,
					"text": "Misc."
				}
			],
			"inMany": true,
			"width": 100
		},
		{
			"id": "phone",
			"type": "text",
			"label": "Work Phone",
			"maxLength": 20,
			"width": 100
		},
		{
			"id": "phonehome",
			"type": "text",
			"label": "Home Phone",
			"maxLength": 20,
			"width": 100
		},
		{
			"id": "phonecell",
			"type": "text",
			"label": "Cell.",
			"maxLength": 20,
			"width": 100
		},
		{
			"id": "fax",
			"type": "text",
			"label": "Fax",
			"maxLength": 20,
			"width": 100
		},
		{
			"id": "address",
			"type": "textmultiline",
			"label": "Address",
			"width": 100,
			"height": 3
		},
		{
			"id": "city",
			"type": "text",
			"label": "City",
			"maxLength": 100,
			"width": 62
		},
		{
			"id": "state",
			"type": "text",
			"label": "State",
			"width": 23
		},
		{
			"id": "zip",
			"type": "text",
			"label": "Zip",
			"maxLength": 12,
			"width": 15
		},
		{
			"id": "country",
			"type": "text",
			"label": "Country",
			"maxLength": 60,
			"width": 100
		},
		{
			"id": "notes",
			"type": "textmultiline",
			"label": "Notes",
			"maxLength": 1000,
			"width": 100,
			"height": 6
		}
	],
	"groups": [
		{
			"type": "panel",
			"label": "Identity",
			"width": 62,
			"fields": [
				"lastname",
				"firstname",
				"jobtitle",
				"company",
				"email",
				"web"
			]
		},
		{
			"type": "panel",
			"label": "Contact Info",
			"width": 38,
			"fields": [
				"phone",
				"phonehome",
				"phonecell",
				"fax"
			]
		},
		{
			"type": "panel",
			"label": "Address",
			"width": 62,
			"fields": [
				"address",
				"city",
				"state",
				"zip",
				"country"
			]
		},
		{
			"type": "panel",
			"label": "Misc.",
			"width": 38,
			"fields": [
				"category",
				"notes"
			]
		}
	],
	"collections": []
}