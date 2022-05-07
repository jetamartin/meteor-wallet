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
    <form className="mt-6" onSubmit={handleSubmit} >
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input 
          id="name" name="name"
          type="text" 
          value={ formData.name }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={ handleChange }/>
      </div>

      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          value={ formData.email } 
          onChange={ handleChange }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          ImageURL
        </label>
        <input 
          id="imageURL" 
          name="imageURL" 
          type="text" 
          value={ formData.imageURL } 
          onChange={ handleChange }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      </div>

      <div className="px-2 py-3 text-right">
        <button 
          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Save Contact</button>
      </div>
    </form>
  );
}