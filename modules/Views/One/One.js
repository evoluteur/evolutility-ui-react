
import $ from 'jquery' 
import {apiPath} from '../../../config.js'

export default function(){

	return {

		getData: function(entity){
			var e = entity || this.props.params.entity
			var id = this.props.params.id
			
			if(id){
				$.get(apiPath+e+'/'+id, function (data) {
					this.setState({
						data: data
					});
				}.bind(this));
			}
		},

		upsertOne: function(entity){
			var e = entity || this.props.params.entity
			var id = this.props.params.id || ''
			var data=this.delta

				var that=this
				$.ajax({
					url: apiPath+e+'/'+id, 
					type: id?'PUT':'POST',
					data: data,
					success: function (data) {
						that.setState({
							data: data
						});
					}
				})
		},

		getInitialState: function() {
			return {
				data: {}
			}
		},

		componentDidMount: function() {
			this.getData()
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params.entity != this.props.params.entity){
				this.setState({
					data: {}
				})
				this.getData(nextProps.params.entity)
			}
		}
 	}
}
