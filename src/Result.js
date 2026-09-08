
import { Link, useSearchParams } from "react-router-dom";

function Result() {
  const [searchParams] = useSearchParams();

  const height = Number(searchParams.get("height"));
  const weight = Number(searchParams.get("weight"));

  if (!height || !weight || height <= 0 || weight <= 0) {
    return (
      <div className="page">
        <div className="card">
          <h1>Invalid Input</h1>

          <p className="subtitle">
            Please enter your height and weight first.
          </p>

          <Link to="/bmi" className="button">
            Go to Calculator
          </Link>
        </div>
      </div>
    );
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category = "";
  let categoryClass = "";

  if (bmi < 18.5) {
    category = "Underweight";
    categoryClass = "underweight";
  } else if (bmi < 25) {
    category = "Normal";
    categoryClass = "normal";
  } else if (bmi < 30) {
    category = "Overweight";
    categoryClass = "overweight";
  } else {
    category = "Obese";
    categoryClass = "obese";
  }

  return (
    <div className="page">
      <div className="card result-card">
        <div className="result-icon">✓</div>

        <h1>BMI Result</h1>

        <p className="subtitle">
          Your Body Mass Index has been calculated.
        </p>

        <div className="bmi-info">
          <div className="info-row">
            <span>Height</span>
            <strong>{height} cm</strong>
          </div>

          <div className="info-row">
            <span>Weight</span>
            <strong>{weight} kg</strong>
          </div>
        </div>

        <div className="bmi-result">
          <span>Your BMI</span>
          <strong>{bmi.toFixed(2)}</strong>
        </div>

        <div className={`category ${categoryClass}`}>
          {category}
        </div>

        <Link to="/bmi" className="button">
          Calculate Again
        </Link>

        <Link to="/" className="home-result-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Result;

