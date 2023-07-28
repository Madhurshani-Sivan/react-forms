import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const enteredEmailIsValid = /\S+@\S+\.\S+/.test(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const inputChangeHandler = (event) => {
    if (event.target.id === "name") {
      setEnteredName(event.target.value);
    }

    if (event.target.id === "email") {
      setEnteredEmail(event.target.value);
    }
  };

  const inputBlurHandler = (event) => {
    if (event.target.id === "name") {
      setEnteredNameTouched(true);
    }

    if (event.target.id === "email") {
      setEnteredEmailTouched(true);
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    // nameInputRef.current.value = ""; (NOT IDEAL, DON'T MANIPULATE THE DOM)
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={inputChangeHandler}
          value={enteredName}
          onBlur={inputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">EmailAddress</label>
        <input
          type="text"
          id="email"
          onChange={inputChangeHandler}
          value={enteredEmail}
          onBlur={inputBlurHandler}
        />
        {emailInputIsInvalid && <p className="error-text">Email is invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
