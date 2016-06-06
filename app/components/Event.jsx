//app/components/Event.jsx

import React from 'react';
import Rebase from 're-base';
import uuid from 'node-uuid';

export default class Event extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: this.props.name,
			type: this.props.type,
			host: this.props.host,
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			venue: this.props.venue,
			add1: this.props.add1,
			city: this.props.city,
			zip: this.props.zip,
			msg: this.props.msg,
			guests: this.props.guests
		}
	}

	render() {
		return (
			<div>
				<details>
					<summary className="event-heading">
						<b>{this.state.name}</b>  (on {this.friendlyDate(this.state.startDate)})
					</summary>
					<ul className="event-list">
						<li className="event-item"><b>Type</b> {this.state.type}</li>
						<li className="event-item"><b>Host</b> {this.state.host}</li>
						<li className="event-item"><b>Date</b> {this.friendlyDate(this.state.startDate)} - {this.friendlyDate(this.state.endDate)}</li>
{/* TODO fix location*/}
						<li className="event-item"><b>Location</b> {this.aggregateLocation()}</li>
						<li className="event-item"><b>Message from Host</b> {this.state.msg}</li>
						<li className="event-item"><b>Guests</b> {this.friendlyGuestList()}</li>
					</ul>
				</details>
			</div>
		);
	}

	//helpers
	/**
	 *@param
	 *@return
	 * Combines address related inputs into one string for display.
	 */
	aggregateLocation = () => {
		let location = '';
		location = this.state.venue + ', ' + this.state.add1 + ', ' + this.state.city + ' ' + this.state.zip;
		return location;
	};

	/**
	 *@param
	 *@return
	 * Converts data (milliseconds format) to user friendly date.
	 */
	friendlyDate = (dateMs) => {
		let objDate = new Date(dateMs);
		let fDate = '';
		let fTime = this.friendlyTime(objDate.getHours(), objDate.getMinutes());
		fDate = (objDate.getMonth() + 1) + '/' + objDate.getDate() + '/' + objDate.getFullYear() + ' at ' + fTime;
		return fDate;
	};

	/**
	 *@param <str> hours, <str> minutes
	 *@return <str> time
	 * Converts time to user friendly format.
	 */
	friendlyTime = (hours, minutes) => {
		let fTime = '',
			fHours = '',
			fMinutes = '',
			suffix = '';

		if (hours > 12) {
			suffix = 'pm';
			fHours = (hours - 12).toString();
		} else {
			suffix = 'am';
			fHours = hours.toString();
		}

		if (minutes < 10) {
			fMinutes = '0' + minutes.toString();
		} else {
			fMinutes = minutes.toString();
		}

		fTime = fHours + ':' + fMinutes + suffix;
		return fTime;
	};

	/**
	 *@param
	 *@return
	 * Converts an array of strings to one string (comma-delimited)
	 */
	friendlyGuestList = () => {
		let fList = '',
			len = this.state.guests.length;
		this.state.guests.forEach((guest, idx) => {
			if (idx < len - 1) {
				fList += guest + ', ';
			} else {
				fList += guest;
			}
		});
		return fList;
	};

}