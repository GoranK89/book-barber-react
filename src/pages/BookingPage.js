import Header from '../Components/Header';
import HeroImg from '../Components/HeroImg';
import Form from '../Components/form/Form';
import heroBookingImg from '../Components/images/img_hero.jpg';

const BookingPage = () => {
  return (
    <main>
      <Header />
      <div className="hero-form-container">
        <HeroImg
          src={heroBookingImg}
          alt={'customer getting his beard trimmed at a barbershop'}
        />
        <Form />
      </div>
    </main>
  );
};

export default BookingPage;
