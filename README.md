# Ex06 BMI Calculator

## Date: 01/09/2026
## Name: Jayakumar B
## Reg.no: 212223040073



## AIM

To develop a responsive and interactive **Body Mass Index (BMI) Calculator** using React that allows users to input their height and weight, calculates their BMI, and categorizes the result as **Underweight, Normal, Overweight, or Obese**.

## DESIGN STEPS

### STEP 1: Initialize React Project

1. Create a new React application using Create React App.
2. Open the project in Visual Studio Code.
3. Install React Router using:

```bash
npm install react-router-dom
```

### STEP 2: Set Up Routing

Create the routing structure using `react-router-dom`.

The application contains the following routes:

* `/` – Home page
* `/bmi` – BMI Calculator page
* `/result` – BMI Result page

### STEP 3: Design the BMI Form Page

1. Create a form to accept Height in centimeters (cm).
2. Create a form to accept Weight in kilograms (kg).
3. Use React state to store the entered values.
4. On form submission, navigate to the Result page.
5. Pass height and weight to the Result page using URL query parameters.

### STEP 4: Handle Input Validation

1. Check whether height and weight are valid numbers.
2. Check that the entered values are greater than zero.
3. Validate height between 50 cm and 250 cm.
4. Validate weight between 10 kg and 300 kg.
5. Display an error message for invalid input.

### STEP 5: Perform BMI Calculation

1. Extract height and weight from the URL query parameters.
2. Convert height from centimeters to meters.

```text
Height in meters = Height in cm / 100
```

3. Calculate BMI using:

```text
BMI = Weight (kg) / Height² (m²)
```

### STEP 6: Display Result

The BMI value is displayed along with its corresponding category.

| BMI Range      | Category    |
| -------------- | ----------- |
| Below 18.5     | Underweight |
| 18.5 – 24.9    | Normal      |
| 25.0 – 29.9    | Overweight  |
| 30.0 and above | Obese       |

### STEP 7: Navigation Options

1. Provide a **Calculate Again** button on the Result page.
2. The button navigates back to the BMI Calculator page.
3. Provide a Home navigation option.

### STEP 8: Enhancements

1. Add responsive CSS styling.
2. Create a modern card-based interface.
3. Add gradient backgrounds.
4. Add hover effects to buttons.
5. Display BMI categories with different visual styles.
6. Make the application responsive for mobile and desktop screens.

## PROGRAM

### App.js

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BMI from "./BMI";
import Result from "./Result";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Home.js

```jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page home-page">
      <div className="card home-card">
        <div className="home-icon">⚖</div>

        <h1>BMI Calculator</h1>

        <p className="subtitle">
          Calculate your Body Mass Index and understand your BMI category.
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
```

### BMI.js

```jsx
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
```

### Result.js

```jsx
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
```

### App.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at top left, #818cf8 0%, transparent 35%),
    radial-gradient(circle at bottom right, #a78bfa 0%, transparent 35%),
    linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #1f2937;
}

/* Main Page */

.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
}

/* Card */

.card {
  width: 100%;
  max-width: 460px;
  padding: 40px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  text-align: center;
  animation: slideUp 0.5s ease;
}

.card h1 {
  font-size: 36px;
  font-weight: 750;
  color: #1f2937;
  margin-bottom: 12px;
}

.subtitle {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 28px;
}

/* Home */

.home-card {
  max-width: 520px;
}

.home-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 38px;
}

/* BMI categories */

.bmi-categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 25px 0;
}

.bmi-categories div {
  padding: 15px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.bmi-categories span {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 5px;
}

.bmi-categories strong {
  font-size: 14px;
  color: #374151;
}

/* Back Link */

.back-link {
  display: block;
  text-align: left;
  margin-bottom: 20px;
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
}

/* Form */

form {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  color: #374151;
  font-size: 14px;
  font-weight: 700;
  margin: 8px 0;
}

.input-group {
  position: relative;
  margin-bottom: 12px;
}

.input-group input {
  width: 100%;
  padding: 15px 60px 15px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 13px;
  outline: none;
  font-size: 16px;
  background: #f9fafb;
  transition: 0.25s ease;
}

.input-group input:focus {
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.input-group span {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-weight: 600;
}

/* Button */

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  margin-top: 18px;
  border: none;
  border-radius: 13px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(99, 102, 241, 0.3);
  transition: 0.25s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(99, 102, 241, 0.4);
}

/* Error */

.error {
  color: #dc2626;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin: 10px 0 0;
}

/* Result */

.result-card {
  max-width: 500px;
}

.result-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #22c55e;
  color: white;
  font-size: 32px;
  font-weight: bold;
  box-shadow: 0 10px 22px rgba(34, 197, 94, 0.25);
}

.bmi-info {
  margin: 22px 0;
  padding: 8px 20px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e5e7eb;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span {
  color: #6b7280;
}

.info-row strong {
  color: #111827;
}

.bmi-result {
  margin: 22px 0;
  padding: 25px;
  border-radius: 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.bmi-result span {
  display: block;
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.bmi-result strong {
  display: block;
  font-size: 46px;
}

.category {
  display: inline-block;
  padding: 11px 25px;
  border-radius: 30px;
  font-size: 19px;
  font-weight: 750;
  margin-bottom: 8px;
}

.category.underweight {
  background: #dbeafe;
  color: #1d4ed8;
}

.category.normal {
  background: #dcfce7;
  color: #15803d;
}

.category.overweight {
  background: #fef3c7;
  color: #b45309;
}

.category.obese {
  background: #fee2e2;
  color: #b91c1c;
}

.home-result-link {
  display: block;
  margin-top: 18px;
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
}

/* Animation */

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */

@media (max-width: 600px) {
  .page {
    padding: 20px 14px;
  }

  .card {
    padding: 30px 22px;
    border-radius: 22px;
  }

  .card h1 {
    font-size: 29px;
  }

  .home-icon {
    width: 65px;
    height: 65px;
    font-size: 30px;
  }

  .bmi-categories {
    gap: 8px;
  }

  .bmi-categories div {
    padding: 12px 8px;
  }

  .bmi-result strong {
    font-size: 40px;
  }
}
```

### `src/index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/index.css`

```css
html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
}
```

## OUTPUT

### 1. Home Page

<img width="1920" height="988" alt="image" src="https://github.com/user-attachments/assets/e39ae851-521d-44a3-ad33-612874f8a03f" />


### 2. BMI Calculator Page

<img width="1920" height="981" alt="image" src="https://github.com/user-attachments/assets/11d02e0a-57a3-45c4-b6f3-c479e1663c47" />


After clicking **Calculate BMI**, the application navigates to the result page.

### 3. BMI Result Page

<img width="1920" height="976" alt="image" src="https://github.com/user-attachments/assets/1ec1b755-d1d2-40e3-aa4f-76af206fa74e" />



## RESULT

The **BMI Calculator** was successfully developed using **React and React Router**. The application accepts height and weight as user input, validates the entered values, converts height from centimeters to meters, calculates BMI using the BMI formula, and displays the corresponding category as **Underweight, Normal, Overweight, or Obese**.

The application successfully implements separate **Home, BMI Calculator, and Result routes**, provides navigation between pages, and uses responsive CSS styling for a clean and interactive user interface.
