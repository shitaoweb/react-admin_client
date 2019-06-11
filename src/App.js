import React from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'

import { Button, message } from 'antd'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
