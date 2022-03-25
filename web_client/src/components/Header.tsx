import React from 'react';
import { useHistory } from 'react-router-dom';

interface MenuItemProp {
    name: string;
    route?: string;
    onClick?: () => any;
    flex: number;
}

const MenuItems: MenuItemProp[] = [
    {
        name: 'Home',
        route: '/',
        flex: 5,
    },
    {
        name: 'Dev',
        route: '/home',
        flex: 1,
    },
    {
        name: 'Buy',
        onClick: () => {
            alert('coming soon');
        },
        flex: 1,
    },
]

const MenuItem: React.FC<MenuItemProp> = (props: MenuItemProp) => {
    const { name, route, flex, onClick } = props;
    let history = useHistory();

    const onClickFunction = () => {
        if (onClick) onClick();
        if (route) history.push(route);
    }

    const menuStyle = {
        flex,
    }

    return (
        <div style={menuStyle} className='MenuItem' onClick={onClickFunction}>
            {name}
        </div>
    );
}

export const Header: React.FC<any> = (props: any) => {
    
    
    return (
        <div className='Header'>
            {
                MenuItems.map((menuItem) => (
                    <MenuItem {...menuItem} />
                ))
            }
        </div>
    );
}

export default Header;