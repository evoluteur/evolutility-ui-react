import PropTypes from 'prop-types'

const sizes = ['small', 'large']
const chartTypes = ['bars', 'pie', 'table']

export default {
    sizes: sizes,
    chartTypes: chartTypes,
    chartProps: {
        data: PropTypes.any,
        size:  PropTypes.oneOf(sizes),
    }
}