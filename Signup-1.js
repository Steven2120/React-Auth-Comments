//imports react
import React, { Component } from "react";
//imports functions from validator npm
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";
//imports Signup.css
import "./Signup.css";
export class Signup extends Component {
  //creates state with the following keys. most are set to empty string which will later be modified with setState
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    onConfirmPasswordFocus: false,
    isButtonDisabled: true,
  };

  //creates function that uses an event param
  handleOnChange = (event) => {
    //sets state that takes the target of where the user targets to the value
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        //if the target name (input) is either firstName or lastName run this.handleFirstNameAndLastNameInput(event);
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        //if the target name (input) is either email run this.handleEmailInput();
        if (event.target.name === "email") {
          this.handleEmailInput();
        }
        //if the target name (input) is username run this.handleUsernameInput();
        if (event.target.name === "username") {
          this.handleUsernameInput();
        }
        //if the target name (input) is password run this.handlePasswordInput();
        if (event.target.name === "password") {
          this.handlePasswordInput();
        }
        //if the target name (input) is confirmPassword
        if (event.target.name === "confirmPassword") {
          //if the value of the password state does not equal to the value of the confirmPassword
          if (this.state.password !== this.state.confirmPassword) {
            //set the confirmPasswordError state to "Password does not match!"
            this.setState({
              confirmPasswordError: "Password does not match!",
            });
          } else {
            //if passwords match, set confirmPasswordError to empty string
            this.setState({
              confirmPasswordError: "",
            });
          }
        }
      }
    );
  };

  //creates function
  handlePasswordInput = () => {
    //if following statement is true
    if (this.state.onConfirmPasswordFocus) {
      //if the state prop password does not equal confirmPassword advise with confirmPassword the following message
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match",
        });
        //change the value of confirm password error to empty string
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    //if the length of the password is 0
    if (this.state.password.length === 0) {
      //set the state of passwordError to display the following message
      this.setState({
        passwordError: "Password cannot be empty",
      });
      //else if the password entered meets isStrongPassword requirements
    } else {
      if (isStrongPassword(this.state.password)) {
        //set the state of passwordError to empty string
        this.setState({
          passwordError: "",
        });
        //if it does not meet requirements, have passwordError display following message
      } else {
        this.setState({
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
        });
      }
    }
  };

  //creates following handle function
  handleEmailInput = () => {
    //if the length of the email state is 0
    if (this.state.email.length === 0) {
      //set emailError state to display the following message
      this.setState({
        emailError: "Email cannot be empty",
      });
      //if its not empty and if the email entered meets isEmail requirements,
    } else {
      if (isEmail(this.state.email)) {
        //set emailError state to empty string
        this.setState({
          emailError: "",
        });
        //if it does not meet requirements, have emailError state display the following message
      } else {
        this.setState({
          emailError: "Please, enter a valid email!",
        });
      }
    }
  };

  //create the following handle function with event object
  handleFirstNameAndLastNameInput = (event) => {
    //if the input that user targets is not empty
    if (this.state[event.target.name].length > 0) {
      //if the input that the user target has a value that meets isAlpha requirements,
      if (isAlpha(this.state[event.target.name])) {
        //set its pertaining error state to empty string
        this.setState({
          [`${event.target.name}Error`]: "",
        });
        //if it does not meet requirements, have its pertaining error state display the following message
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
        });
      }
      //if the input is empty, display the following message
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  //create following handle function
  handleUsernameInput = () => {
    //if the username input is empty, set it error state to display following message
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: "Username cannot be empty",
      });
    } else {
      //if the inputted value of username meets isAlphanumeric's requirements, set its error state to an empty string
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
        //if its not empty, set its error state to an empty string
      } else {
        this.setState({
          usernameError: "Username can only have alphabet and number",
        });
      }
    }
  };

  //create handle function with event object that uses prevent default method and logs the corresponding state
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  //creates handle function with event object and logs the input that user uses and logs following message
  handleOnBlur = (event) => {
    console.log(event.target.name);
    console.log("handle onBlur Triggered");
    //if the current input is empty, set state of its error state to display following message
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  //creates handle function that if onConfirmPasswordFocus is false set it to true
  handleConfirmPasswordOnFocus = () => {
    if (!this.state.onConfirmPasswordFocus) {
      this.setState({
        onConfirmPasswordFocus: true,
      });
    }
  };

  //create handle function with event object that maps through state and if item is not empty set isButtonDisabled to false **work in progress still debugging
  handleSubmitButtonActivation = (event) => {
    this.state.map((item) => {
      if (item.length !== 0) {
        event.target.name;
        this.setState({
          isButtonDisabled: false,
        });
      }
    });
  };

  //renders the following Jsx
  render() {
    //sets each prop of state to this.state
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;
    return (
      // creates what will be displayed on Dom using JSX and allows all inputs to use functions created above for functionality. Also creates submit button that will be disabled (still debugging)
      <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>
              </div>
              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleConfirmPasswordOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

//exports Signup.js
export default Signup;
