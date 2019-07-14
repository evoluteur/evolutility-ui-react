import PropTypes from 'prop-types'

const sizes = ['small', 'large']
const chartsTypes = ['Bars', 'Pie', 'Table']

export default {
    size: sizes,
    chart: chartsTypes,
    props: {
        data: PropTypes.any,
        size:  PropTypes.oneOf(sizes),
    }
}