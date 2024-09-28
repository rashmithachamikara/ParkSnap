import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "./Dashboard.css";
import NavigationBar from './Navbar';
import Footer from './Footer';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Data for the bar chart (for days of the week)
  const dataLastWeek = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Traffic by Device',
        data: [200, 400, 600, 800, 1000, 1200, 1400],
        backgroundColor: ['#8884d8', '#82ca9d', '#FF6384', '#36A2EB', '#FFCE56', '#6a4fbf', '#23d876'],
      },
    ],
  };

  // Data for the bar chart (for hours of the day)
  const dataYesterday = {
    labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
    datasets: [
      {
        label: 'Traffic by Device',
        data: [100, 200, 300, 400, 500, 600, 700, 800],
        backgroundColor: ['#8884d8', '#82ca9d', '#FF6384', '#36A2EB', '#FFCE56', '#6a4fbf', '#23d876', '#fc4c9a'],
      },
    ],
  };

  // Common options for both charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Traffic by Device',
      },
    },
  };

  return (
    <div style={{ backgroundColor: '#0a042e', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <NavigationBar />
      <div style={{paddingTop: '40px', paddingBottom: '70px'}}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#e7008a' }}>Dashboard</h1>

        {/* Last Week Section */}
        <div style={{ padding: '20px', textAlign: 'center', marginBottom: '50px' }}>
          <h2>last week</h2>
          <p>Number of reservations per day</p>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={dataLastWeek} options={options} />
          </div>
        </div>

        {/* Yesterday Section */}
        <div style={{ textAlign: 'center' }}>
          <h2>Yesterday</h2>
          <p>Number of reservations per hour</p>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={dataYesterday} options={options} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
