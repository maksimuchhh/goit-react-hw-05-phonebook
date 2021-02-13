import React, { Component } from "react";
import Section from "./components/Section";
import Input from "./components/Form/Input";
import Form from "./components/Form";
import List from "./components/List";
import { CSSTransition } from "react-transition-group";
import styles from "./App.module.css";
import { v4 as uuidv4 } from "uuid";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    if (!localStorage.getItem("contacts")) return;
    this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
  }
  changeInput = (evt) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [evt.target.id]: evt.target.value,
      };
    });
  };
  deleteContact = (idOfEl) => {
    this.setState((prevState) => {
      prevState.contacts.find((el, index, arr) => {
        if (el.id === idOfEl) {
          arr.splice(index, 1);
          return true;
        } else {
          return false;
        }
      });
      return {
        ...prevState,
        contacts: [...prevState.contacts],
      };
    });
  };

  addContact = (evt, state) => {
    console.log(this.state);
    evt.preventDefault();
    this.setState((prevState) => {
      const id = uuidv4();
      const name = state.name;
      const number = state.number;
      if (!name) return;
      const dublicated = prevState.contacts.find((el) => {
        return el.name === name;
      });
      if (!(dublicated === undefined)) {
        this.setState({ error: `You already add ${name}` });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
        return;
      } else {
        return {
          ...prevState,
          contacts: [
            ...prevState.contacts,
            {
              id: id,
              name: name,
              number: number,
            },
          ],
        };
      }
    });
  };
  render() {
    return (
      <div className={styles.container}>
        <CSSTransition
          in={this.state.error !== null}
          timeout={300}
          classNames={styles}
          unmountOnExit
        >
          <div className={styles.error}>{this.state.error}</div>
        </CSSTransition>

        <CSSTransition
          in={true}
          timeout={500}
          appear={true}
          classNames={styles}
          unmountOnExit
        >
          <h1>Phonebook</h1>
        </CSSTransition>
        <Form addContact={this.addContact} />
        {this.state.contacts.length > 0 && (
          <Section title="Contacts">
            <Input
              name="filter"
              isOpen={this.state.contacts.length > 1}
              changeInputForFilter={this.changeInput}
            />

            <List
              contacts={this.state.contacts}
              filter={this.state.filter}
              deleteContact={this.deleteContact}
            />
          </Section>
        )}
      </div>
    );
  }
}

export default App;
