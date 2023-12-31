import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeRounded";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import decode from "jwt-decode";

import MERNConnect_logo from "../../images/MERNConnect_logo.jpg";
import MERNConnect from "../../images/MERNConnect.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const {isDarkMode} = useSelector((state) => state?.posts);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={MERNConnect}
          alt="icon"
          height="45px"
          className={classes.imageTitle}
        />
        <img
          className={classes.image}
          src={MERNConnect_logo}
          alt="icon"
          height="40px"
        />
      </Link>

      <Toolbar className={classes.toolbar}>
        {/* <Button
          size="medium"
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        >
        {isDarkMode ? "Dark" : "Light"}
        </Button> */}

        <Link to="/" className={classes.Navlist}>
          <Button color="primary" size="large">
            <HomeIcon fontSize="large" />
          </Button>
        </Link>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
