
import $ from 'jquery' 
import {apiPath} from '../../../config.js'

export default function(){

	return {

		getData: function(entity){
			var e = entity || this.props.params.entity
			var urlparams=''
			//urlparams += '&order=name.desc'

			$.get(apiPath+e+urlparams, function (data) {
				this.setState({
					data: data
				})
			}.bind(this))
		},

		getInitialState: function() {
			return {
				data: []
			}
		},

		componentDidMount: function() {
			this.getData()
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params.entity != this.props.params.entity){
				this.setState({
					data: []
				})
				this.getData(nextProps.params.entity)
			}
		}

	}

}
