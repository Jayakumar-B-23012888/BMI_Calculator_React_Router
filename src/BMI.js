
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const heightValue = Number(height);
    const weightValue = Number(weight);

    if (
      !height ||
      !weight ||
      Number.isNaN(heightValue) ||
      Number.isNaN(weightValue) ||
      heightValue <= 0 ||
      weightValue <= 0
    ) {
      setError("Please enter valid height and weight.");
      return;
    }

    if (heightValue < 50 || heightValue > 250) {
      setError("Please enter a height between 50 and 250 cm.");
      return;
    }

    if (weightValue < 10 || weightValue > 300) {
      setError("Please enter a weight between 10 and 300 kg.");
      return;
    }

    setError("");

    navigate(
      `/result?height=${heightValue}&weight=${weightValue}`
    );
  };

  return (
    <div className="page">
      <div className="card">
        <Link to="/" className="back-link">
          ← Home
        </Link>

        <h1>BMI Calculator</h1>

        <p className="subtitle">
          Enter your height and weight below.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="height">Height</label>

          <div className="input-group">
            <input
              id="height"
              type="number"
              min="50"
              max="250"
              step="0.1"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder="Enter height"
            />

            <span>cm</span>
          </div>

          <label htmlFor="weight">Weight</label>

          <div className="input-group">
            <input
              id="weight"
              type="number"
              min="10"
              max="300"
              step="0.1"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="Enter weight"
            />

            <span>kg</span>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="button">
            Calculate BMI
          </button>
        </form>
      </div>
    </div>
  );
}

export default BMI;

