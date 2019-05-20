import React, { Component } from 'react';
// import axios from "axios";
import {withRouter} from 'react-router-dom'
import browserCookie from "browser-cookies";
import {connect} from 'react-redux'
import {setUserinfo} from '../../redux/user'

// @withRouter
const AuthRoute =  function (Comp) {
  class WrapperComp extends Component {
    componentDidMount() {
      const publicList = ['/login', '/register']
      const pathname = this.props.location.pathname
      if (publicList.indexOf(pathname) > -1) {
        return null
      }
      const userid = browserCookie.get('userid');
      if (!userid) {
        this.props.history.push('/login')
      } else {
        if (!this.props.user.user) {
          this.props.setUserinfo()
        }
      }
    }
  
    render() {
      return <Comp {...this.props} />;
    }
  }
  return connect(
    state => state,
    {setUserinfo}
  )(withRouter(WrapperComp));
}

export default AuthRoute
