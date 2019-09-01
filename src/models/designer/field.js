/*
  Evolutility UI Model for Fields
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "field",
	"title": "Fields",
	"name": "field",
	"namePlural": "fields",
	"icon": "",
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "label",
	"fields": [
		{
			"id": "label",
			"type": "text",
			"label": "Label",
			"required": true,
			"maxLength": 100,
			"inMany": true,
			"width": 62,
			"help": "Field title for the user"
		},
		{
			"id": "type",
			"type": "lov",
			"label": "Type",
			"required": true,
			"list": [
				{
					"id": 1,
					"text": "Text",
					"icon": "designer/ft-txt.gif"
				},
				{
					"id": 2,
					"text": "Text multiline",
					"icon": "designer/ft-txtml.gif"
				},
				{
					"id": 3,
					"text": "Boolean",
					"icon": "designer/ft-bool.gif"
				},
				{
					"id": 4,
					"text": "Decimal",
					"icon": "designer/ft-dec.gif"
				},
				{
					"id": 5,
					"text": "Money",
					"icon": "designer/ft-money.gif"
				},
				{
					"id": 6,
					"text": "Integer",
					"icon": "designer/ft-int.gif"
				},
				{
					"id": 7,
					"text": "Date",
					"icon": "designer/ft-date.gif"
				},
				{
					"id": 8,
					"text": "Time",
					"icon": "designer/ft-time.gif"
				},
				{
					"id": 9,
					"text": "Date-time",
					"icon": "designer/ft-datetime.gif"
				},
				{
					"id": 10,
					"text": "Image",
					"icon": "designer/ft-img.gif"
				},
				{
					"id": 11,
					"text": "List (dropdown)",
					"icon": "designer/ft-lov.gif"
				},
				{
					"id": 12,
					"text": "email",
					"icon": "designer/ft-email.gif"
				},
				{
					"id": 13,
					"text": "Link",
					"icon": "designer/ft-url.gif"
				}
			],
			"lovIcon": true,
			"defaultValue": 1,
			"inMany": true,
			"width": 38,
			"help": "Type of field: UI type rather than data type."
		},
		{
			"id": "column",
			"type": "text",
			"label": "Column",
			"required": true,
			"maxLength": 100,
			"width": 62,
			"help": "Database column name"
		},
		{
			"id": "fid",
			"type": "text",
			"label": "Field ID",
			"required": true,
			"inMany": true,
			"width": 38,
			"help": "Field ID is not visible to the user but used in API and routing."
		},
		{
			"id": "object",
			"type": "lov",
			"label": "Object",
			"object": "object",
			"required": true,
			"noCharts": true,
			"inMany": true,
			"width": 32
		},
		{
			"id": "lovTable",
			"type": "text",
			"label": "LOV Table",
			"maxLength": 100,
			"width": 32,
			"help": "Lookup table"
		},
		{
			"id": "lovColumn",
			"type": "text",
			"label": "LOV column",
			"maxLength": 100,
			"width": 38,
			"help": "Column fom Lookup table to display"
		},
		{
			"id": "lovIcon",
			"type": "text",
			"label": "LOV Icon",
			"maxLength": 100,
			"width": 38,
			"help": "Column fom Lookup table to display"
		},
		{
			"id": "inMany",
			"type": "boolean",
			"label": "List",
			"inMany": true,
			"width": 50,
			"help": "Field is used in summary lists"
		},
		{
			"id": "position",
			"type": "integer",
			"label": "Position",
			"noCharts": true,
			"maxLength": 3,
			"width": 50,
			"help": "Order of the field"
		},
		{
			"id": "width",
			"type": "integer",
			"label": "Width",
			"maxLength": 3,
			"defaultValue": 100,
			"width": 50,
			"help": "Relative width of the field (in percentage)"
		},
		{
			"id": "height",
			"type": "integer",
			"label": "Height",
			"max": 30,
			"maxLength": 3,
			"defaultValue": 1,
			"width": 50,
			"help": "Height in number of lines (for \"Textmultiline\" fields)"
		},
		{
			"id": "css",
			"type": "text",
			"label": "CSS",
			"maxLength": 20,
			"width": 50,
			"help": "Stylesheet class name for the field for the edit view."
		},
		{
			"id": "format",
			"type": "text",
			"label": "Format",
			"maxLength": 30,
			"width": 50,
			"help": "example \"$ 0.00\""
		},
		{
			"id": "labelShort",
			"type": "text",
			"label": "Label",
			"width": 100,
			"help": "Optional shorter Field title to display in list header"
		},
		{
			"id": "required",
			"type": "boolean",
			"label": "Required",
			"inMany": true,
			"width": 50,
			"help": "Mandatory field"
		},
		{
			"id": "readOnly",
			"type": "boolean",
			"label": "Read only",
			"defaultValue": false,
			"width": 50,
			"help": "Users can view this field value but cannot modify it"
		},
		{
			"id": "minLength",
			"type": "integer",
			"label": "Min. length",
			"noCharts": true,
			"width": 50,
			"help": "Minimum number of characters required"
		},
		{
			"id": "maxLength",
			"type": "integer",
			"label": "Max. length",
			"noCharts": true,
			"maxLength": 7,
			"width": 50,
			"help": "Maximum number of characters allowed"
		},
		{
			"id": "minvalue",
			"type": "integer",
			"label": "Min. value",
			"noCharts": true,
			"maxLength": 4,
			"labelShort": "Min.",
			"width": 50,
			"help": "Minimum value allowed for the field"
		},
		{
			"id": "maxvalue",
			"type": "integer",
			"label": "Max. value",
			"noCharts": true,
			"maxLength": 4,
			"labelShort": "Max.",
			"width": 50,
			"help": "Maximum value allowed for the field"
		},
		{
			"id": "regExp",
			"type": "text",
			"label": "Regular Expression",
			"maxLength": 100,
			"labelShort": "RegExp",
			"width": 50,
			"help": "Regular expression used to validate the field value."
		},
		{
			"id": "noCharts",
			"type": "boolean",
			"label": "Exclude from Charts",
			"width": 50,
			"help": "If chacked, the field's charts will not appear in the dashboard."
		},
		{
			"id": "chartType",
			"type": "text",
			"label": "Default Chart Type",
			"width": 50,
			"help": "Possible values: Bars, Pie, or List."
		},
		{
			"id": "help",
			"type": "textmultiline",
			"label": "Help",
			"maxLength": 500,
			"width": 100,
			"height": 4,
			"help": "Help on the field for edition"
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"maxLength": 500,
			"width": 100,
			"height": 6
		},
		{
			"id": "defaultValue",
			"type": "text",
			"label": "Default Value",
			"width": 50
		},
		{
			"id": "deleteTrigger",
			"type": "boolean",
			"label": "Delete trigger",
			"width": 50,
			"help": "If checked, deleting records in the lovTable will trigger a cascade delete (only for list (dropdown) fields)."
		}
	],
	"groups": [
		{
			"type": "panel",
			"label": "Definition",
			"width": 62,
			"fields": [
				"label",
				"type",
				"column",
				"fid",
				"object",
				"lovTable",
				"lovColumn",
				"lovIcon"
			]
		},
		{
			"type": "panel",
			"label": "Layout",
			"width": 38,
			"fields": [
				"position",
				"inMany",
				"width",
				"height",
				"css",
				"format",
				"labelShort",
				"chartType",
				"noCharts"
			]
		},
		{
			"type": "panel",
			"label": "Validation",
			"width": 62,
			"fields": [
				"defaultValue",
				"deleteTrigger",
				"required",
				"readOnly",
				"minValue",
				"maxValue",
				"minLength",
				"maxLength",
				"regExp",
				"noCharts"
			]
		},
		{
			"id": "p-help",
			"type": "panel",
			"label": "Field Help",
			"width": 38,
			"fields": [
				"help",
				"description"
			]
		}
	],
	"collections": []
}