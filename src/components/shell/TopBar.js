
import React from 'react'
import { Link } from 'react-router-dom'

import logoEvol from './evologo.gif'

import './TopBar.scss'

// TODO: use Portal to nest toolbar
export default class TopBar extends React.PureComponent {

    render() {
 // <Link to='/designer' style={{float:'right', color:'white'}}><i className='glyphicon glyphicon-cog' /></Link>
        return (   
            <header className="TopBar" role="banner">
                <Link to='/'><img src={logoEvol} className="tbLogo" alt="" /></Link>

            </header>
        )
    }

}