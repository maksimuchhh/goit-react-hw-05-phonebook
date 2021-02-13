import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./Filter.css";

export class Input extends Component {
  render() {
    const {
      name,
      changeInputForFilter,
      changeInput,
      value,
      isOpen,
    } = this.props;
    const arr = [...name];
    arr.splice(0, 1, arr[0].toUpperCase());
    if (name === "filter") {
      return (
        <>
          <CSSTransition
            in={isOpen}
            timeout={250}
            classNames="label"
            unmountOnExit
          >
            <label htmlFor={name}>{arr}</label>
          </CSSTransition>
          <CSSTransition
            in={isOpen}
            timeout={250}
            classNames="form"
            unmountOnExit
          >
            <input
              onChange={name === "filter" ? changeInputForFilter : changeInput}
              type="text"
              id={name}
              value={value}
            />
          </CSSTransition>
        </>
      );
    } else {
      return (
        <>
          <label htmlFor={name}>{arr}</label>
          <input onChange={changeInput} type="text" id={name} value={value} />
        </>
      );
    }
  }
}

export default Input;
