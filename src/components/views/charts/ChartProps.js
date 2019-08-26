import PropTypes from 'prop-types'

const sizes = ['small', 'large']
const chartTypes = ['Bars', 'Pie', 'Table']

export default {
    sizes: sizes,
    chartTypes: chartTypes,
    chartProps: {
        data: PropTypes.any,
        size:  PropTypes.oneOf(sizes),
    }
}