import  React,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Styles from './NavBar.module.scss';
import { useNavigate } from 'react-router-dom';

function ResponsiveAppBar() {
const pages = ['Home', 'Portfolios', 'Qualification','Reservations', 'Jobs','Media'];
const settings = [ 'Profile','My FeedBacks', 'My Payment', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isloading, setIsLoading] = React.useState(false);




  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isLogged = user && user._id; // Check if the user is l

    setIsLoading(isLogged)
  }, [])
  
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleNavigate = (page) => {
    handleCloseNavMenu();
    navigate(`/${page.toLowerCase()}`); // Navigate to the route corresponding to the page
  };

  const handleSettingsChange=(page)=>{
    console.log("first",page)
    if(page=== 'My FeedBacks'){
      navigate('/myFeedbacks')
    }
    else if(page=== 'My Payment'){
      navigate('/MyPayment')
    }
    else if(page=== 'Logout'){
      localStorage.clear()
      navigate('/')
    }else if(
      page=== 'Profile'){
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        
        const userId = user._id;
      
      navigate(`/myPosts`)
      }
    
    setAnchorElNav(null);
  }

  return (
    <>
    <AppBar position="fixed"
    sx={{
      WebkitBackdropFilter: "blur(10px)",
      marginTop: "20px",
      background:"linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      width: "100%",
      height: "7vh",
      lineHeight: "7vh",
      justifyContent: "center",

    }}
    
    >
      <Container maxWidth="xl" className={Styles.container}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ color:"#8ed3d8", display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              color:"#8ed3d8",
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            
            >
                        {pages.map((page) => (
            <MenuItem key={page} onClick={() => handleNavigate(page)}>
              <Typography textAlign="center" >{page}</Typography>
            </MenuItem>
          ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography

            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',justifyContent:"end", marginRight:"2rem" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleNavigate(page)}}
                sx={{ my: 2, color: '#8ed3d8', display: 'block', fontWeight: 700, letterSpacing: '.1rem', textTransform: 'uppercase'}}
              >
                {page}
              </Button>
            ))}
          </Box>

      {isloading&&    <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>{handleSettingsChange(setting)}}>
                  <Typography textAlign="center" sx={{ textAlign:"right",fontWeight:"800" }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
