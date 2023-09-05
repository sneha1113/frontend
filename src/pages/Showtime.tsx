import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/showtime.css';

interface Showtime {
  _id: string;
  theatre: {
    _id: string;
    theatreName: string;
    theatreLocation: string;
  };
  showtime: string;
}

function Showtime() {
  const { movieName } = useParams<{ movieName: string }>();
  const [selectedDate, setSelectedDate] = useState<string>('01/09/2023'); // Default date
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);

  useEffect(() => {

    axios
      .get(`https://movie-lcnz.onrender.com/movie/${movieName}?date=${selectedDate}`)
      .then((response) => {
        if (response.data.length > 0) {
          setShowtimes(response.data);
        } else {
          setShowtimes([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching showtimes:', error);
      });
  }, [selectedDate, movieName]);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const dateOptions: string[] = [];
  const startDate = new Date('08/31/2023');
  const endDate = new Date('09/05/2023');

  while (startDate <= endDate) {
    const formattedDate = startDate.toLocaleDateString('en-GB');
    dateOptions.push(formattedDate);
    startDate.setDate(startDate.getDate() + 1);
  }

  const groupShowtimesByTheatre = () => {
    const groupedShowtimes: Record<string, string[]> = {};

    showtimes.forEach((showtime) => {
      const theatreName = showtime.theatre.theatreName;
      const showtimeStr = showtime.showtime;

      if (!groupedShowtimes[theatreName]) {
        groupedShowtimes[theatreName] = [];
      }

      groupedShowtimes[theatreName].push(showtimeStr);
    });

    return groupedShowtimes;
  };

  const groupedShowtimes = groupShowtimesByTheatre();

  return (
    <div className="showtime-container">
    <h1 className="showtime-header">Showtime for {movieName}</h1>
    <div className="date-selection-container">
      <label className="showtime-date-label">Select Date:</label>
      <select
        value={selectedDate}
        onChange={handleDateChange}
        className="showtime-date-select"
      >
        {dateOptions.map((dateOption) => (
          <option key={dateOption} value={dateOption}>
            {dateOption}
          </option>
        ))}
      </select>
    </div>
    <div className="showtime-cards">
      {Object.keys(groupedShowtimes).map((theatreName) => (
        <div className="showtime-card" key={theatreName}>
          <h2 className="theatre-title">{theatreName}</h2>
          <p className="showtime-list">
            Showtimes:{' '}
            {groupedShowtimes[theatreName].map((showtimeStr, index) => (
              <Link
                key={index}
                to={`/classseats?showtime=${showtimeStr}`} 
                className="showtime-button"
              >
                {showtimeStr}
              </Link>
            ))}
          </p>
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default Showtime;
