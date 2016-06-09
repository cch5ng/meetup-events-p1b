//app/components/Registration.jsx

import React from 'react';
import uuid from 'node-uuid';

export default class Registration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
//			isOpen: false,
			isNameEmpty: true,
			isEmailValid: true,
			isEmailEmpty: true,
			emailErrors: null,
			isPwdValid: true,
			pwdErrors: [],
			isPwdEmpty: true,
			isPwd2Valid: true,
			pwd2Errors: [],
			isPwd2Empty: true,
			passwordsMatch: true,
			passwordsMatchError: null
		}
	}

	componentDidMount() {
		//workaround for autofocus on single page app
		if (!(document.getElementById('name').hasAttribute('autofocus'))) {
			document.getElementById('name').focus();
		}
	}

	render() {
		return (
			<div>
				<h3>Register</h3>
				<form className="form-horizontal" id="reg-form">
					<div className="form-group">
						<label htmlFor="name" className="col-sm-2 control-label">Name</label>
						<div className="col-sm-10">
							<input type="text" id="name" className="form-control" name="name" onChange={this.validateName} required autoComplete="name" autoFocus placeholder="Full Name" />
							{this.state.isNameEmpty ? this.displayRequiredError() : null }
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="email" className="col-sm-2 control-label">Email Address</label>
						<div className="col-sm-10">
							<input id="email" className="form-control" name="email" type="email" onChange={this.validateEmail} required autoComplete="email" placeholder="name@example.com" />
							{this.state.isEmailEmpty ? this.displayRequiredError() : null }
							{this.state.isEmailValid ? null : this.displayEmailError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="pwd" className="col-sm-2 control-label">Password</label>
						<div className="col-sm-10">
							<input id="pwd" className="form-control" name="pwd" type="password" onChange={this.validatePwd} placeholder=">= 8 chars, 1 num, 1 CAP, 1 special char" required />
							{this.state.isPwdEmpty ? this.displayRequiredError() : null }
							{this.state.isPwdValid ? null : this.displayPwdError()}
							{this.state.passwordsMatch ? null : this.displayPwdMatchError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="pwd2" className="col-sm-2 control-label">Confirm Password</label>
						<div className="col-sm-10">
							<input id="pwd2" className="form-control" name="pwd2" type="password" onChange={this.validatePwd2} placeholder=">= 8 chars, 1 num, 1 CAP, 1 special char" required />
							{this.state.isPwd2Empty ? this.displayRequiredError() : null }
							{this.state.isPwd2Valid ? null : this.displayPwd2Error()}
							{this.state.passwordsMatch ? null : this.displayPwdMatchError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="title" className="col-sm-2 control-label">Title</label>
						<div className="col-sm-10">
							<input type="text" id="title" className="form-control" name="title" placeholder="optional" />
						</div>
					</div>
					<div className="text-center">
						<button className="btn btn-primary btn-block" id="register-submit" onClick={this.validateForm} type="submit">Save</button>
					</div>
				</form>
			</div>
		);
	}

	/**
	 *@param
	 *@return
	 * Verifies that the name is populated
	 */
	validateName = (e) => {
		let name = document.getElementById('name');

		if (name.value.length === 0) {
			this.setState({isNameEmpty: true});
		} else {
			this.setState({isNameEmpty: false});
		}
	};

	/**
	 *@param
	 *@return
	 * Verifies that the email has the correct data format. If not, sets an error message in the state.
	 */
	validateEmail = (e) => {
		//console.log('email event handler');
		var email = document.getElementById('email');
		let isEmailEmpty;

		if (email.value.match(/\w+@\w+.\w+/g)) {
			this.setState({isEmailValid: true, emailErrors: '', isEmailEmpty: false})
			email.setCustomValidity('');
			//console.log('isEmailValid: ' + this.state.isEmailValid);
		} else {
			if (email.value.length === 0) {
				isEmailEmpty = true;
			} else {
				isEmailEmpty = false;
			}
			this.setState({isEmailValid: false, emailErrors: 'Email address should have the format: name@mail.com', isEmailEmpty: isEmailEmpty})
			email.setCustomValidity("Email address should have the format: name@mail.com");
			//console.log('isEmailValid: ' + this.state.isEmailValid);
		}
	};

	/**
	 *@param
	 *@return
	 * Displays email validation error.
	 */
	displayEmailError = () => {
		return (
			<p className="email-error error">{this.state.emailErrors}</p>
		)
	};

	/**
	 *@param
	 *@return
	 * Verifies format for first password. On failure, sets state with corresponding error message.
	 */
	validatePwd = (e) => {
		var pwd = document.getElementById('pwd');
		var pwdErrorsAr = [];
		let isPwdEmpty;

		//is field empty
		if (pwd.value.length === 0) {
			isPwdEmpty = true;
		} else {
			isPwdEmpty = false;
		}

		//console.log('pwd event listener');
		if (pwd.value.match(/[A-Z]/g)) {
		} else {
			pwdErrorsAr.push('Password should contain at least one upper-case letter');
		}
		if (pwd.value.match(/\d/g)) {
		} else {
			pwdErrorsAr.push('Password should contain at least one number');
		}

		//less than 8 chars
		if (pwd.value.length < 8) {
			pwdErrorsAr.push('Password needs 8 or more characters');
		}

		//contains special char
		if (!pwd.value.match(/[\!\@\#\$\%\^\&\*]/g)) {
			pwdErrorsAr.push('Password needs a special character: !, @, #, $, %, ^, & or *');
		}

		if (pwdErrorsAr.length === 0) {
			this.setState({isPwdValid: true, pwdErrors: [], isPwdEmpty: isPwdEmpty});
			pwd.setCustomValidity('');
		} else {
			this.setState({isPwdValid: false, pwdErrors: pwdErrorsAr, isPwdEmpty: isPwdEmpty});
			pwd.setCustomValidity(pwdErrorsAr.join('. '));
		}

		this.passwordsMatch();
		//console.log('pwdErrorsAr: ' + pwdErrorsAr);
	};

//TODO refactor this logic with function above
//NOTE to REVIEWER I would have liked to just validate pwd input 1 and verify that both passwords are matching
//this should ensure that both passwords end up with valid values IMO
	/**
	 *@param
	 *@return
	 * Verifies format for second password. On failure, sets state with corresponding error message.
	 */
	validatePwd2 = (e) => {
		var pwd2 = document.getElementById('pwd2');
		var pwdErrorsAr2 = [];
		let isPwd2Empty;

		//is field empty
		if (pwd2.value.length === 0) {
			isPwd2Empty = true;
		} else {
			isPwd2Empty = false;
		}

		//console.log('pwd event listener');
		if (pwd2.value.match(/[A-Z]/g)) {
		} else {
			pwdErrorsAr2.push('Password should contain at least one upper-case letter');
		}
		if (pwd2.value.match(/\d/g)) {
		} else {
			pwdErrorsAr2.push('Password should contain at least one number');
		}

		//less than 8 chars
		if (pwd2.value.length < 8) {
			pwdErrorsAr2.push('Password needs 8 or more characters');
		}

		//contains special char
		if (!pwd2.value.match(/[\!\@\#\$\%\^\&\*]/g)) {
			pwdErrorsAr2.push('Password needs a special character: !, @, #, $, %, ^, & or *');
		}

		if (pwdErrorsAr2.length === 0) {
			this.setState({isPwd2Valid: true, pwd2Errors: [], isPwd2Empty: isPwd2Empty});
			pwd2.setCustomValidity('');
		} else {
			this.setState({isPwd2Valid: false, pwd2Errors: pwdErrorsAr2, isPwd2Empty: isPwd2Empty});
			pwd2.setCustomValidity(pwdErrorsAr2.join('. '));
		}

		this.passwordsMatch();
		//console.log('pwdErrorsAr2: ' + pwdErrorsAr2);
	};

	/**
	 *@param
	 *@return
	 * Generate unique key for errors
	 */
	genKey = () => {
		return uuid.v4();
	};


	/**
	 *@param
	 *@return
	 * On first password error, displays error messages.
	 */
	displayPwdError = () => {
		let pwdErrors = this.state.pwdErrors;
		return (
			pwdErrors.map(err =>
				<p key={this.genKey()} className="pwd-error error">{err}</p>
			)
		)
	};

	/**
	 *@param
	 *@return
	 * On confirm password input error, displays error messages.
	 */
	displayPwd2Error = () => {
		let pwd2Errors = this.state.pwd2Errors;
		return (
			pwd2Errors.map(err =>
				<p key={this.genKey()} className="pwd-error error">{err}</p>
			)
		)
	};

	/**
	 *@param
	 *@return
	 * If passwords do not match, displays error message.
	 */
	displayPwdMatchError = () => {
		return (
			<p className="pwd-match-error error">{this.state.passwordsMatchError}</p>
		)
	};

	/**
	 *@param
	 *@return
	 * On form submit, verifies that passwords are matching.
	 */
	passwordsMatch = () => {
		let pwd = document.getElementById('pwd');
		let pwd2 = document.getElementById('pwd2');

		if (pwd.value === pwd2.value) {
			this.setState({passwordsMatch: true, passwordsMatchError: null});
		} else {
			this.setState({passwordsMatch: false, passwordsMatchError: 'Passwords are not matching. Check for typos'});
		}
	}

	/**
	 *@param
	 *@return
	 * Displays an error for required fields which are empty.
	 */
	displayRequiredError = () => {
		return (
			<p className="required-error error">This field is required</p>
		)
	}

	/**
	 *@param
	 *@return
	 * On form submit, verifies that there are no input errors.
	 */
	validateForm = (e) => {
		let regForm = document.getElementById('reg-form');
		e.preventDefault();
		if ( this.state.isEmailValid && this.state.isPwdValid && this.state.isPwd2Valid && this.state.passwordsMatch && !this.state.isEmailEmpty && !this.state.isNameEmpty && !this.state.isPwdEmpty && !this.state.isPwd2Emtpy) {
//TODO
			//fields are valid, submit form and save to data store
			console.log('submitting form and saving data');
		} else {
			//don't submit form
			console.log('cannot submit form. fix validation errors first');
		}
		//clear form
		//regForm.reset();
	}

}