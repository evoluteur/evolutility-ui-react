// Evolutility-UI-React :: /views/many/Chart_Table.js

// Shows a table with the chart data


import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './Chart_Table.scss' 

export default class ChartTable extends React.PureComponent {

    viewId = 'chart_table'

    render(){
        const sLink = this.props.entity+'?'+this.props.field.id+'=',
            makeLink = d => {
                let param = '' + (d.id || d.label)
                param = param==='null' ? 'null' : 'eq.'+param
                return sLink + param
            }

        return (
            <div className="chartTable">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{this.props.field.label}</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data ? this.props.data.map(d => (
                            <tr>
                                <td>{d.label ? <Link to={makeLink(d)}>{d.label}</Link> : ' N/A' }</td>
                                <td>{d.value}</td>
                            </tr>
                        )):null}
                    </tbody>
                </table>
            </div>
        )
    }

}

ChartTable.propTypes = {
    entity: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    data: PropTypes.array,
}