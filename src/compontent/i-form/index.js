import React, {Component} from 'react'

export function iForm(Comp) {
  return class WrapperComp extends Component{
    constructor(props) {
      super(props)
      this.state = {}
      this.handleValue = this.handleValue.bind(this)
    }

    handleValue(field, value) {
      this.setState({
        [field]: value
      })
    }

    render() {
      return <Comp handleValue={this.handleValue} state={this.state} {...this.props} />
    }
  }
}