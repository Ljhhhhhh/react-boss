import React from "react";
import { NavBar } from "antd-mobile";
import { Switch, Route } from "react-router-dom";
import {connect} from 'react-redux'
import { getMsgList, recvMsg } from "../../redux/chat";
import NavLinkBar from '../navlink'
import Boss from '../../views/boss/boss'
import Genius from '../../views/genius/genius'
import User from '../../views/user/user'
import Msg from '../../views/msg/msg'
import AuthRoute from "../authroute";

class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Genius,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "BOSS列表",
        component: Boss,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ];

    return (
      <div>
        <NavBar className="fixd-header" mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default connect(
  state => state,
  {getMsgList, recvMsg}
)(AuthRoute(Dashboard));
