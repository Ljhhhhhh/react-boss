import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user'
import AvatarSelect from '../../compontent/avatar-select'

class BossInfo extends Component {
  constructor(props) {
    super(props)
    this.selectAvatar = this.selectAvatar.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
  }
  selectAvatar(avatar) {
    this.setState({
      avatar
    })
  }
  updateInfo() {
    const data = this.props.form.getFieldsValue()
    this.props.update({...data, avatar: this.state.avatar})
  }
  render() {
    const { getFieldProps } = this.props.form;
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">完善信息</NavBar>
        <AvatarSelect selectAvatar={this.selectAvatar} />
        <InputItem {...getFieldProps('title')}>招聘职位</InputItem>
        <InputItem {...getFieldProps('company')}>公司名称</InputItem>
        <InputItem {...getFieldProps('money')}>职位薪资</InputItem>
        <TextareaItem {...getFieldProps('desc')} rows={3} autoHeight title="职位要求" />
        <Button type="primary" onClick={this.updateInfo}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => state.user,
  {update}
)(createForm()(BossInfo))
