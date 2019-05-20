import React, { Component } from "react";
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile";
import { connect } from "react-redux";
import browserCookie from "browser-cookies";
import {logoutSubmit} from '../../redux/user'
import {Redirect} from 'react-router-dom'
import './fixbug.scss'

class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert
    alert("注销", "确认退出登录吗?", [
      {
        text: "取消",
        onPress: () => {
          console.log("cancel");
        }
      },
      {
        text: "确认",
        onPress: () => {
          browserCookie.erase('userid')
          this.props.logoutSubmit()
        }
      }
    ]);
  }

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;

    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../../static/img/${this.props.avatar}.png`)}
              style={{ width: 50 }}
              alt="avatar"
            />
          }
          title={props.user}
          message={props.type === "boss" ? props.company : null}
        />
        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {props.title}
            {this.props.desc.split("\n").map(v => (
              <Brief key={v}>{props.desc}</Brief>
            ))}
            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item>
            <Button type="primary" onClick={this.logout}>退出登录</Button>
          </Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />;
  }
}

export default connect(
  state => state.user,
  {logoutSubmit}
)(User);
