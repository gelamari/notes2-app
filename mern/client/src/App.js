import React, { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("items"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    //returns a new array without the note that has the passed in id
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("");
  const [state, setState] = useState("");

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  //States
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [status, setStatus] = useState(null);

  const formatLocation = (num, type) => {
    if (type === 'lat') {
      if (num > 0) {
        //north
        return num + "\u{00B0} N";
      } else {
        //south
        return Math.abs(num) + "\u{00B0} S";
      }
    }
    else {
      if (num > 0) {
        //north
        return num + "\u{00B0} E";
      } else {
        //south
        return Math.abs(num) + "\u{00B0} W";
      }
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("geo not working");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setStatus(null);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          setLat(position.coords.latitude.toFixed(2));
          setLong(position.coords.longitude.toFixed(2));
        },
        () => {
          setStatus("Unable to retrieve");
        }
      );
    }
  };

  
  const [apiMapData, setApiMapData] = useState({});

  const apiMap = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&addressdetails=1`


  // Side effect
  useEffect(() => {
    fetch(apiMap)
      .then((res) => res.json())
      .then((data) => setApiMapData(data));
  }, [apiMap]);


  const getCity = () => {
    console.log(apiMapData.geoname.name);
  }

  return (
    //if darkmode = true then add the classs darkMode
    <div className={`${darkMode && "darkMode"}`}>
      <div className="container">
        <Header toggleDarkModeHandler={setDarkMode} />
        <Search searchHandler={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>
        <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
          {apiData.main ? (
            <div className="card-body text-center">
              <p className="h2">
                {kelvinToFarenheit(apiData.main.temp)}&deg; C
              </p>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div>
          <button onClick={getLocation}>Get Location</button>

          <h1>Coordinates</h1>
          <p>{status}</p>
          {lat && <p>Latitude: {formatLocation(lat, "lat")}</p>}
          {long && <p>Longitude: {formatLocation(long, "long")}</p>}
          {getCity}
        </div>
      </div>
    </div>
  );
};
export default App;
