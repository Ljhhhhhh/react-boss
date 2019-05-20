import React, { Component } from 'react';
import Logo from '../../compontent/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user'

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    const data = this.props.form.getFieldsValue()
    this.props.login(data)
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null }
        <Logo/>
        <h2 className="title-page">登录</h2>
        <WingBlank>
          <List>
            <InputItem {...getFieldProps('user')}>用户名</InputItem>
            <InputItem type="password" {...getFieldProps('pwd')}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleLogin}  type="primary">登录</Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => state.user,
  {login}
)(createForm()(Login));
