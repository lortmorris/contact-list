import React from 'react';
import {
  Row,
  Col,
  Table,
} from 'react-bootstrap';

import propTypes from './props';

import ContactListItem from '../ContactListItem';

const ContactsList = ({
  contacts,
  removeContact,
}) => (
  <Row>
    <Col>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-Mail</th>
            <th>Phone</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(cl => (
            <ContactListItem
              {...cl}
              key={cl._id}
              removeContact={removeContact}
            />
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
);

ContactsList.propTypes = propTypes;
export default ContactsList;
