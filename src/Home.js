
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page home-page">
      <div className="card home-card">
        <div className="home-icon">⚖</div>

        <h1>BMI Calculator</h1>

        <p className="subtitle">
          Calculate your Body Mass Index and understand your
          BMI category.
        </p>

        <div className="bmi-categories">
          <div>
            <span>Below 18.5</span>
            <strong>Underweight</strong>
          </div>

          <div>
            <span>18.5 - 24.9</span>
            <strong>Normal</strong>
          </div>

          <div>
            <span>25 - 29.9</span>
            <strong>Overweight</strong>
          </div>

          <div>
            <span>30+</span>
            <strong>Obese</strong>
          </div>
        </div>

        <Link to="/bmi" className="button">
          Calculate BMI
        </Link>
      </div>
    </div>
  );
}

export default Home;

