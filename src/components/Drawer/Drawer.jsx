import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

export default function TemporaryDrawer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const itemList = [
    { text: 'Profile', icon: <AccountCircleIcon />,}, 
    { text: 'My Tournaments', icon: <CreateIcon /> }, 
    { text: 'Create Tournament', icon: <PlaylistAddIcon />}, 
    { text: 'Search', icon: <SearchIcon /> }];

    const navigateTo = () => {
        if ( itemList.text === 'Profile' ){
          history.push('/user');
        } else if ( itemList.text == 'My Tournaments') {
          history.push('/details')
        }
      }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {itemList.map((item, index) => { 
            const { text, icon, onClick } = item;
            return (
            <ListItem button key={text} onClick={(event) => navigateTo(event)}>
                { icon && <ListItemIcon>{icon}</ListItemIcon> }
                <ListItemText primary={text} />
            </ListItem>
        )})} */}
        <Link to="/user">
            <ListItem>
                <ListItemIcon>
                    {<AccountCircleIcon />}
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
            </ListItem>
        </Link>
        <Link to="/info">
            <ListItem>
                <ListItemIcon>
                    {<MenuBookIcon />}
                </ListItemIcon>
                <ListItemText>My Tournaments</ListItemText>
            </ListItem>
        </Link>
        <Link to="/create">
            <ListItem>
                <ListItemIcon>
                    {<PlaylistAddIcon />}
                </ListItemIcon>
                <ListItemText>Create Tournament</ListItemText>
            </ListItem>
        </Link>
        <Link to="/about">
            <ListItem>
                <ListItemIcon>
                    {<SearchIcon />}
                </ListItemIcon>
                <ListItemText>Search</ListItemText>
            </ListItem>
        </Link>
      </List>
      <Divider />
        <List> 
            {<ListItem id="logout" button key={'Logout'}
            onClick={() => dispatch({ type: 'LOGOUT' })}>
                <ListItemIcon>
                    {<LogoutIcon/>}
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
            </ListItem>}
        </List>
    </Box>
  );

  return (
    <>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <DehazeIcon onClick={toggleDrawer(anchor, true)}>{anchor}</DehazeIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}