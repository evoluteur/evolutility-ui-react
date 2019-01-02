
import React from 'react'
import { Link } from 'react-router-dom'

import logoEvol from './home.png'
import logoGithub from './github.png'

import './TopBar.scss'

// TODO: use Portal to nest toolbar
export default class TopBar extends React.PureComponent {

    render() {
 // <Link to='/designer' style={{float:'right', color:'white'}}><i className='glyphicon glyphicon-cog' /></Link>
        return (   
            <header className="TopBar" role="banner">
                <Link to='/'><img src={logoEvol} className="tbLogo" alt="" height="40" /></Link>

                <a className="github" target="github" href="https://github.com/david-pfx/naxl-ui" data-hotkey="g d">
                    <img src={logoGithub} alt="Github" title="Github" />
                </a>

                

            </header>
        )
    }

}