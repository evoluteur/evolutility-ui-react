import PropTypes from "prop-types";
import { fieldTypeStrings } from "../../utils/dico";

export const fieldPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(fieldTypeStrings).isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  help: PropTypes.string,
  inMany: PropTypes.bool,
  inSearch: PropTypes.bool,
});

export const fieldGroupPropTypes = PropTypes.shape({
  // type: PropTypes.oneOf(["panel"]),
  label: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number,
  header: PropTypes.string,
  footer: PropTypes.string,
});

export const collectionPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  object: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, fieldPropTypes])
  ).isRequired,
});

const modelPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  namePlural: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(fieldPropTypes).isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  groups: PropTypes.arrayOf(fieldGroupPropTypes),
  collections: PropTypes.arrayOf(collectionPropTypes),
});

export default modelPropTypes;
