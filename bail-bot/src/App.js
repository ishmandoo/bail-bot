import logo from './logo.svg';
import './App.css';
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Container className="p-3 d-flex">
      <Container className="p-5 flex-row mb-4 bg-light rounded-3">
        <h1 className="header">BailBot</h1>
        <PhoneNumbers />
      </Container>
    </Container>

  );
}

class PhoneNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_numbers: [<Phone id={0} key={0} deletable={false} />],
      next_id: 1
    };
  }

  deleter = (i) => () => {
    console.log(this.state)
    this.setState({
      phone_numbers: this.state.phone_numbers.filter(
        number => number.props.id != i
      )
    })
  }

  add = () => {
    var id = this.state.next_id
    var new_number = <Phone id={id} key={id} deletable={true} delete={this.deleter(id)} />
    this.setState({
      phone_numbers: [...this.state.phone_numbers, new_number],
      next_id: id + 1
    })
    console.log(this.state)
  }

  render() {
    return (
      <ListGroup>
        {this.state.phone_numbers}
        < Button onClick={this.add} key="button" > Add</Button >
      </ListGroup >
    );
  }
}


class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phone: "" }
  }

  updateInputValue = (evt) => {
    const val = evt.target.value;
    // ...
    this.setState({
      inputValue: val
    });
  }

  render() {
    var button = (
      <Button onClick={this.props.delete}>  <span aria-hidden="true">&times;</span>
      </Button>
    )


    return (

      <InputGroup className="mb-3">
        {/* <PhoneInput
          placeholder="Enter phone number"
          value={this.state.phone}
          onChange={phone => this.setState({ phone })}
          country='us'
          regions={['north-america']} /> */}
        <input
          value={this.state.inputValue}
          onChange={evt => this.updateInputValue(evt)}
          type="text" id="UserMobile"
          maxlength="14"
          data-fv-numeric="true"
          data-fv-numeric-message="Please enter valid phone numbers"
          data-fv-phone-country11="IN"
          required="required"
          data-fv-notempty-message="This field cannot be left blank."
          placeholder="Mobile No. "
          className="form-control"
          name="data[User][mobile]"
          data-fv-field="data[User][mobile]" />

        {this.props.deletable ? button : null}
      </InputGroup >
    )
  }
}

export default App;
