import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Drawer from '../../components/Drawer/Drawer';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
    { user.id &&
    <div className="nav">
      <img id="symbol" src="symbol.jpeg"/>
      <Link to="/home">
        <h2 className="nav-title">Tournament Creator</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }
        
        {/* If a user is logged in, show these links */}
        {/* {user.id && (
          <>
            <Link className="navLink" to="/user">
              Profile
            </Link>

            <Link className="navLink" to="/info">
              My Tournaments
            </Link>

            <Link className="navLink" to="/about">
              Search
            </Link>
            
            <LogOutButton className="navLink">
              <Redirect to="/login"/>
            </LogOutButton>
          </>
        )} */}

        {/* TODO If user is NOT logged in, all links in drawer should bring them to the login screen */}
        { user.id &&
        <div id="drawer">
          <Drawer/>
        </div>
        }
        { !user.id &&
        <div id="menu-placeholder"></div>
        }
      </div>
    </div>
    }
    </>
  );
}

export default Nav;
