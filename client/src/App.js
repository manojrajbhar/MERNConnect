import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import './app.css'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const {isDarkMode} = useSelector((state) => state?.posts);
;

  return (
    <BrowserRouter>
      <Container maxWidth="xl" className={`${isDarkMode ? "dark-theme":"light-theme"}`}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
