// same colors as d3 category10 and category20
 

	const colorLst={
		c10: ['1f77b4','ff7f0e','2ca02c','d62728','9467bd',
				'8c564b','e377c2','7f7f7f','bcbd22','17becf'],
		c20: ['1f77b4','aec7e8','ff7f0e','ffbb78','2ca02c',
				'98df8a','d62728','ff9896','9467bd','c5b0d5',
				'8c564b','c49c94','e377c2','f7b6d2','7f7f7f',
				'c7c7c7','bcbd22','dbdb8d','17becf','9edae5']
	}

module.exports = {
		colors10: colorLst.c10,
		colors20: colorLst.c20,
		colorsList: function(maxIdx){
			return colorLst[maxIdx>10?'c20':'c10'];
		}
	} 
