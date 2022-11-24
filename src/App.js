import Header from './Components/Header';
import ImgHero from './Components/ImgHero';
import Form from './Components/form/Form';

function App() {
  return (
    <main>
      <Header />
      <div className="hero-form-container">
        <ImgHero />
        <Form />
      </div>
    </main>
  );
}

export default App;
