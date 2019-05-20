import React from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component{
    static contextType = {
      store: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount() {
      const {store} = this.store
      this.update()
    }

    update() {
      const {store} = this.context
      const stateProps = mapStateToProps(state.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispath)
      this.setState({
        props: {
          ...stateProps,
          ...this.state.props
        }
      })
    }

    render() {
      return <WrapComponent {...this.state.props} />
    }
  }
}

export class Provider extends React.Component{
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {store: this.store}
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return this.props.children
  }
}