import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1];
    // return arr[0]
  }
  render() {
    const msgGroup = {};
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;
    this.props.chat.chatmsg.forEach(v => {
      // msgGroup[v.chatid] = msgGroup[v.chatid] || []
      if (!msgGroup[v.chatid]) {
        msgGroup[v.chatid] = [];
      }
      msgGroup[v.chatid].push(v);
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userid ? v[0].to : v[0].from;
          const unreadNum = v.filter(v => !v.read && v.to === userid).length
          if (!userinfo[targetId]) return null;
          const {avatar, name} = userinfo[targetId]
          return (
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unreadNum} /> }
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
                thumb={require(`../../static/img/${avatar}.png`)}>
                <Brief>{name}</Brief>
                {lastItem.content}
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default connect(state => state)(Msg);
