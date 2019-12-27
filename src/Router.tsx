import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import homeChild from './pages/HomeChild'
import ModelView from './pages/ModelView'

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/homeChild/:id" component={homeChild} />
      <Route path="/modelview/:id" component={ModelView} />
      <Route path="/" render={() => <Redirect to="/home" />} />
    </Switch>
  </HashRouter>
)
