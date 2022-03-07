import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <CustomIconButton edge="start" aria-label="menu">
                    <MenuIcon />
                </CustomIconButton>
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
