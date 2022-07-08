import React, { useEffect, useState } from 'react';
import DashCard from './DashCard';
import RecentOrders from './RecentOrders';
import './App.css';

function App() {

  const api = 'https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders';
  const [data, setData] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(api, {
      headers: {
        authorization: `Bearer ${API_KEY}`
    }})
      .then(res => res.json())
      .then(data => setData(data.records))
      .catch(err => console.log(err));
  }, [API_KEY]);

 const getMonth = new Date().getMonth().toString();
 const thisMonth = getMonth.length === 1 ? `0${getMonth}` : getMonth;

  const calculateTotalOrders = () => {
    let total = 0;
    data.forEach(order => {
      total += 1;
    })
    return total;
  }

  const calculateTotalOrdersThisMonth = () => {
    let total = 0;
    data.forEach(order => {
      if (order.fields.order_placed.includes(`-${thisMonth}-`)) {
        total += 1;
      }
    })
    return total;
  }

  const calculateOrdersInProgress = () => {
    let total = 0;
    data.forEach(order => {
      if (order.fields.order_status === 'in_progress') {
        total += 1;
      }
    })
    return total;
  }

  const calculateRevenue = () => {
    let total = 0;
    data.forEach(order => {
      total += order.fields.price;
    })
    return total.toFixed(2);
  }

  return (
    <div className="App">
      <header className="App-header">
        Purrfect Creations Sales Dashboard
      </header>
      <div className='dashboard'>
        <div className='dashboard-cards'>
          <DashCard title='Revenue' value={`£` + calculateRevenue()} />
          <DashCard title='Total Orders' value={calculateTotalOrders()} />
          <DashCard title='Total Orders This Month' value={calculateTotalOrdersThisMonth()} />
          <DashCard title='Orders In Progress' value={calculateOrdersInProgress()} />
        </div>
        <RecentOrders data={data.slice(-5)} />
      </div>
    </div>
  );
}

export default App;