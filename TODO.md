# Evolutility-UI-React &middot; [![GitHub license](https://img.shields.io/github/license/evoluteur/evolutility-ui-react)](https://github.com/evoluteur/evolutility-ui-react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/evolutility-ui-react)](https://www.npmjs.com/package/evolutility-ui-react)

# Roadmap

- Write Vision/Manifesto + Plan

- Rethink metamodel (add transform, more separation b/w backend and front end, new "expression" prop for fieldTypes and FieldGroups, different field type for lov and object, maybe single lov table...

- Live demo

- Make a JIRA style app to track evolutility development (and replace this list) or do it in GitHub.

- add caching
- Plug UI library? - thinking mantine or @adobe/react-spectrum...
- search
- filters
- Add "comfort" models & views (saved filters, handpicked sets, customizable dashboards...)
- Every field type can also be an array of values of that type
- replace numeral and moment by Intl
- evolutility-models generate list of relationships to create in hasura admin
- Choice of UX pattern: Drawer / navigation / dual pane
- translate in other languages (/src/i18n/XX.js)
- Add checkboxes for multi-rows selection to the List and Cards views
- Dark & light themes
- Add JSON view (w/ react-json-view?)
- Add "Compare" view for side-by-side comparaison and averages
- Add "Kanban" view w/ drag & drop
- Dependent fields
- Integrate Designer inside each views
- plug RTKQuery or TanStack Query (=> caching)
- Add checkboxes for selection to the List and Cards views
- Add filtering for List and Card views (and later for Groups)
- Add "Clone" action
- CSS for print
- Theme Dark/Light, Comfortable/Compact
- Better 404 page
- Option for Drawer rather than navigation
- Drawer for editing metadata
- Add User settings & preferences (move most of config.js there)
- a pluggin system for new Field Types or Views
- upgrade components to use functions rather than classes
- Add sorting for Cards
- Tooltip style Confirmation on delete.
- Warning when leaving page w/ unsaved changes.
- pluggins for views ( w/ single-spa?) + make Stats & Charts pluggins
- pluggins for FieldTypes
- Add Kaggle style table view
- routes overriding mechanism for custom build views
- Use Yup for validation (maybe validation rules in json or keep the main ones in separate columns like now)
- Adding tests
- CI/CD pipelines on GitHub
- scripts to run all tests on each model
- json-schema to Evolutility models script