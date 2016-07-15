
import $ from 'jquery' 
import {apiPath} from '../../../config.js'
import { browserHistory } from 'react-router'

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

			$.ajax({
				url: apiPath+e+'/'+id, 
				type: id?'PUT':'POST',
				data: data,
				success: (data) => {
					if(id){
	                    alert('Item updated.')
					}else{
	                    alert('Item added.')
						browserHistory.push('/'+e+'/edit/'+data.id)
					}
					this.setState({
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
			if(nextProps.params.entity != this.props.params.entity
				|| nextProps.params.id != this.props.params.id){
				this.setState({
					data: {}
				})
				this.getData(nextProps.params.entity)
			}
		},

 	}
}
