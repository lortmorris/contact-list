import React from 'react';
import { Button } from 'react-bootstrap';

import propTypes from './props';

const ContactListItem = ({
  name,
  lastname,
  email,
  phone,
  _id,
  removeContact,
}) => (
  <tr>
    <td>{_id}</td>
    <td>{name}</td>
    <td>{lastname}</td>
    <td>{email}</td>
    <td>{phone}</td>
    <td>
      <Button variant="danger" onClick={() => removeContact(_id)}>Delete</Button>
    </td>
  </tr>
);

ContactListItem.propTypes = propTypes;

export default ContactListItem;
