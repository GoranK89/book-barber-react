import { useState, useEffect } from 'react';
import Fullname from './formInputs/Fullname';
import ContactInfo from './formInputs/ContactInfo';
import SelectBarber from './formInputs/SelectBarber';
import SelectService from './formInputs/SelectService';
import DateTime from './formInputs/DateTime';

const Form = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [barber, setBarber] = useState();
  const [service, setService] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const initialInputValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    barber: '',
    time: '',
    date: '',
  };

  const [formValues, setFormValues] = useState(initialInputValues);

  // GET
  const [dbServices, setServices] = useState([]);
  const [dbBarbers, setBarbers] = useState([]);
  const [dbWorkHours, setWorkHours] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

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

  // Fetch data
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

  // SUBMIT HANDLE
  const handleSubmit = e => {
    e.preventDefault();
    const data = [
      firstName,
      lastName,
      email,
      phone,
      date,
      barber,
      service,
      time,
    ];
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book your appointment</h2>
      <div className="input-group full-name-wrapper">
        <Fullname setFirstName={setFirstName} setLastName={setLastName} />
      </div>
      <div className="input-group contact-wrapper">
        <ContactInfo setEmail={setEmail} setPhone={setPhone} />
      </div>
      <div className="input-group select-b-s">
        <SelectBarber dbBarbers={dbBarbers} setBarber={setBarber} />
        <SelectService dbServices={dbServices} setService={setService} />
      </div>
      <div className="input-group select-d-t">
        <DateTime setDate={setDate} setTime={setTime} />
      </div>
      <input className="input" placeholder="Select any service" disabled />
      <button className="btn-submit" type="submit">
        Book appointment
      </button>
    </form>
  );
};

export default Form;
