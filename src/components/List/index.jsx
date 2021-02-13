import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import Button from "../Form/Button";
import "./List.css";

const List = ({ contacts, filter, deleteContact }) => {
  if (filter.length > 0) {
    contacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  return (
    <TransitionGroup component="ul">
      {contacts.map((el) => {
        return (
          <CSSTransition key={el.id} timeout={250} classNames="item">
            <li>
              <span>{el.name}</span>: <span>{el.number} </span>
              <Button deleteContact={deleteContact} text="Delete" id={el.id} />
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

List.propTypes = {
  names: PropTypes.arrayOf(PropTypes.object),
};

export default List;
