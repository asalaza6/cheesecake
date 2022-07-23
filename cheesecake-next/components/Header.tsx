import { IconButton } from '@chakra-ui/button';
import { Divider, Flex, Spacer } from '@chakra-ui/layout';
import React from 'react';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { Heading, Text } from 'chakra-ui';
import { useScreenSize } from '../util';

// interface DropdownProps {
//     name: string;
//     route?: string;
// }
// interface MenuItemProp {
//     name: string;
//     route?: string;
//     onClick?: () => any;
//     flex: number;
//     dropdown?: boolean;
//     dropdownOptions?: DropdownProps[];
// }

// const MenuItems: MenuItemProp[] = [
//     {
//         name: 'Home',
//         route: '/',
//         flex: 5,
//     },
//     {
//         name: 'Dev',
//         dropdown: true,
//         flex: 1,
//         dropdownOptions: [
//             {
//                 name: 'dev1',
//                 route: '/dev1',
//             }
//         ],
//     },
//     {
//         name: 'Buy',
//         onClick: () => {
//             alert('coming soon');
//         },
//         flex: 1,
//     },
// ]

// const MenuItem: React.FC<MenuItemProp> = (props: MenuItemProp) => {
//     const { name, route, flex, onClick, dropdown, dropdownOptions } = props;
//     let history = useHistory();
//     const [dropdownOpen, openDropdown] = useState(false);

//     const onClickFunction = (clickRoute?: string) => {
//         clickRoute = clickRoute || route;
//         if (onClick) onClick();
//         if (clickRoute) history.push(clickRoute);
//     }

//     const menuStyle = {
//         flex,
//     }

//     const dropdownStyle = {
//         flex,
//         border: '1pt black solid',
//         height: '100%',
//     }

//     if (dropdown) {
//         return (
//             <div style={dropdownStyle} onMouseOver={() => { openDropdown(true); }} onMouseOut={() => { openDropdown(false); }}>
//                 <div className='MenuItem' style={menuStyle} onClick={() => { onClickFunction(); }}>{name}</div>
//                 {dropdownOpen && dropdownOptions && dropdownOptions.map((item) => {
//                     return <div className='MenuItem' style={menuStyle} onClick={() => { onClickFunction(item.route); }}>{item.name}</div>
//                 })}
//             </div>
//         );
//     }

//     return (
//         <div style={menuStyle} className='MenuItem' onClick={() => { onClickFunction(); }}>
//             {name}
//         </div>
//     );
// }

// export const Header: React.FC<any> = (props: any) => {
    
    
//     return (
//         <div className='Header'>
//             {
//                 MenuItems.map((menuItem) => (
//                     <MenuItem {...menuItem} />
//                 ))
//             }
//         </div>
//     );
// }

// const DropdownDebug: React.FC<any> = (props: any) => {
//     return (
//         <Menu>
//             <MenuButton
//                 as={IconButton}
//                 aria-label='Options'
//                 icon={<HamburgerIcon />}
//                 variant='outline'
//             />
//             <MenuList>
//                 <MenuItem>
//                     Dev 1
//                 </MenuItem>
//                 <MenuItem>
//                     Dev 2
//                 </MenuItem>
//                 <MenuItem>
//                     Dev 3
//                 </MenuItem>
//                 <MenuItem>
//                     Dev 4
//                 </MenuItem>
//             </MenuList>
//         </Menu>
//     );
// }

export const Header: React.FC<any> = (props: any) => {
    const router = useRouter();

    const [size, width] = useScreenSize();

    const headerClass = size === 's' ? 'HeaderTitleSmall' : size === 'm' ? 'HeaderTitleMedium': 'HeaderTitleLarge';

    const onClickFunction = (clickRoute: string) => {
        if (clickRoute) router.push(clickRoute);
    }
    
    return (
        <Flex 
            bgColor='white'
            width='100vw'
            padding='10px 20px 10px 20px'
        >
            <Flex
                justify='flex-start'
            >
                <IconButton 
                    colorScheme='pink'
                    aria-label='home'
                    icon={<AiOutlineHome />}
                    onClick={()=>{onClickFunction('/')}}
                />
            </Flex>
            <Flex
                flexGrow={1}
                justify='center'
                verticalAlign='center'
                className={headerClass}
            >
                    THE CHEESECAKE CONNECT
            </Flex>
            <Flex 
                width='20%'
                justify={'flex-end'}
            >
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                    <MenuList>
                        <MenuItem onClick={() => { onClickFunction('/dev1'); }}>
                            Dev 1
                        </MenuItem>
                        {/* <MenuItem onClick={() => { onClickFunction('/dev2'); }}>
                            Dev 2
                        </MenuItem>
                        <MenuItem onClick={() => { onClickFunction('/dev3'); }}>
                            Dev 3
                        </MenuItem>
                        <MenuItem onClick={() => { onClickFunction('/dev4'); }}>
                            Dev 4
                        </MenuItem> */}
                    </MenuList>
                </Menu>
                <Divider width='10px'/>
                <IconButton 
                    colorScheme='pink'
                    aria-label='home'
                    icon={<AiOutlineShoppingCart />}
                    onClick={()=>{onClickFunction('/buy')}}
                />
            </Flex>
        </Flex>
    );
}

export default Header;