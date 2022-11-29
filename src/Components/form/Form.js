import { useState, useEffect } from 'react';
import Inputs from './formInputs/Inputs';
import SelectBarber from './formInputs/SelectBarber';
import SelectService from './formInputs/SelectService';
import SelectTime from './formInputs/SelectTime';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const initialInputValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedService: '',
    selectedBarber: '',
    selectedTime: '',
  };
  // seperate useState for date - doesn't work with regular handleChange
  const [date, setDate] = useState(null);
  const [formValues, setFormValues] = useState(initialInputValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(`Changed value: ${value}, Changed date: ${date}`);
  };

  // SUBMIT HANDLE
  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // Redirect on success
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(`submited values: ${formValues} ${date}`);
      navigate('/success');
    }
  }, [formErrors]);

  const validate = values => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone =
      /^(([0-9]{3})[ \-\/]?([0-9]{3})[ \-\/]?([0-9]{3}))|([0-9]{9})|([\+]?([0-9]{3})[ \-\/]?([0-9]{2})[ \-\/]?([0-9]{3})[ \-\/]?([0-9]{3}))$/;

    if (!values.firstName || !values.lastName) {
      errors.firstName = 'Please enter your full name';
    }
    if (!values.email || !regexEmail.test(formValues.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!values.phone || !regexPhone.test(formValues.phone)) {
      errors.phone = 'Please enter phone number';
    }
    if (!values.selectedBarber) {
      errors.selectedBarber = 'Please select a barber';
    }
    if (!values.selectedService) {
      errors.selectedService = 'Please select a service';
    }
    if (!date) {
      errors.selectedDate = 'Please pick a date';
    }
    if (!values.selectedTime) {
      errors.selectedTime = 'Please pick a time';
    }

    return errors;
  };

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

  // db = the json 'database'
  const [dbServices, setServices] = useState([]);
  const [dbBarbers, setBarbers] = useState([]);
  const [dbWorkHours, setWorkHours] = useState([]);

  const barberWorkHours = dbBarbers[0]?.workHours;

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

  const displayPrice = () => {
    // make this less manual
    if (formValues.selectedService === 'Shave') {
      return `Price is ${dbServices[0].price} €`;
    }
    if (formValues.selectedService === 'Haircut') {
      return `Price is ${dbServices[1].price} €`;
    }
    if (formValues.selectedService === 'Shave + Haircut') {
      return `Price is ${dbServices[2].price} €`;
    }
    if (!formValues.selectedService) return 'Select a service';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book your appointment</h2>
      <div className="input-group full-name-wrapper">
        <Inputs
          onChange={handleChange}
          name={'firstName'}
          type={'text'}
          maxLength={20}
          placeholder={'First name'}
        />
        <Inputs
          onChange={handleChange}
          name={'lastName'}
          type={'text'}
          maxLength={20}
          placeholder={'Last name'}
        />
        <span className="form-err-msg">{formErrors.firstName}</span>
      </div>
      <div className="input-group contact-wrapper">
        <Inputs
          onChange={handleChange}
          name={'email'}
          type={'email'}
          maxLength={40}
          placeholder={'Email'}
        />
        <span className="form-err-msg">{formErrors.email}</span>
        <Inputs
          onChange={handleChange}
          name={'phone'}
          type={'tel'}
          placeholder={'Contact number'}
        />
        <span className="form-err-msg">{formErrors.phone}</span>
      </div>
      <div className="input-group select-b-s">
        <SelectBarber onChange={handleChange} barberArr={dbBarbers} />
        <span className="form-err-msg">{formErrors.selectedBarber}</span>
        <SelectService onChange={handleChange} serviceArr={dbServices} />
        <span className="form-err-msg">{formErrors.selectedService}</span>
      </div>
      <div className="input-group select-d-t">
        <DatePicker
          className="input"
          id="date-picker"
          placeholderText="Select date"
          onChange={date => setDate(date)}
          selected={date}
          minDate={new Date()}
          filterDate={date => date.getDay() != 1}
          dateFormat="dd/MM/yyyy"
        />
        <span className="form-err-msg">{formErrors.selectedDate}</span>
        <SelectTime onChange={handleChange} arr={barberWorkHours} />

        <span className="form-err-msg">{formErrors.selectedTime}</span>
      </div>
      <input className="input" placeholder={displayPrice()} disabled />
      <button className="btn-submit mobile" type="submit">
        Book appointment
      </button>
    </form>
  );
};

export default Form;
