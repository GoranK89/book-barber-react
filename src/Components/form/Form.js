import { useState, useEffect } from 'react';
import Inputs from './formInputs/Inputs';
import SelectBarber from './formInputs/SelectBarber';
import SelectService from './formInputs/SelectService';
import SelectTime from './formInputs/SelectTime';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  // change this to a reusable component!
  const breakPoint = 515;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
  }, [width]);

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:5000/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(`Services data, ${error}`);
    }
  };
  const fetchBarbers = async () => {
    try {
      const res = await fetch('http://localhost:5000/barbers');
      const data = await res.json();
      setBarbers(data);
    } catch (error) {
      console.error(`Barbers data, ${error}`);
    }
  };
  const fetchAppointments = async () => {
    try {
      const res = await fetch('http://localhost:5000/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error(`Work hours data, ${error}`);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBarbers();
    fetchAppointments();
  }, []);

  // db = the json 'database'
  const [dbServices, setServices] = useState([]);
  const [dbBarbers, setBarbers] = useState([]);
  const [dbAppointments, setAppointments] = useState([]);
  const [date, setDate] = useState(null);

  const initialInputValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedService: '',
    selectedBarber: '',
    selectedTime: '',
  };

  const [formValues, setFormValues] = useState(initialInputValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // HANDLE CHANGE & SUBMIT
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // POST FORM DATA
  const matchServicesId = () => {
    let id;
    dbServices.find(item => {
      if (item.name === formValues.selectedService) id = item.id;
    });
    return id;
  };
  const matchBarberId = () => {
    let id;
    const firstName = formValues.selectedBarber?.split(' ')[0];
    const lastName = formValues.selectedBarber?.split(' ')[1];
    dbBarbers.find(item => {
      if (item.firstName === firstName && item.lastName === lastName)
        id = item.id;
    });
    return id;
  };

  const postData = async () => {
    try {
      const res = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '',
          startDate: parseInt((date.getTime() / 1000).toFixed(0)),
          barberId: matchBarberId(),
          serviceId: matchServicesId(),
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Redirect on success
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      postData();
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
    if (!formValues.selectedService && width > breakPoint) {
      return 'Select a service';
    } else return 'Price';
  };

  if (formValues.selectedBarber === 'Jože Britvica') {
  }

  const filterWeekdays = date => {
    const day = date.getDay();
    return (
      day === dbBarbers[0]?.workHours[0].day ||
      day === dbBarbers[0]?.workHours[1].day ||
      day === dbBarbers[0]?.workHours[2].day ||
      day === dbBarbers[0]?.workHours[3].day ||
      day === dbBarbers[0]?.workHours[4].day
    );
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
          placeholder={width > breakPoint ? 'Contact number' : 'Phone'}
        />
        <span className="form-err-msg">{formErrors.phone}</span>
      </div>
      <div className="input-group select-b-s">
        <SelectBarber onChange={handleChange} barberArr={dbBarbers} />
        <span className="form-err-msg">{formErrors.selectedBarber}</span>
        <SelectService
          barberPicked={formValues.selectedBarber}
          onChange={handleChange}
          serviceArr={dbServices}
        />
        <span className="form-err-msg">{formErrors.selectedService}</span>
      </div>
      <div className="input-group select-d-t">
        {formValues.selectedBarber !== '' ? (
          <DatePicker
            className="input"
            id="date-picker"
            placeholderText="Select date"
            onChange={date => setDate(date)}
            selected={date}
            minDate={new Date()}
            filterDate={filterWeekdays}
            dateFormat="dd/MM/yyyy"
          />
        ) : (
          <select className="input" defaultValue={'default'}>
            <option value="default" disabled>
              {width > breakPoint ? 'Select Date' : 'Date'}
            </option>
            <option className="form-err-msg" disabled>
              First select a barber
            </option>
          </select>
        )}
        <span className="form-err-msg">{formErrors.selectedDate}</span>
        <SelectTime
          onChange={handleChange}
          barberPicked={formValues.selectedBarber}
          datePicked={date}
          dbBarbers={dbBarbers}
        />
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
