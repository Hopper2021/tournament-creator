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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/user">
            <ListItem sx={{ mt: 1 }}>
            {/* <ListItemText sx={{ textAlign: 'center', fontWeight: 'bold', m: 1 }}>Profile</ListItemText> */}
                <ListItemIcon>
                    {<AccountCircleIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
            <ListItemText sx={{ textAlign: 'center', fontWeight: 'bold', m: 1 }}>Profile</ListItemText>
            </ListItem>
        </Link>
        <Link to="/info">
            <ListItem sx={{ mt: 1 }}>
            {/* <ListItemText sx={{ textAlign: 'center' }}>My Tournaments</ListItemText> */}
                <ListItemIcon>
                    {<MenuBookIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
            <ListItemText sx={{ textAlign: 'center' }}>My Tournaments</ListItemText>
            </ListItem>
        </Link>
        <Link to="/create/data">
            <ListItem sx={{ mt: 1 }}>
            {/* <ListItemText sx={{ textAlign: 'center' }}>Create Tournament</ListItemText> */}
                <ListItemIcon>
                    {<PlaylistAddIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
            <ListItemText sx={{ textAlign: 'center' }}>Create Tournament</ListItemText>
            </ListItem>
        </Link>
        <Link to="/about">
            <ListItem sx={{ mt: 1 }}>
            {/* <ListItemText sx={{ textAlign: 'center' }}>Search</ListItemText> */}
                <ListItemIcon>
                    {<SearchIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
            <ListItemText sx={{ textAlign: 'center' }}>Search</ListItemText>
            </ListItem>
        </Link>
      </List>
      <Divider />
        <List > 
            {<ListItem id="logout" button key={'Logout'} sx={{ mt: 2 }}
            onClick={() => dispatch({ type: 'LOGOUT' })}>
                <ListItemIcon>
                    {<LogoutIcon sx={{ width: 50, height: 50 }}/>}
                </ListItemIcon>
            <ListItemText primary={'Logout'} sx={{ textAlign: 'center' }} />
            </ListItem>}
        </List>
    </Box>
  );

  return (
    <>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <DehazeIcon sx={{ width: 40, height: 40, ml: 1, mr: 1 }} onClick={toggleDrawer(anchor, true)}>{anchor}</DehazeIcon>
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