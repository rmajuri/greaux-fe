import { useState, useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import AuthenticationContext from '../context/AuthenticationContext'

const Nav = () => {
    const [toggle, setToggle] = useState(false)
    const router = useRouter();

    const {user} = useContext(AuthenticationContext)

    const toggleDrawer = value => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setToggle(value)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <CustomIconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </CustomIconButton>
                    <Drawer 
                        anchor="left"
                        open={toggle}
                        onClose={toggleDrawer(false)}
                    >
                        <div>
                            <List>
                                <ListItem button onClick={() => router.push('/')}>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>

                                {user ? (
                                    <ListItem button onClick={() => router.push('/logout')}>
                                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                        <ListItemText primary='Sign Out' />
                                    </ListItem>
                                    ) : (
                                        <ListItem button onClick={() => router.push('/login')}>
                                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                            <ListItemText primary='Sign In' />
                                        </ListItem>
                                    )}
                            </List>
                        </div>
                    </Drawer>
                <CustomTypography variant="h6">
                    Local Reviews
                </CustomTypography>
            </Toolbar>
        </AppBar>
    )
}

export default Nav

const CustomIconButton= styled(IconButton)(({theme}) => ({
    marginRight: theme.spacing(2),
    color: "inherit"
  }));

  const CustomTypography= styled(Typography)(() => ({
    flexGrow: 1
  }));
