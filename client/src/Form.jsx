import React, { useState } from 'react';

const FragrenceForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fragrance, setFragrance] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fragrance.join(', '))
    const query = `
      mutation {
        create_item (
          board_id: 7175246301,
          group_id: "topics",
          item_name: "${firstName} ${lastName}",
        ) {
          id
        }
      }
    `;

    fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM5NDI0OTkwMSwiYWFpIjoxMSwidWlkIjo2NDQxNTkwNywiaWFkIjoiMjAyNC0wOC0wN1QxNjoxMzozMS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQ3NzgxNjcsInJnbiI6InVzZTEifQ.kOtqQcQufGYHlWh8aDYwlEgGuD86rRV_TJ0unU0T5gM'
      },
      body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </label>
      <label>
        Fragrance:
        <select multiple value={fragrance} onChange={e => setFragrance(Array.from(e.target.selectedOptions, option => option.value))}>
          <option value="Vanilla">Vanilla</option>
          <option value="Lavender">Lavender</option>
          <option value="Rose">Rose</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FragrenceForm;