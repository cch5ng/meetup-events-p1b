//app/components/AddEvent.jsx

import React from 'react';
import uuid from 'node-uuid';

export default class AddEvent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isEventNameEmpty: true,
			isEventTypeEmpty: true,
			isHostEmpty: true,
			geoLocationChecked: true,
			geoAddressFull: '',
			geoAdd1: '',
			geoCity: '',
			geoZip: '',
			isAdd1Empty: true,
			isCityEmpty: true,
			isZipEmpty: true,
			isStartDateValid: true,
			isStartDateEmpty: true,
			startDateErrors: '',
			isEndDateValid: true,
			isEndDateEmpty: true,
			endDateErrors: [],
			startDate: null,
			endDate: null,
			isGuestsTextValid: false,
			isGuestsTextEmpty: true,
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
									<input type="checkbox" id="curLocation" defaultChecked onChange={this.toggleGeolocation} /> Use current location
								</label>
							</div>
						</div>
					</div>
					<div className="add-group">
						<div className="form-group">
							<label htmlFor="add1" className="col-sm-2 control-label">Street Address</label>
							<div className="col-sm-10">
								<input type="text" id="add1" className="form-control" name="address" required autoComplete="street-address" /> {/*value={this.state.geoAdd1} */}
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="city" className="col-sm-2 control-label">City</label>
							<div className="col-sm-10">
								<input type="text" id="city" className="form-control" name="province" required autoComplete="address-level2" /> {/* value={this.state.geoCity}*/}
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="zip" className="col-sm-2 control-label">Zip Code</label>
							<div className="col-sm-10">
								<input type="text" id="zip" className="form-control" name="state" required autoComplete="postal-code" /> {/*  value={this.state.geoZip}*/}
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="event-guests" className="col-sm-2 control-label">Guests</label>
						<div className="col-sm-10">
							<textarea id="event-guests" className={this.getGuestsTextClass()} onChange={this.validateGuestsText} required placeholder="Separate guests with a new line"></textarea>
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

					// this.setState({
					// 	geoLocationChecked: true,
					// 	geoAdd1: geoAdd1,
					// 	geoCity: geoCity,
					// 	geoZip: geoZip
					// });
					//console.log('this: ' + this);
					//console.log('state geoAdd1: ' + this.state.geoLocationChecked);
				}.bind(that)).fail(function(jqXHR, textStatus, errorThrown) {
					console.log('err: ' + errorThrown);
				}.bind(that));

			}, function(error) {
				console.log('sorry, unable to retrieve location');
			});
		}
	};

	/**
	 *@param
	 *@return
	 * Handles change on checkbox to use geolocation for form location fields auto completion.
	 */
	toggleGeolocation = () => {
		if (this.state.geoLocationChecked) {
			this.setState({geoLocationChecked: false});
			let add1 = document.getElementById('add1');
			let city = document.getElementById('city');
			let zip = document.getElementById('zip');
			add1.value = '';
			city.value = '';
			zip.value = '';


			// this.setState({
			// 	geoLocationChecked: false,
			// 	geoAdd1: '',
			// 	geoCity: '',
			// 	geoZip: ''
			// });
		} else {
			this.setState({
				geoLocationChecked: true
			});
			this.getGeolocation();
		}
	}

	/**
	 *@param
	 *@return
	 * 
	 */
	// getCurDate = () => {
	// 	let curDate = new Date();
	// 	curDate.setHours(curDate.getHours() - 7);
	// 	//console.log('curDate: ' + curDate);
	// 	return curDate;
	// }

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
	 * Checks that the end time is later than the start time.
	 */
	// validateEndTime = () => {
	// 	let isEndTimeValid;
	// 	let endTimeErrors = '';
	// 	let endTimeMin = this.timeStrToMinutes(); 

	// 	if (this.state.startTimeMin < endTimeMin) {
	// 		this.setState({
	// 			isEndTimeValid: true,
	// 			endTimeErrors: ''
	// 		});
	// 	} else {
	// 		this.setState({
	// 			isEndTimeValid: false,
	// 			endTimeErrors: 'The end time should be later than the start time'
	// 		});
	// 	}
	// }

	/**
	 *@param
	 *@return
	 * If the end time validation fails, displays the error message.
	 */
	// displayEndTimeError = () => {
	// 	return (
	// 		<p className="end-time-error error">{this.state.endTimeErrors}</p>
	// 	)
	// }

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
		if (this.state.isGuestsTextValid) {
			return 'form-control valid';
		} else {
			return 'form-control invalid';
		}
	}

	validateGuestsText = () => {
		let guests = document.getElementById('event-guests');
		if (guests.value.length == 0) {
			this.setState({
				isGuestsTextValid: false,
				guestsTextErrors: 'Please enter a guest name'}
			);
		} else {
			this.setState({
				isGuestsTextValid: true,
				guestsTextErrors: ''}
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
//TODO
		//if (this.state.isStartDateValid && this.state.isEndTimeValid) {
			//submit form, save to data store
			//console.log('all fields are valid, submit form data');
		//} else {
			//prevent submit, give error msg
			//console.log('there are invalid fields that need to be fixed before the form can be submitted');
		//}
		//clear form
		//formAddEvent.reset();
	}

}