import React, { useEffect, useState } from 'react';

const MyBoards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM5NDI0OTkwMSwiYWFpIjoxMSwidWlkIjo2NDQxNTkwNywiaWFkIjoiMjAyNC0wOC0wN1QxNjoxMzozMS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQ3NzgxNjcsInJnbiI6InVzZTEifQ.kOtqQcQufGYHlWh8aDYwlEgGuD86rRV_TJ0unU0T5gM'
      },
      body: JSON.stringify({
        query: `
          query {
            boards {
                groups {
      title
      id
    }
              id
              name
              items_page {
                items {
                  id
                  name
                  column_values {
                    id
                    value
                    type
                  }
                }
              }
            }
          }
        `
      })
    })
    .then(response => response.json())
    .then(data => setBoards(data.data.boards))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {boards.map(board => (
        <div key={board.id}>
          <h2>{board.name} (ID: {board.id})</h2>
          <ul>
            {board.items_page.items.map(item => (
              <li key={item.id}>
                <h3>{item.name} (ID: {item.id})</h3>
                <ul>
                  {item.column_values.map(column => (
                    <li key={column.id}>{column.type}: {column.value}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyBoards;