//app/components/AddEvent.jsx

import React from 'react';

export default class AddEvent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			geoLocationChecked: false,
			geoAddressFull: '',
			geoAdd1: '',
			geoCity: '',
			geoZip: '',
			isStartDateValid: true,
			startDateErrors: '',
			isEndDateValid: true,
			endDateErrors: [],
			startDate: null,
			endDate: null,
			isGuestsTextValid: false,
			guestsTextErrors: ''
		}
	}

	componentDidMount() {
		this.getGeolocation();
	}

	render() {
		return (
			<div>
				<h3>Add Event</h3>
				<form className="form-horizontal">
					<div className="form-group">
						<label htmlFor="evt-name" className="col-sm-2 control-label">Event Name</label>
						<div className="col-sm-10">
							<input type="text" id="evt-name" className="form-control" name="evt-name" alt="event name" placeholder="required" required />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-type" className="col-sm-2 control-label">Event Type</label>
						<div className="col-sm-10">
							<input list="evt-type" className="form-control" name="evt-type" alt="event type" />
							<datalist id="evt-type" >
							  <option value="Social" />
							  <option value="Business" />
							  <option value="Other" />
							</datalist>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-host" className="col-sm-2 control-label">Host</label>
						<div className="col-sm-10">
							<input type="text" id="evt-host" className="form-control" name="evt-host" placeholder="individual or organization" required />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-start-date" className="col-sm-2 control-label">Start Date/Time</label>
						<div className="col-sm-10">
							<input id="evt-start-date" className="form-control" type="datetime-local" name="evt-start-date" alt="event start date and time" onChange={this.validateStartDate} required />
							{this.state.isStartDateValid ? null : this.displayStartDateError()}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="evt-end-date" className="col-sm-2 control-label">End Date/Time</label>
						<div className="col-sm-10">
							<input id="evt-end-date" className="form-control" type="datetime-local" name="evt-end-date" alt="event end date and time" onChange={this.validateEndDate} required />
							{this.state.isEndDateValid ? null : this.displayEndDateError()}
						</div>
					</div>

{/*
					<div className="form-group">
						<label htmlFor="evt-end-time" className="col-sm-2 control-label">End Time</label>
						<div className="col-sm-10">
							<input id="evt-end-time" className="form-control" type="time" name="evt-end-time" alt="event end time" onChange={this.validateEndTime} />
							{this.state.isEndTimeValid ? null : this.displayEndTimeError()}
						</div>
					</div>
*/}
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<div className="checkbox">
								<label>
									<input type="checkbox" id="curLocation" alt="checkbox to use geolocation for event location" defaultChecked onChange={this.toggleGeolocation} /> Use current location
								</label>
							</div>
						</div>
					</div>
					<div className="add-group">
{/*
						<div className="form-group">
							<label htmlFor="venue" className="col-sm-2 control-label">Venue</label>
							<div className="col-sm-10">
								<input type="text" id="venue" className="form-control" name="venue" alt="event venue name" placeholder="optional" />
							</div>
						</div>
*/}
						<div className="form-group">
							<label htmlFor="add1" className="col-sm-2 control-label">Street Address</label>
							<div className="col-sm-10">
								<input type="text" id="add1" className="form-control" name="address" alt="event street address" required autoComplete="street-address" value={this.state.geoAdd1} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="city" className="col-sm-2 control-label">City</label>
							<div className="col-sm-10">
								<input type="text" id="city" className="form-control" name="province" alt="event city" required autoComplete="address-level2" value={this.state.geoCity} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="zip" className="col-sm-2 control-label">Zip Code</label>
							<div className="col-sm-10">
								<input type="number" id="zip" className="form-control" name="state" alt="event zip code" required autoComplete="postal-code" value={this.state.geoZip} />
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="event-guests" className="col-sm-2 control-label">Guests</label>
						<div className="col-sm-10">
							<textarea id="event-guests" className={this.getGuestsTextClass()} alt="guest list" onChange={this.validateGuestsText} required placeholder="Separate guests with a new line"></textarea>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="event-msg" className="col-sm-2 control-label">Event Note</label>
						<div className="col-sm-10">
							<input type="text" id="event-msg" className="form-control" name="event-msg" alt="note to attendees" placeholder="optional" />
						</div>
					</div>
					<div className="text-center">
						<button className="btn btn-primary btn-block" id="event-submit" onClick={this.validateEventForm} type="button">Save</button>
					</div>
				</form>
			</div>
		);
	}

	//helpers
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
					results = data['results'][0]['address_components'];
					geoAdd1 = results[0]['short_name'] + ' ' + results[1]['short_name'];
					//console.log('geoAdd1: ' + geoAdd1);
					geoCity = results[2]['short_name'];
					//console.log('geoCity: ' + geoCity);
					geoZip = results[6]['short_name'];
					//console.log('geoZip: ' + geoZip);

					this.setState({
						geoLocationChecked: true,
						geoAdd1: geoAdd1,
						geoCity: geoCity,
						geoZip: geoZip
					});
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
			this.setState({
				geoLocationChecked: false,
				geoAdd1: '',
				geoCity: '',
				geoZip: ''
			});
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
		curDate.setHours(curDate.getHours() - 7);

		let startDateInp = document.getElementById('evt-start-date');
		//console.log('startDateInp val: ' + startDateInp.value);
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
				startDate: null}
			);
		} else {
			//clear errors
			this.setState(
				{isStartDateValid: true,
				startDateErrors: '',
				startDate: startDate.getTime()}
			);
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
		curDate.setHours(curDate.getHours() - 7);

		let endDateInp = document.getElementById('evt-end-date');
		let endDate =  new Date(endDateInp.value);
		console.log('endDate: ' + endDate);
		if (endDate.getTime() < curDate.getTime()) {
			//error condition
			console.log('endDate ms: ' + endDate.getTime());
			console.log('curDate ms: ' + curDate.getTime());
			endDateErrors.push('The end date and time should be in the future');
		}

		if (this.state.startDate && endDate.getTime() < this.state.startDate) {
			endDateErrors.push('The end date should be after the start date');
		}

		if (endDateErrors.length > 0) {
			console.log('there are endDate errors');
			this.setState(
				{isEndDateValid: false,
				endDateErrors: endDateErrors,
				endDate: null}
			);
		} else {
			console.log('no endDate errors');

			//clear errors
			this.setState(
				{isEndDateValid: true,
				endDateErrors: [],
				endDate: endDate.getTime()}
			);
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
				<p className="end-date-error error">{err}</p>
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
	 * On form submit, would verify that there are no input errors. If error free, submit form.
	 */
	validateEventForm = () => {
		let guestAr = this.guestStrToList();
//TODO
		//if (this.state.isStartDateValid && this.state.isEndTimeValid) {
			//submit form, save to data store
		//} else {
			//prevent submit, give error msg
		//}
	}

}