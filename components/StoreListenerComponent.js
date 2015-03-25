/**
 * StoreListenerComponent is like the component equivalent
 * of ReactStateMagicMixin.
 *
 * <StoreListenerComponent stores={{ }}>
 *   children
 * </StoreListenerComponent>
 */
var React = require('react/addons')
var Subscribe = require('../mixins/Subscribe')
var assign = require('object-assign')

var StoreListenerComponent = React.createClass({
  getInitialState: function () {
    return this.getStateFromStores()
  },

  componentDidMount: function () {
    var stores = this.props.stores

    Subscribe.create(this)

    Object.keys(stores).forEach(function (formatter) {
      Subscribe.add(this, stores[formatter], this.altSetState)
    }, this)
  },

  componentWillUnmount: function () {
    Subscribe.destroy(this)
  },

  getStateFromStores: function () {
    var stores = this.props.stores

    return Object.keys(stores).reduce(function (obj, key) {
      return obj[key] = stores[key].getState(), obj
    }, {})
  },

  altSetState: function () {
    this.setState(this.getStateFromStores())
  },

  render: function () {
    var children = this.props.children
    children = Array.isArray(children) ? children : [children]

    return React.createElement('div', null, children.map(function (child, i) {
      return React.addons.cloneWithProps(child, assign({ key: i }, this.state))
    }, this))
  }
})

module.exports = StoreListenerComponent
