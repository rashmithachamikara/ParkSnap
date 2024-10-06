import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTable, usePagination } from 'react-table';
import axiosInstance from '../axiosInstance'; // Adjust the import path as needed
import "./Dashboard.css";
import NavigationBar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'ROLE_ADMIN') {
      setIsAdmin(true);
      fetchContactRequests();
    }
  }, []);

  const fetchContactRequests = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/contactForm/getAllcontactForms');
      const data = response.data;

      if (data.code === "00") {
        // Set the contact requests to the state, sorted by userCode (latest messages at the top)
        setContactRequests(data.content.sort((a, b) => b.userCode - a.userCode));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching contact requests:', error);
    }
  };

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

  // React Table configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'userName', // Accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'userEmail',
      },
      {
        Header: 'Phone',
        accessor: 'userPhone',
      },
      {
        Header: 'Message',
        accessor: 'userMessage',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    previousPage,
    nextPage,
  } = useTable(
    {
      columns,
      data: contactRequests,
      initialState: { pageSize: 10 }, // Set the default page size
    },
    usePagination // Use the usePagination plugin hook
  );

  return (
    <div className='dashboard' style={{ backgroundColor: '#0a042e', color: 'white' }}>
      <NavigationBar />
      <div style={{ paddingTop: '40px', paddingBottom: '70px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#e7008a' }}>Dashboard</h1>

        {/* Contact Requests Section - only for admins */}
        {isAdmin && (
          <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
            <h2>Contact Requests</h2>
            <table {...getTableProps()} className="table table-striped table-dark" style={{ margin: '0 auto', width: '80%' }}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={previousPage} disabled={!canPreviousPage} style={{ marginRight: '5px' }}>
                Previous
              </button>
              <button className="btn btn-primary" onClick={nextPage} disabled={!canNextPage}>
                Next
              </button>
            </div>
            <div style={{ marginTop: '10px' }}>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </div>
          </div>
        )}

        {/* Last Week Section */}
        <div style={{ padding: '20px', textAlign: 'center', marginBottom: '50px' }}>
          <h2>Last Week</h2>
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
