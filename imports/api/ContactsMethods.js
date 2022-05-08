import { ContactsCollection } from "./ContactsCollection";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check"; 
Meteor.methods({
  "contacts.insert"({ username, email, imageURL }) {
      check(username, String)
      check(email, String)
      check(imageURL, String)    
      if (!username ) {
        throw new Meteor.Error("inputError", "Username is required field");
       }
    return ContactsCollection.insert({
      username,
      email,
      imageURL,
      createdAt: new Date(),
    });
  },
  'contacts.remove'({ contactId }) {
    check(contactId, String)
    return ContactsCollection.remove(contactId);
  }
});
