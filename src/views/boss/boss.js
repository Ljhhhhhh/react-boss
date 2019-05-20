import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser'
import UserCard from '../../compontent/usercard'

class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    return <UserCard userlist={this.props.userlist} />
  }
}

export default connect(
  state => state.chatuser,
  {getUserList}
)(Boss);
