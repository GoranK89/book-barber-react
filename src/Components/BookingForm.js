import { useState, useEffect } from 'react';
import { get, useForm } from 'react-hook-form';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
  /^(([0-9]{3})[ \-\/]?([0-9]{3})[ \-\/]?([0-9]{3}))|([0-9]{9})|([\+]?([0-9]{3})[ \-\/]?([0-9]{2})[ \-\/]?([0-9]{3})[ \-\/]?([0-9]{3}))$/;

const BookingForm = () => {
  useEffect(() => {
    const getData = async () => {
      const dataBarbers = await fetchBarbers();
      const dataServices = await fetchServices();
      return dataBarbers, dataServices;
    };

    getData();
  }, []);

  // Fetch Barbers
  const fetchBarbers = async () => {
    const res = await fetch('http://localhost:5000/barbers');
    const data = await res.json();
    return data;
  };
  // Fetch Services
  const fetchServices = async () => {
    const res = await fetch('http://localhost:5000/services');
    const data = await res.json();
    return data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Book your appointment</h2>
      <div className="form-row full-name-wrapper">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          {...register('firstName', { required: true, maxLength: 20 })}
        />
        <div className="error-msg-wrapper">
          {' '}
          {(errors.firstName || errors.lastName) && (
            <p>Please enter your Full Name</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          {...register('lastName', { required: true, maxLength: 20 })}
        />
      </div>
      <div className="form-row contact-wrapper">
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register('email', {
            required: true,
            pattern: emailRegex,
          })}
        />
        <div className="error-msg-wrapper">
          {errors.email && <p>Please enter a valid email</p>}
        </div>

        <input
          type="tel"
          placeholder="Contact Number"
          name="phone"
          {...register('phone', {
            required: true,
            pattern: phoneRegex,
          })}
        />
        <div className="error-msg-wrapper">
          {errors.phone && <p>Please enter phone number</p>}
        </div>
      </div>
      <div className="form-row select-wrapper">
        <select defaultValue={'Select Barber'} {...register('selectedBarber')}>
          <option value={'Select Barber'} disabled>
            Select Barber
          </option>
          <option value="jože">Jože Britvica</option>
        </select>
        <div className="error-msg-wrapper">
          {errors.selectedBarber && <p>Please select a barber</p>}
        </div>
        <select {...register('selectedService')}>
          <option disabled>Select Service</option>
          <option value="shave">Shave</option>
          <option value="haircut">Haircut</option>
          <option value="shave + haircut">Shave + Haircut</option>
        </select>
        <div className="error-msg-wrapper">
          {errors.selectedService && <p>Please select a service</p>}
        </div>
      </div>
      <div className="form-row date-time-wrapper">
        <input type="date" {...register('selectedDate')} />
        <select defaultValue={'default'} {...register('selectedTime')}>
          <option disabled value="default">
            Select Time
          </option>
          <option value="7:00">7:00</option>
        </select>
        <div className="error-msg-wrapper">
          {errors.selectedTime && <p>Please pick a time</p>}
        </div>
      </div>
      <input id="form-service-price" placeholder="Service Price" disabled />

      <button type="submit" className="btn-submit">
        Book appointment
      </button>
    </form>
  );
};

export default BookingForm;
