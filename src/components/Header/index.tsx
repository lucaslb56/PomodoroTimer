import { HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <HeaderContainer>
            <img src={logo} alt="" />
            <nav>
                <NavLink to="/" title='Timer'>
                    <Timer size={24}></Timer>
                </NavLink>
                <NavLink to="/history" title='Histórico'>
                    <Scroll size={26}></Scroll>
                </NavLink>
            </nav>
        </HeaderContainer>
            
    )
} 