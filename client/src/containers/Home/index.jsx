import React from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Modal,
  Button,
} from 'react-bootstrap';

import {
  composePure,
  withInit,
  withState,
  withHandlers,
} from '../../utils/composepure';
import Actions from '../../actions';

import propTypes from './props';

import AddNewContact from '../../components/AddNewContact';
import ContactsList from '../../components/ContactsList';

const Home = ({
  contacts,
  addNewContact,
  showModal,
  setShowModal,
  removeContact,
  removeId,
  removeContactFetch,
}) => (
  <Container>
    <h1>Contact Lists</h1>
    <AddNewContact
      addNewContact={addNewContact}
    />
    <ContactsList
      contacts={contacts}
      removeContact={removeContact}
    />

    <Modal
      size="sm"
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }
    }
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Remove contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
        <br />
        <Button
          variant="danger"
          onClick={() => {
            setShowModal(false);
            removeContactFetch(removeId);
          }}
        >
          Confirm
        </Button>
      </Modal.Body>
    </Modal>
  </Container>
);

Home.propTypes = propTypes;

export default composePure(
  connect(
    state => ({
      contacts: state.Contacts.docs,
    }),
    dispatch => ({
      fetchContacts: () => {
        dispatch(Actions.Universal.fetch(
          'contacts',
          {
            query: {
              page: 1,
              limit: 100,
            },
            dispatchAction: 'SET_CONTACTS_LIST_DOCS',
          },
          'services',
        ));
      },
      removeContactFetch: (_id) => {
        dispatch(Actions.Universal.remove(
          'contacts',
          {
            query: {
              _id,
            },
            dispatchAction: 'REMOVE_CONTACT',
          },
          'services',
        ));
      },
      addNewContact: (data) => {
        dispatch(Actions.Universal.insert(
          'contacts',
          {
            data,
            dispatchAction: 'ADD_NEW_CONTACT',
          },
          'services',
        ));
      },
    }),
  ),
  withState('showModal', 'setShowModal', false),
  withState('removeId', 'setRemoveId', null),
  withHandlers({
    removeContact: ({ setShowModal, setRemoveId }) => (id) => {
      setShowModal(true);
      setRemoveId(id);
    },
  }),
  withInit(['_'], ({ fetchContacts }) => {
    fetchContacts();
  }),
)(Home);
