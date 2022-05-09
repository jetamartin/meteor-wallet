import React, {useState, memo} from "react";
import {ContactsCollection} from "../api/ContactsCollection";
import { useSubscribe, useFind} from 'meteor/react-meteor-data';
import { SuccessAlert } from "./components/SuccessAlert";
import { ErrorAlerts } from "./components/ErrorAlerts";

export const ContactList = () => {
  const isLoading = useSubscribe('allContacts');
  const contacts = useFind(() => ContactsCollection.find({}, { sort: { createdAt: -1 }}));
  const [error, setError] = useState("");
  const [success, setSuccess ] = useState("");

  const showError = ({ message }) => {
    setError(message);
    setTimeout(() => {
      setError("")
    }, 4000);
  }

  const showSuccess = ({ message }) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess("")
    }, 4000);
  }

  const removeContact = (e, _id) => {
    e.preventDefault(); 
    Meteor.call('contacts.remove', {contactId: _id}, (error) => {
      if (error) {
        showError({message: error.message} );
      } else {
        showSuccess({ message: "Contact was deleted" });
      }
    });
  }

  const ContactItem = memo(({contact}) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
      <div className="min-w-0 flex-1 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={contact.imageURL} alt="" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{contact.username}</p>
          <p className="text-sm font-medium text-gray-500 truncate">{contact.email}</p>
        </div>
        <div>
          <a href='#' 
            onClick={(e) => removeContact(e, contact._id)}
            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
          >
            Remove
          </a>
        </div>
      </div>
    </li>
    )
  });

  if(isLoading()) {
      return (
        <div>
          <div className="mt-10">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Loading...
            </h3>
          </div>
        </div>
      )
    return <p>Loading....</p>
  }

  return (
    <div>
      { error && <ErrorAlerts message={error} />}
      { success && <SuccessAlert message={success} />}

      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact}  />
          ))}
        </ul>
      </div>
    </div>
  )
}