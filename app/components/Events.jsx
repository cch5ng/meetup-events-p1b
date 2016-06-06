//app/components/Events.jsx

import React from 'react';
import Event from './Event.jsx';
import uuid from 'node-uuid';

export default class Events extends React.Component {
	constructor(props) {
		super();

		this.state = {
			events: [
				{key: "id0001",
					name : "Birthday",
					type : "social",
					host : "Annie",
					startDate : 1465135200000,
					endDate : 1465142400000,
					venue: 'Hammer Museum',
					add1 : "10899 Wilshire Boulevard",
					city : "Los Angeles",
					zip : "90024",
					msg : "Join us for cocktails and appetizers. No need to bring gifts. Email annieRUok@m.com for questions.",
					guests : ["Sarah M.", "Alice W.", "Fred F."]
				},
				{key: "id0002",
					name : "Anniversary",
					type : "social",
					host : "Bill",
					startDate : 1465135200000,
					endDate : 1465142400000,
					venue: 'Cheesecake Factory',
					add1 : "605 North Harbor Drive",
					city : "Redondo Beach",
					zip : "90277",
					msg : "Come celebrate the 10th anniversary of our meetup. Potluck.",
					guests : ["Wilma F.", "Ruby F.", "Gillaume F."]
				},
				{key: "id0003",
					name : "Networking",
					type : "work",
					host : "Bobbie",
					startDate : 1465135200000,
					endDate : 1465142400000,
					venue: 'Santa Monica Library',
					add1 : "601 Santa Monica Blvd.",
					city : "Santa Monica",
					zip : "90401",
					msg : "Networking and lightning talks. Contact bobbieb@m.com to sign up for a talk.",
					guests : ["Hank A.", "William M.", "Monica S."]
				}
			]
		};
	}

	render() {
		return (
			<div className="">
				{this.state.events.map(event =>
					<Event key={event.key} name={event.name} type={event.type} host={event.host} venue={event.venue} add1={event.add1} city={event.city} zip={event.zip} startDate={event.startDate} endDate={event.endDate} msg={event.msg} guests={event.guests} />
				)}
			</div>
		)
	}

}