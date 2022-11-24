import { useState, useEffect } from 'react';
import Fullname from './formInputs/Fullname';
import ContactInfo from './formInputs/ContactInfo';
import SelectBarber from './formInputs/SelectBarber';
import SelectService from './formInputs/SelectService';
import DateTime from './formInputs/DateTime';

const Form = () => {
  // INPUT STATES
  const initialInputValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectservice: '',
    selectbarber: '',
    selecttime: '',
    selectdate: '',
  };

  const [formValues, setFormValues] = useState(initialInputValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOnFocus = () => {};

  // async (GET) API DATA
  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:5000/services');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Services data, ${error}`);
    }
  };
  const fetchBarbers = async () => {
    try {
      const res = await fetch('http://localhost:5000/barbers');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Barbers data, ${error}`);
    }
  };
  const fetchWorkHours = async () => {
    try {
      const res = await fetch('http://localhost:5000/workHours');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Work hours data, ${error}`);
    }
  };

  const [dbServices, setServices] = useState([]);
  const [dbBarbers, setBarbers] = useState([]);
  const [dbWorkHours, setWorkHours] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dbServices = await fetchServices();
      const dbBarbers = await fetchBarbers();
      const dbWorkHours = await fetchWorkHours();
      setServices(dbServices);
      setBarbers(dbBarbers);
      setWorkHours(dbWorkHours);
    };

    getData();
  }, []);

  // SUBMIT HANDLE
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book your appointment</h2>
      <div className="input-group full-name-wrapper">
        <Fullname handleChange={handleChange} />
      </div>
      <div className="input-group contact-wrapper">
        <ContactInfo handleChange={handleChange} />
      </div>
      <div className="input-group select-b-s">
        <SelectBarber dbBarbers={dbBarbers} handleChange={handleChange} />
        <SelectService dbServices={dbServices} handleChange={handleChange} />
      </div>
      <div className="input-group select-d-t">
        <DateTime handleChange={handleChange} />
      </div>
      <input className="input" placeholder="Select any service" disabled />
      <button className="btn-submit" type="submit">
        Book appointment
      </button>
    </form>
  );
};

export default Form;
