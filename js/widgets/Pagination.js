
// Evolutility-UI-React :: /widget/Pagination.js
 
// Pagination for List and Cards views (styled w/ Bootstrap).
 
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2016 Olivier Giulieri

import React from 'react'
import _ from 'underscore'

import url from '../utils/url'
import {pageSize} from '../../config'

export default React.createClass({

	propTypes: {
		pageIdx: React.PropTypes.number,
        count: React.PropTypes.number,
        fullCount: React.PropTypes.number,
        location: React.PropTypes.object,
		fnClick: React.PropTypes.func.isRequired
	},

	getInitialState(){
		return {
			pageIdx: true,
            fullCount: this.props.fullCount,
            count: this.props.count
		}
	},

    _paginationBody() {
        const totalSize = this.props.fullCount,
            size = this.props.count,
            pIdx = parseInt(this.props.location.query.page || '0', 10)
        let h = []

        if (totalSize > size) {
            const fnClick = this.props.fnClick,
                nbPages = Math.ceil(totalSize / pageSize),
                wPrev = pIdx>0,
                wNext = nbPages>(pIdx+1)
            let pId = pIdx + 1,
                maxRange,
                bPage = function(id){
                    h.push(<li key={id} className={pId===id?'active':''} onClick={fnClick}>
                    	<a href="javascript:void(0)">{id}</a>
                    </li>)
                },
                bPageRange = function(pStart, pEnd){
                    for (var i=pStart; i<=pEnd; i++) {
                        bPage(i)
                    }
                },
                bGap = function(idx){
                    h.push(<li key={'gap'+idx} className="disabled"><a href="javascript:void(0)">...</a></li>)
                };
            h.push(<li key="prev" className={wPrev ? '':'disabled'} onClick={wPrev ? fnClick : null}> 
                	<a href="javascript:void(0)">&laquo;</a>
                </li>)
            bPage(1);
            if(pId>4 && nbPages>6){
                if(pId===5){
                    bPage(2);
                }else{
                    bGap(1);
                }
                maxRange=_.min([pId+2, nbPages]);
                bPageRange(_.max([2, pId-2]), maxRange);
            }else{
                maxRange=_.min([_.max([5, pId+2]), nbPages]);
                bPageRange(2, maxRange);
            }
            if(maxRange<nbPages && pId+2<nbPages){
                bGap(2);
                bPage(nbPages);
            }
            h.push(<li key="next" className={wNext ? '' : 'disabled'} onClick={wNext ? fnClick : null}>
            		<a href="javascript:void(0)">&raquo;</a>
            	</li>)
        }
        return h;
    },

	render() {
		return this.props.fullCount>pageSize ? ( 
				<nav className="clearer"> 
					<ul className="pagination">
						 {this._paginationBody()}
					</ul> 
				</nav> 
			) : null
	}
	
})
