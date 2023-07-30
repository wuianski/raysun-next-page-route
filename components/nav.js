import React, { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/** stack Item setting **/
const Item = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: "#000",
    background: "none",
    boxShadow: "none",
  }));

  const StyledMenu = styled((props) => (
    <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 0,
      marginTop: 0,
      minWidth: "100%",
      height: "100%",
      overflowY:"scroll",
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '0px 0',
      },
      marginLeft:"-16px",
      '& .MuiMenuItem-root': {
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:32,
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        // '&:active': {
        // //   backgroundColor: alpha(
        // //     theme.palette.primary.main,
        // //     theme.palette.action.selectedOpacity,
        // //   ),
        // },
      },
    },
  }));

export default function Nav({ nav }) {
    // console.log(nav)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

    return (
        <>
        <Box>
            <Stack direction={{xs:"row", md:"column"}} spacing={{ xs: 0, md: 1 }} p={4} mt={{ xs: -3, md: 0 }} ml={{ xs: -1.5, md: 0 }}>
            {/* mobile nav icon + content */}
            <Item>
                <Box sx={{display: { xs: 'flex', md: 'none' }}}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <StyledMenu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                    //   anchorOrigin={{
                    //     vertical: 'bottom',
                    //     horizontal: 'left',
                    //   }}
                      keepMounted
                    //   transformOrigin={{
                    //     vertical: 'top',
                    //     horizontal: 'left',
                    //   }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        textTransform:"uppercase"                            
                      }}
                    >
                        <MenuItem>
                            <Link href={`/info/`}>
                                <Box pt={4} pb={8}>info +</Box>
                            </Link>
                        </MenuItem>
                        <MenuItem disabled={true}>
                            <Box sx={{color:"#5B5B5B"}} pb={1}>performance</Box>
                        </MenuItem>
                        {nav.map((n) => (
                            <MenuItem key={n.id} onClick={handleCloseNavMenu}>
                                <Link href={`/works/${n.id}`}>
                                    <div>{n.title_en}</div>
                                </Link>
                            </MenuItem>
                        ))}
                    </StyledMenu>
                </Box>
            </Item>
            {/* mobile + desktop site name */}
            <Item>
                <Link href={`/`}>
                    <Box sx={{textTransform:"uppercase"}} mt={{ xs: 1.5, md: 0 }} pb={1}>Ruey Horng Sun</Box>  
                </Link>
            </Item>
            {/* desktop nav content */}
            <Item sx={{display: { xs: 'none', md: 'block', textTransform:"uppercase" }, paddingBottom:8}}>
                <Link href={`/info/`}>
                    <Box>info +</Box>
                </Link>
            </Item>
            {/* desktop nav content */}
            <Item sx={{display: { xs: 'none', md: 'block', textTransform:"uppercase" },}}>
                <Box sx={{height:"calc(100vh - 208px)", overflowY:"scroll"}}> 
                    <Box sx={{color:"#5B5B5B"}} pb={2}>performance</Box>
                    <div>
                        {nav.map((n) => (
                            <Box key={n.id} pb={2}>
                                <Link href={`/works/${n.id}`}>
                                    <div>{n.title_en}</div>
                                </Link>
                            </Box>
                        ))}
                    </div>
                </Box>
            </Item>
            </Stack>  
        </Box>
        </>  
    )
}