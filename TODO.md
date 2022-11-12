# Evolutility-UI-React &middot; [![GitHub license](https://img.shields.io/github/license/evoluteur/evolutility-ui-react)](https://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/evolutility-ui-react)](https://www.npmjs.com/package/evolutility-ui-react)

# Roadmap

- Write Vision/Manifesto + Plan

- Rethink metamodel (add transform, more separation b/w backend and front end, new "expression" prop for fieldTypes and FieldGroups, different field type for lov and object, maybe single lov table...

- Make a JIRA style app to track evolutility development (and replace this list) or do it in GitHub.

- Plug UI library - thinking mantine...
- search
- filters
- Add "conform" models (saved filters, handpicked sets, dashboards...)
- WIP: Add Activity feature + View
- WIP: Add Summary view
- Every field type can also be an array of values of that type
- evolutility-models generate list of relationships to create in hasura admin
- Use Yup for validation (maybe validation rules in json or keep the main ones in separate columns like now)
- Add Groups (handpicked lists)
- Choice of UX pattern: Drawer / navigation / dual pane
- translate in other languages (/src/i18n/XX.js)
- In code, use functions rather than classes for components
- Add checkboxes for selection to the List and Cards views
- Add "Compare" view for side-by-side comparaison and averages
- Add "Kanban" view w/ drag & drop
- Add Kaggle style table view
- Dependent fields
- Integrate Designer inside each views
- plug RTKQuery or TanStack Query (=> caching)
- Add checkboxes for selection to the List and Cards views
- Add filtering for List and Card views (and later for Groups)
- Add "Clone" action
- Better 404 page
- Option for Drawer rather than navigation
- Drawer for editing metadata
- Add User settings & preferences (move most of config.js there)
- a pluggin system for new Field Types or Views
- upgrade components to use functions rather than classes
- Add sorting for Cards
- CSS for print
- Theme Dark/Light, Comfortable/Compact
- Tooltip style Confirmation on delete.
- Warning when leaving page w/ unsaved changes.
- pluggins for FieldTypes
- pluggins for views
- routes overriding mechanism for custom build views
- json-schema to Evolutility models script
- CI/CD pipelines on GitHub
- Adding tests
- scripts to run all tests on each model