// Compound Components

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}

  static On = (props) => (props.on ? props.children : null)
  static Off = (props) => (props.on ? null : props.children)
  static Button = ({on, toggle}) => (
    <Switch on={on} onClick={toggle} />
  )

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )

  render() {
    return React.Children.map(
      this.props.children,
      (childrenElement) => {
        return React.cloneElement(childrenElement, {
          on: this.state.on,
          toggle: this.toggle,
        })
      },
    )
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
