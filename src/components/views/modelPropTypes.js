import PropTypes from "prop-types";
import { fieldTypes } from "../../utils/dico";

const fieldTypesArray = Object.values(fieldTypes);

export const fieldPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(fieldTypesArray).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  help: PropTypes.string,
});

export const fieldGroupPropTypes = PropTypes.shape({
  // type: PropTypes.oneOf(["panel"]),
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.string,
  footer: PropTypes.string,
});

export const collectionPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  object: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape()])
  ).isRequired,
});

const modelPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  namePlural: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(fieldPropTypes).isRequired,
  groups: PropTypes.arrayOf(fieldGroupPropTypes),
  collections: PropTypes.arrayOf(collectionPropTypes),
});

export default modelPropTypes;
