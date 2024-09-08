import React, { useState, useEffect } from 'react';

import './App.css'


function App(){

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      // Fetch location data from API
      const fetchLocations = async () => {
          try {
              const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20'); // Replace with your API endpoint
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setLocations(data);
          } catch (error) {
              setError(error);
          } finally {
              setLoading(false);
          }
      };

      fetchLocations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  

  return(
    <>

     <div  className='main-flex'>
          <h1 className='main-headig'>
            Weather Forecast Web Application
          </h1>
           
          <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Timezone</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location, index) => (
                        <tr key={index}>
                        <td>{location.fields.name}</td>
                        <td>{location.fields.cou_name_en}</td>
                        <td>{location.fields.timezone}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        

           
                    
          
      </div>
    
    </>

  )
}

export default App