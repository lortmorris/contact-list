import React from 'react';
import {
  Form,
  Col,
  Button,
} from 'react-bootstrap';

import { composePure, withState } from '../../utils/composepure';
import propTypes from './props';

const AddNewContact = ({
  name,
  lastname,
  email,
  phone,
  setName,
  setLastName,
  setEmail,
  setPhone,
  addNewContact,
}) => (
  <form
    onSubmit={(evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      addNewContact({
        name,
        lastname,
        email,
        phone,
      });
      setName('');
      setLastName('');
      setEmail('');
      setPhone('');
    }}
    method="get"
  >
    <Form.Row>
      <Col>
        <Form.Control value={name} onChange={evt => setName(evt.target.value)} placeholder="First name" />
      </Col>
      <Col>
        <Form.Control value={lastname} onChange={evt => setLastName(evt.target.value)} placeholder="Last name" />
      </Col>
      <Col>
        <Form.Control value={email} onChange={evt => setEmail(evt.target.value)} placeholder="E-Mail" type="email" />
      </Col>
      <Col>
        <Form.Control value={phone} onChange={evt => setPhone(evt.target.value)} placeholder="Phone" type="phone" />
      </Col>
      <Col>
        <Button variant="outline-primary" type="submit">Add +</Button>
      </Col>
    </Form.Row>
  </form>
);

AddNewContact.propTypes = propTypes;

export default composePure(
  withState('name', 'setName', ''),
  withState('lastname', 'setLastName', ''),
  withState('email', 'setEmail', ''),
  withState('phone', 'setPhone', ''),
)(AddNewContact);
