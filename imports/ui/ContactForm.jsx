import React, {useState} from 'react'
import { ContactsCollection } from '../api/ContactsCollection'

export const ContactForm  = () => {

  const INITIAL_STATE = {
    name: "", 
    email: "",
    imageURL: ""
  }

  const [ formData, setFormData ] = useState(INITIAL_STATE)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData( data => ({
      ...data, 
      [name] : value,
    }))
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    ContactsCollection.insert(formData)
    setFormData(INITIAL_STATE);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name
        </label>
        <input id="name" name="name" type="text" value={ formData.name } onChange={ handleChange }/>
      </div>

      <div>
        <label htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" value={ formData.email } onChange={ handleChange } />
      </div>

      <div>
        <label htmlFor="imageURL">
          ImageURL
        </label>
        <input id="imageURL" name="imageURL" type="text" value={ formData.imageURL } onChange={ handleChange } />
      </div>

      <div>
        <button >Save Contact</button>
      </div>
    </form>
  );
}