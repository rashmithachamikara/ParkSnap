import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTable, usePagination } from 'react-table';
import axiosInstance from '../axiosInstance'; // Adjust the import path as needed
import "./Dashboard.css";
import NavigationBar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reservationsLastWeek, setReservationsLastWeek] = useState({
    Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
  });
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // Track the week offset

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'ROLE_ADMIN') {
      setIsAdmin(true);
      fetchContactRequests();
    }
    fetchReservationsLastWeek(currentWeekOffset);
  }, [currentWeekOffset]);

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

  const fetchReservationsLastWeek = async (weekOffset) => {
    try {
      const weekStart = moment().startOf('isoWeek').add(weekOffset, 'weeks').format('YYYY-MM-DD'); // Get Monday of the selected week
      const response = await axiosInstance.get(`/api/v1/reservation/countByWeek?weekStart=${weekStart}`);
      const data = response.data;

      // Update the state with the response data
      setReservationsLastWeek({
        Monday: data.Monday || 0,
        Tuesday: data.Tuesday || 0,
        Wednesday: data.Wednesday || 0,
        Thursday: data.Thursday || 0,
        Friday: data.Friday || 0,
        Saturday: data.Saturday || 0,
        Sunday: data.Sunday || 0,
      });
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  // Handle week navigation
  const maxWeeksBefore = 20; // Maximum number of weeks to display before the current week

  const handleNextWeek = () => {
    if (currentWeekOffset < 0) {
      setCurrentWeekOffset(currentWeekOffset + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeekOffset > -maxWeeksBefore) {
      setCurrentWeekOffset(currentWeekOffset - 1);
    }
  };


  const getWeekRange = (weekOffset) => {
    const startOfWeek = moment().startOf('isoWeek').add(weekOffset, 'weeks').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('isoWeek').add(weekOffset, 'weeks').format('YYYY-MM-DD');
    return `${startOfWeek} - ${endOfWeek}`;
  };


  // Data for the bar chart (for days of the week)
  const dataLastWeek = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Reservations',
        data: [
          reservationsLastWeek.Monday,
          reservationsLastWeek.Tuesday,
          reservationsLastWeek.Wednesday,
          reservationsLastWeek.Thursday,
          reservationsLastWeek.Friday,
          reservationsLastWeek.Saturday,
          reservationsLastWeek.Sunday
        ],
        backgroundColor: '#740182',
        // backgroundColor: ['#8884d8', '#82ca9d', '#FF6384', '#36A2EB', '#FFCE56', '#6a4fbf', '#23d876', '#fc4c9a'],
      },
    ],
  };

  // Data for the bar chart (for hours of the day)
  const dataYesterday = {
    labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
    datasets: [
      {
        label: 'Traffic by Day',
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
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Ensure each tick is spaced by 1
          callback: function (value) {
            // Display only whole numbers
            return Number.isInteger(value) ? value : null;
          }
        }
      }
    }
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
          <h2>Weekly Report</h2>
          <p>Number of reservations per day</p>

          {/* Display only the current and past week ranges */}
          <div style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
            <p>{getWeekRange(currentWeekOffset)} {(currentWeekOffset === 0) ? (<>(This week)</>) : (<>({Math.abs(currentWeekOffset)} weeks before)</>)}</p>
          </div>

          <div className='chart-box' style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={dataLastWeek} options={options} />
          </div>

          {/* Week navigation buttons */}
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={handlePreviousWeek} disabled={currentWeekOffset === (maxWeeksBefore*-1)} style={{ marginRight: '10px' }}>
              Previous Week
            </button>
            <button className="btn btn-primary" onClick={handleNextWeek} disabled={currentWeekOffset === 0}>
              Next Week
            </button>
          </div>
        </div>


        {/* Yesterday Section */}
        <div className='hide' style={{ textAlign: 'center' }}>
          <h2>Yesterday</h2>
          <p>Number of reservations per hour</p>
          <div className='chart-box' style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={dataYesterday} options={options} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
