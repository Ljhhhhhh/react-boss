import React, { Component } from 'react';
import Logo from '../../compontent/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user'
import {iForm} from '../../compontent/i-form'
const RadioItem = Radio.RadioItem;


class Register extends Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister() {
    const data = this.props.form.getFieldsValue()
    console.log({...data, type: this.props.state.type}, 'data')
    this.props.register({...data, type: this.props.state.type})
  }
  
  render() {
    const { getFieldProps } = this.props.form;
    const handleValue = this.props.handleValue;
    const type = this.props.state.type;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
        <Logo/>
      <h2 className="title-page">注册</h2>
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem {...getFieldProps('user')}>用户名</InputItem>
            <InputItem type="password" {...getFieldProps('pwd')}>密码</InputItem>
            <InputItem type="password" {...getFieldProps('repeatpwd')}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem onChange={() => handleValue('type', 'genius')} checked={type === 'genius'}>牛人</RadioItem>
            <RadioItem onChange={() => handleValue('type', 'boss')} checked={type === 'boss'}>BOSS</RadioItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleRegister}  type="primary">注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => state.user,
  {register}
)(createForm()(iForm(Register)));
