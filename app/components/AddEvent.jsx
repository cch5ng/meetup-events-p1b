//app/components/AddEvent.jsx

import React from 'react';
import uuid from 'node-uuid';

export default class AddEvent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isEventNameEmpty: false,
			isEventTypeEmpty: false,
			isHostEmpty: false,
			geoLocationChecked: true,
			geoAddressFull: '',
			geoAdd1: '',
			geoCity: '',
			geoZip: '',
			isAdd1Empty: false,
			isCityEmpty: false,
			isZipEmpty: false,
			isStartDateValid: true,
			isStartDateEmpty: false,
			startDateErrors: '',
			isEndDateValid: true,
			isEndDateEmpty: false,
			endDateErrors: [],
			startDate: null,
			endDate: null,
			isGuestsTextValid: false,
			isGuestsTextEmpty: false,
			guestsTextErrors: ''
		}
	}

	componentDidMount() {
		//used to autopopulate address fields
		this.getGeolocation();
		//workaround for autofocus on single page app
		if (!(document.getElementById('evt-name').hasAttribute('autofocus'))) {
			document.getElementById('evt-name').focus();
		}
	}

	render() {
		return (
			<div>
				<h3>Add Event</h3>
				<form className="form-horizontal" id="form-add-event">
					<div className="form-group">
						<label htmlFor="evt-name" className="col-sm-2 control-label">Event Name</label>
						<div className="col-sm-10">
							<input type="text" id="evt-name" className="form-control" name="evt-name" onChange={this.validateEventName} placeholder="required" autoFocus required />
							{this.state.isEventNameEmpty ? this.displayRequiredError() : null }
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-type" className="col-sm-2 control-label">Event Type</label>
						<div className="col-sm-10">
							<input list="evt-type" id="evt-type-list" className="form-control" name="evt-type" onChange={this.validateEventType} required />
							<datalist id="evt-type">
							  <option value="Social" />
							  <option value="Business" />
							  <option value="Other" />
							</datalist>
							{this.state.isEventTypeEmpty ? this.displayRequiredError() : null }
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-host" className="col-sm-2 control-label">Host</label>
						<div className="col-sm-10">
							<input type="text" id="evt-host" className="form-control" name="evt-host" onChange={this.validateHost} placeholder="individual or organization" required />
							{this.state.isHostEmpty ? this.displayRequiredError() : null }
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-start-date" className="col-sm-2 control-label">Start Date/Time</label>
						<div className="col-sm-10">
							<input id="evt-start-date" className="form-control" type="datetime-local" name="evt-start-date" onChange={this.validateStartDate} aria-labelledby="evt-start-date" required />
							{this.state.isStartDateValid ? null : this.displayStartDateError()}
							{this.state.isStartDateEmpty ? this.displayRequiredDateError() : null }
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-end-date" className="col-sm-2 control-label">End Date/Time</label>
						<div className="col-sm-10">
							<input id="evt-end-date" className="form-control" type="datetime-local" name="evt-end-date" onChange={this.validateEndDate} aria-labelledby="evt-end-date" required />
							{this.state.isEndDateValid ? null : this.displayEndDateError()}
							{this.state.isEndDateEmpty ? this.displayRequiredDateError() : null }
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<div className="checkbox">
								<label>
									<input type="checkbox" id="curLocation" defaultChecked onChange={this.toggleGeolocation} /> Use current location (may take a few moments)
								</label>
							</div>
						</div>
					</div>
					<div className="add-group">
						<div className="form-group">
							<label htmlFor="add1" className="col-sm-2 control-label">Street Address</label>
							<div className="col-sm-10">
								<input type="text" id="add1" className="form-control" name="address" onChange={this.validateAdd1} required autoComplete="street-address" /> {/*value={this.state.geoAdd1} */}
								{this.state.isAdd1Empty ? this.displayRequiredError() : null }
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="city" className="col-sm-2 control-label">City</label>
							<div className="col-sm-10">
								<input type="text" id="city" className="form-control" name="province" onChange={this.validateCity} required autoComplete="address-level2" /> {/* value={this.state.geoCity}*/}
								{this.state.isCityEmpty ? this.displayRequiredError() : null }
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="zip" className="col-sm-2 control-label">Zip Code</label>
							<div className="col-sm-10">
								<input type="text" id="zip" className="form-control" name="state" onChange={this.validateZip} required autoComplete="postal-code" /> {/*  value={this.state.geoZip}*/}
								{this.state.isZipEmpty ? this.displayRequiredError() : null }
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="event-guests" className="col-sm-2 control-label">Guests</label>
						<div className="col-sm-10">
							<textarea id="event-guests" className={this.getGuestsTextClass()} onChange={this.validateGuestsText} required placeholder="Separate guests with a new line"></textarea>
							{this.state.isGuestsTextEmpty ? this.displayRequiredError() : null }
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="event-msg" className="col-sm-2 control-label">Event Note</label>
						<div className="col-sm-10">
							<input type="text" id="event-msg" className="form-control" name="event-msg" placeholder="optional" />
						</div>
					</div>
					<div className="text-center">
						<button className="btn btn-primary btn-block" id="event-submit" onClick={this.validateEventForm} type="submit">Save</button>
					</div>
				</form>
			</div>
		);
	}

	//helpers
