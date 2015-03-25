import Alt from '../dist/alt-with-runtime'
import React from 'react/addons'
import StoreListenerComponent from '../components/StoreListenerComponent'
import { assert } from 'chai'
import { jsdom } from 'jsdom'

const { TestUtils } = React.addons

export default {
  'StoreListenerComponent': {
    beforeEach() {
      global.document = jsdom('<!doctype html><html><body></body></html>');
      global.window = global.document.parentWindow;
      global.navigator = global.window.navigator;
    },

    afterEach() {
      delete global.document
      delete global.window
      delete global.navigator
    },

    'mock render an element'() {
      const alt = new Alt()

      const action = alt.generateActions('sup')

      const foo = alt.createStore({
        displayName: 'foo',

        bindListeners: {
          lol: action.sup
        },

        state: { x: null },

        lol(x) {
          this.state.x = x
        }
      })

      const div = document.createElement('div')
      const tree = React.render(
        <StoreListenerComponent stores={{ Foo: foo }}>
          <div />
        </StoreListenerComponent>
      , div)

      action.sup('hello')

      assert(tree.state.Foo.x === 'hello')

      React.unmountComponentAtNode(div)

      const many = TestUtils.renderIntoDocument(
        <StoreListenerComponent stores={{ Foo: foo }}>
          <div />
          <div />
          <div />
          <div />
        </StoreListenerComponent>
      )
    },
  }
}
