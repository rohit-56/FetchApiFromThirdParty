import React, { useState, useEffect } from "react";
import axios from "axios";

function Form(props) {
  const mystyle = {
    width: "800px",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const [countries, getCountries] = useState([]);
  const [states, getStates] = useState([]);
  const [cities, getCities] = useState([]);
  const [currentValue, setCurrentValue] = useState({
    country: "Select your Country",
    iso2: "",
    state: "Select your State",
    city: "Select your City",
  });

  var config = {
    method: "get",
    url: "https://api.countrystatecity.in/v1/countries",
    headers: {
      "X-CSCAPI-KEY":
        "VDM3NjNheVVxd0FFTGw0TnhqaGtKVkdKa2NqV2ZndjJxOEhqQTFCYQ==",
    },
  };
  const usethisfunc = async () => {
    await axios(config)
      .then((response) => {
        getCountries(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var config1 = {
    method: "get",
    url:
      "https://api.countrystatecity.in/v1/countries/" +
      currentValue.iso2 +
      "/states",
    headers: {
      "X-CSCAPI-KEY":
        "VDM3NjNheVVxd0FFTGw0TnhqaGtKVkdKa2NqV2ZndjJxOEhqQTFCYQ==",
    },
  };

  const usethisfunctogetStates = async () => {
    await axios(config1)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getStates(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var config2 = {
    method: "get",
    url:
      "https://api.countrystatecity.in/v1/countries/" +
      currentValue.iso2 +
      "/cities",
    headers: {
      "X-CSCAPI-KEY":
        "VDM3NjNheVVxd0FFTGw0TnhqaGtKVkdKa2NqV2ZndjJxOEhqQTFCYQ==",
    },
  };

  const usethisfunctogetCities = async () => {
    await axios(config2)
      .then((response) => {
        getCities(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    usethisfunc();
  }, []);

  let listofCountry = countries.map((value) => {
    return (
      <option key={value.id}>
        {value.name} ({value.iso2})
      </option>
    );
  });
  let listofStates = states.map((value) => {
    return <option key={value.id}>{value.name}</option>;
  });
  let listofCities = cities.map((value) => {
    return <option key={value.id}>{value.name}</option>;
  });

  const changeCountry = (e) => {
    var arrayOfValue = e.target.value.split(" ");
    console.log(arrayOfValue);
    setCurrentValue({
      country: e.target.value,
      iso2: arrayOfValue[1].substring(1, 3),
      state: currentValue.state,
      city: currentValue.city,
    });
    console.log(currentValue.iso2);
  };
  const changeState = (e) => {
    setCurrentValue({
      country: currentValue.country,
      iso2: currentValue.iso2,
      state: e.target.value,
      city: currentValue.city,
    });
  };
  const changeCity = (e) => {
    setCurrentValue({
      country: currentValue.country,
      iso2: currentValue.iso2,
      state: currentValue.state,
      city: e.target.value,
    });
  };
  return (
    <>
      <form style={mystyle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Employee ID
          </label>
          <input type="text" className="form-control" id="emp_id" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Employee Name
          </label>
          <input type="text" className="form-control" id="emp_name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 d-flex flex-row">
          <input
            type="text"
            className="form-control"
            id="country"
            value={currentValue.country}
          />
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Country
            </button>
            <select
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              onClick={changeCountry}
            >
              {listofCountry}
            </select>
          </div>
        </div>
        <div className="mb-3 d-flex flex-row">
          <input
            type="text"
            className="form-control"
            id="country"
            value={currentValue.state}
          />
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={usethisfunctogetStates}
            >
              Select State
            </button>
            <select
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              onClick={changeState}
            >
              {listofStates}
            </select>
          </div>
        </div>
        <div className="mb-3 d-flex flex-row">
          <input
            type="text"
            className="form-control"
            id="country"
            value={currentValue.city}
          />
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={usethisfunctogetCities}
            >
              Select City
            </button>
            <select
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              onClick={changeCity}
            >
              {listofCities}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