//TODO refactor same funciton in Registration comp
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
	 * Verify that Event Name is not empty.
	 */
	validateEventName = () => {
		let eventName = document.getElementById('evt-name');

		if (eventName.value.length === 0) {
			this.setState({isEventNameEmpty: true});
		} else {
			this.setState({isEventNameEmpty: false});
		}
	}

	/**
	 *@param
	 *@return
	 * Verify that Event Type is not empty.
	 */
	validateEventType = () => {
		let eventType = document.getElementById('evt-type-list');

		if (eventType.value.length === 0) {
			this.setState({isEventTypeEmpty: true});
		} else {
			this.setState({isEventTypeEmpty: false});
		}
	}

	/**
	 *@param
	 *@return
	 * Verify that Host name is not empty.
	 */
	validateHost = () => {
		let eventHost = document.getElementById('evt-host');

		if (eventHost.value.length === 0) {
			this.setState({isHostEmpty: true});
		} else {
			this.setState({isHostEmpty: false});
		}
	}

	/**
	 *@param
	 *@return
	 * Use geolocation api to populate location address fields with current location.
	 */
	getGeolocation = () => {
		var that = this;
		let geoLocationChk = document.getElementById('curLocation');
		var myInit = { method: 'GET',
			mode: 'cors',
			cache: 'default' };
		//check geolocation
		var reverseGeoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
		var lat, long, geoAdd1, geoCity, geoZip;
		//array representation of geolocation (add1, city, zip)
		let geoAddFullAr = [];
		var results;

		if ("geolocation" in navigator) {
			//console.log('geolocation supported');
			navigator.geolocation.getCurrentPosition(function(position) {
				lat = position.coords.latitude;
				long = ',' + position.coords.longitude;
				reverseGeoCodeUrl += lat + long;

				$.ajax(reverseGeoCodeUrl).done(function(data) {
					let add1 = document.getElementById('add1');
					let city = document.getElementById('city');
					let zip = document.getElementById('zip');
					results = data['results'][0]['address_components'];
					geoAdd1 = results[0]['short_name'] + ' ' + results[1]['short_name'];
					//console.log('geoAdd1: ' + geoAdd1);
					geoCity = results[2]['short_name'];
					//console.log('geoCity: ' + geoCity);
					geoZip = results[6]['short_name'];
					//console.log('geoZip: ' + geoZip);

					add1.value = geoAdd1;
					city.value = geoCity;
					zip.value = geoZip;

					//console.log('this: ' + this);
					//console.log('state geoAdd1: ' + this.state.geoLocationChecked);
				}.bind(that)).fail(function(jqXHR, textStatus, errorThrown) {
					console.log('err: ' + errorThrown);
				}.bind(that));

			}, function(error) {
				console.log('sorry, unable to retrieve location');
				this.setState({
					isAdd1Empty: true,
					isCityEmpty: true,
					isZipEmpty: true
				});
			});
		}
	};

	/**
	 *@param
	 *@return
	 * Handles change on checkbox to use geolocation for form location fields auto completion.
	 */
	toggleGeolocation = () => {
		//condition where user unchecks use current location checkbox
		if (this.state.geoLocationChecked) {
			let add1 = document.getElementById('add1');
			let city = document.getElementById('city');
			let zip = document.getElementById('zip');
			add1.value = '';
			city.value = '';
			zip.value = '';
			this.setState({
				geoLocationChecked: false,
				isAdd1Empty: true,
				isCityEmpty: true,
				isZipEmpty: true
			});
		} else {
			//condition where user checks user current location checkbox
			this.setState({
				geoLocationChecked: true,
				isAdd1Empty: false,
				isCityEmpty: false,
				isZipEmpty: false
			});
			this.getGeolocation();
		}
	}

	/**
	 *@param
	 *@return
	 * Checks whether the add1 field is empty.
	 */
	validateAdd1 = () => {
		let add1 = document.getElementById('add1');
		if (add1.value.length === 0) {
			this.setState({isAdd1Empty: true});
		} else {
			this.setState({isAdd1Empty: false});
		}
	}

	/**
	 *@param
	 *@return
	 * Checks whether the city field is empty.
	 */
	validateCity = () => {
		let city = document.getElementById('city');
		if (city.value.length === 0) {
			this.setState({isCityEmpty: true});
		} else {
			this.setState({isCityEmpty: false});
		}
	}

	/**
	 *@param
	 *@return
	 * Checks whether the zip code field is empty.
	 */
	validateZip = () => {
		let zip = document.getElementById('zip');
		if (zip.value.length === 0) {
			this.setState({isZipEmpty: true});
		} else {
			this.setState({isZipEmpty: false});
		}
	}


	/**
	 *@param
	 *@return
	 * Checks whether the start date/time is after the current date. If the check fails, it sets an error message in state.
	 */
	validateStartDate = () => {
		let curDate = new Date();
		let isStartDateEmpty;
		//fix for local PDT time
		curDate.setHours(curDate.getHours() - 7);

		let startDateInp = document.getElementById('evt-start-date');
		//console.log('startDateInp val: ' + startDateInp.value);

		//check if field empty
		if (startDateInp.value.length === 0) {
			isStartDateEmpty = true;
		} else {
			isStartDateEmpty = false;
		}

		let startDate =  new Date(startDateInp.value);
		//console.log('startDate: ' + startDate);
		//console.log('curDate: ' + curDate);
		//verify start date later than cur date/time
		//console.log('startDate ms: ' + startDate.getTime());
		//console.log('curDate ms: ' + curDate.getTime());
		if (startDate.getTime() < curDate.getTime()) {
			//error condition
			this.setState(
				{isStartDateValid: false,
				startDateErrors: 'The start date and time should be in the future',
				startDate: null,
				isStartDateEmpty: isStartDateEmpty
			});
		} else {
			//clear errors
			this.setState(
				{isStartDateValid: true,
				startDateErrors: '',
				startDate: startDate.getTime(),
				isStartDateEmpty: isStartDateEmpty
			});
		}
	}

	/**
	 *@param
	 *@return
	 * Displays start date/time validation error.
	 */
	displayStartDateError = () => {
		return (
			<p className="start-date-error error">{this.state.startDateErrors}</p>
		)
	}

	/**
	 *@param
	 *@return
	 * Checks whether the end date/time is after the current date and after the start date. If the check fails, it sets an error message in state.
	 */
	validateEndDate = () => {
		let curDate = new Date();
		let endDateErrors = [];
		let isEndDateEmpty;
		curDate.setHours(curDate.getHours() - 7);

		let endDateInp = document.getElementById('evt-end-date');
		let endDate =  new Date(endDateInp.value);
		//console.log('endDate: ' + endDate);

		//check if field empty
		if (endDateInp.value.length === 0) {
			isEndDateEmpty = true;
		} else {
			isEndDateEmpty = false;
		}

		if (endDate.getTime() < curDate.getTime()) {
			//error condition
			console.log('endDate ms: ' + endDate.getTime());
			console.log('curDate ms: ' + curDate.getTime());
			endDateErrors.push('The end date and time should be in the future');
		}

		if (this.state.startDate && endDate.getTime() < this.state.startDate) {
			//console.log('end date is before the start date');
			endDateErrors.push('The end date should be after the start date');
		}

		if (endDateErrors.length > 0) {
			console.log('there are endDate errors');
			this.setState(
				{isEndDateValid: false,
				endDateErrors: endDateErrors,
				endDate: null,
				isEndDateEmpty: isEndDateEmpty
			});
		} else {
			console.log('no endDate errors');

			//clear errors
			this.setState(
				{isEndDateValid: true,
				endDateErrors: [],
				endDate: endDate.getTime(),
				isEndDateEmpty: isEndDateEmpty
			});
		}
	}

	/**
	 *@param
	 *@return
	 * Displays start date/time validation error.
	 */
	displayEndDateError = () => {
		let endDateErrors = this.state.endDateErrors;
		return (
			endDateErrors.map(err => 
				<p className="end-date-error error" key={this.genKey()} >{err}</p>
			)
		);
	}

	/**
	 *@param
	 *@return
	 * Converts time portion from the start date/time to units minutes. This allows for simplest comparison with the end time.
	 */
	dateStrToTimeMinutes = (dateStr) => {
		let dateAr = [];
		let timeMinutes, timeHours;
		dateAr = dateStr.split('T');
		timeHours = parseInt(dateAr[1].split(':')[0]);
		//console.log('timeHours: ' + timeHours);
		//console.log('typeof timeHours: ' + typeof timeHours);
		timeMinutes = parseInt(dateAr[1].split(':')[1]);
		//console.log('timeMinutes: ' + timeMinutes);
		//console.log('typeof timeMinutes: ' + typeof timeMinutes);

		timeMinutes += timeHours * 60;
		//console.log('timeMinutes: ' + timeMinutes);

		return timeMinutes;
	}

	/**
	 *@param
	 *@return
	 * Converts the end time to units minutes. Allows for comparison with the start time.
	 */
	timeStrToMinutes = () => {
		let endTime = document.getElementById('evt-end-time');
		let endHours, endMinutes;
		//console.log('endTime: ' + endTime.value);
		//console.log('typeof endTime: ' + typeof endTime.value);

		endHours = parseInt(endTime.value.split(':')[0]);
		endMinutes = parseInt(endTime.value.split(':')[1]);

		endMinutes += endHours * 60;
		return endMinutes;
	}

	/**
	 *@param
	 *@return
	 * Converts string format of guest list to an array.
	 */
	//parse guest string input val to array
	guestStrToList = () => {
		let guests = document.getElementById('event-guests');
		return guests.value.split('\n');
	}

	/**
	 *@param
	 *@return
	 * 
	 */
	getGuestsTextClass = () => {
		if (!this.state.isGuestsTextEmpty) {
			return 'form-control valid';
		} else {
			return 'form-control invalid';
		}
	}

	validateGuestsText = () => {
		let guests = document.getElementById('event-guests');
		if (guests.value.length == 0) {
			this.setState({
				isGuestsTextEmpty: true}
			);
		} else {
			this.setState({
				isGuestsTextEmpty: false}
			);
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
	 * Displays an error for required datetime-local fields which are empty.
	 */
	displayRequiredDateError = () => {
		return (
			<p className="required-error error">Please enter a date and time.</p>
		)
	}


	/**
	 *@param
	 *@return
	 * On form submit, would verify that there are no input errors. If error free, submit form.
	 */
	validateEventForm = (e) => {
		let formAddEvent = document.getElementById('form-add-event');
//QUESTION, I learned on form submit that I should call preventDefault() to prevent refreshing the page for SPA's
//but in this case, it prevents the browser from responding to the "required" attribute, how do you handle this?
		e.preventDefault();
		let guestAr = this.guestStrToList();

		if (this.state.isStartDateValid && this.state.isEndDateValid && !this.state.isEventNameEmpty && !this.state.isEventTypeEmpty  && !this.state.isHostEmpty  && !this.state.isAdd1Empty  && !this.state.isCityEmpty  && !this.state.isZipEmpty && !this.state.isStartDateEmpty && !this.state.isEndDateEmpty && !this.state.isGuestsTextEmpty) {
			//TODO save to data store
			//submit form, 
			console.log('all fields are valid, submit form data');
			//clear form
			formAddEvent.reset();
			this.setState({
				isEventNameEmpty: true,
				isEventTypeEmpty: true,
				isHostEmpty: true,
				isAdd1Empty: true,
				isCityEmpty: true,
				isZipEmpty: true,
				isStartDateEmpty: true,
				isEndDateEmpty: true,
				isGuestsTextEmpty: true
			});
			this.getGeolocation();
		} else {
			//prevent submit, give error msg
			//console.log('this.state.isStartDateValid: ' + this.state.isStartDateValid);
			//console.log('this.state.isEndTimeValid: ' + this.state.isEndTimeValid);
			console.log('there are invalid fields that need to be fixed before the form can be submitted');
		}
	}

}