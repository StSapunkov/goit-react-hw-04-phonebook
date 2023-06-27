import { useState } from 'react';
import { GlobalStyle } from './Layout/GlobalStyle';
import { Container } from './Layout/Container.styled';
import { Filter } from './Contacts/ContactFilter/Filter';
import { ContactForm } from './Contacts/ContactForm/ContactForm';
import { ContactList } from './Contacts/ContactList/ContactList';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addNewContacts = (newContact, { action }) => {
    const duplicateName = contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    return (
      duplicateName
        ? alert(`${newContact.name} is already in contacts.`)
        : setContacts(prevContacts => [...prevContacts, newContact]),
      action.resetForm()
    );
  };

  const onDeleteContacts = id => {
    setContacts(prevContacts => prevContacts.filter(el => el.id !== id));
  };

  const changeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const getVisibleContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContact()}
        deleteContact={onDeleteContacts}
      />
      <GlobalStyle />
    </Container>
  );
};