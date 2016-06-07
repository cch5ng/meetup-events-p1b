//app/components/Registration.jsx

import React from 'react';

export default class Registration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			isEmailValid: true,
			emailErrors: null,
			isPwdValid: true,
			pwdErrors: [],
			isPwd2Valid: true,
			pwd2Errors: [],
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
							<input type="text" id="name" className="form-control" name="name" alt="user name" required autoComplete="name" autoFocus placeholder="Full Name" />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="email" className="col-sm-2 control-label">Email Address</label>
						<div className="col-sm-10">
							<input id="email" className="form-control" name="email" type="email" alt="email address" onChange={this.validateEmail} required autoComplete="email" placeholder="name@example.com" />
							{this.state.isEmailValid ? null : this.displayEmailError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="pwd" className="col-sm-2 control-label">Password</label>
						<div className="col-sm-10">
							<input id="pwd" className="form-control" name="pwd" type="password" alt="password" onChange={this.validatePwd} placeholder=">= 8 chars, 1 num, 1 CAP, 1 special char" required />
							{this.state.isPwdValid ? null : this.displayPwdError()}
							{this.state.passwordsMatch ? null : this.displayPwdMatchError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="pwd2" className="col-sm-2 control-label">Confirm Password</label>
						<div className="col-sm-10">
							<input id="pwd2" className="form-control" name="pwd2" type="password" alt="confirm password" onChange={this.validatePwd2} placeholder=">= 8 chars, 1 num, 1 CAP, 1 special char" required />
							{this.state.isPwd2Valid ? null : this.displayPwd2Error()}
							{this.state.passwordsMatch ? null : this.displayPwdMatchError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="title" className="col-sm-2 control-label">Title</label>
						<div className="col-sm-10">
							<input type="text" id="title" className="form-control" name="title" alt="title" placeholder="optional" />
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
	 * Verifies that the email has the correct data format. If not, sets an error message in the state.
	 */
	validateEmail = (e) => {
		//console.log('email event handler');
		var email = document.getElementById('email');

		if (email.value.match(/\w+@\w+.\w+/g)) {
			this.setState({isEmailValid: true, emailErrors: ''})
			email.setCustomValidity('');
			//console.log('isEmailValid: ' + this.state.isEmailValid);
		} else {
			this.setState({isEmailValid: false, emailErrors: 'Email address should have the format: name@mail.com'})
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
			this.setState({isPwdValid: true, pwdErrors: []})
			pwd.setCustomValidity('');
		} else {
			this.setState({isPwdValid: false, pwdErrors: pwdErrorsAr})
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
			this.setState({isPwd2Valid: true, pwd2Errors: []})
			pwd2.setCustomValidity('');
		} else {
			this.setState({isPwd2Valid: false, pwd2Errors: pwdErrorsAr2})
			pwd2.setCustomValidity(pwdErrorsAr2.join('. '));
		}

		this.passwordsMatch();
		//console.log('pwdErrorsAr2: ' + pwdErrorsAr2);
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
				<p className="pwd-error error">{err}</p>
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
				<p className="pwd-error error">{err}</p>
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
	 * On form submit, verifies that there are no input errors.
	 */
	validateForm = (e) => {
//NOTE to REVIEWER, moved check for passwords here b/c had difficulty troubleshooting removal of mismatched
//passwords error message when the issue was resolved on password input change (might have been bad js logic)
		this.passwordsMatch();

		if ( this.state.isEmailValid && this.state.isPwdValid && this.state.isPwd2Valid && this.state.passwordsMatch) {
//TODO
			//fields are valid, submit form and save to data store
			console.log('submitting form and saving data');
		} else {
			//don't submit form
			console.log('cannot submit form. fix validation errors first');
		}
	}

}