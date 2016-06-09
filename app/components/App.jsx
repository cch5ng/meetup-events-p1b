//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.jsx';
import Events from './Events.jsx';
import Event from './Event.jsx';
import AddEvent from './AddEvent.jsx';
import Registration from './Registration.jsx';
import {Link, IndexLink} from 'react-router';
//import NavLink from './NavLink.js';

export default class App extends React.Component {
	constructor(props) {
		super();
		let namesAr = [];
		this.state = {
			recipes: [],
			show: false,
			nameValid: 'success'
		};
	}

	// componentWillMount() {
	// }

	render() {
		let recipes = this.state.recipes;
		return (
			<div className="container-fluid">
				<div className="row">
					<header>
						<nav className="navbar navbar-default">
							<div className="container-fluid">
								<div className="navbar-header">
									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
									<IndexLink to='/' className="navbar-brand header-link" activeClassName='active'>Meetup Events</IndexLink>
								</div>

								<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
									<ul className="nav navbar-nav navbar-right">
										<li><Link to='/addEvent' className="header-link" >Add Event</Link></li>
										<li><Link to='/events' className="header-link" >Events</Link></li>
		{/* TODO fix link */}
										<li><Link to='/registration' className="header-link" >Register</Link></li>
									</ul>
								</div>{/* /.navbar-collapse */}
							</div>{/* /.container-fluid */}
						</nav>
					</header>
				</div>

			{this.props.children}

				<div className="row footer">
					<div className="col-xs-12 col-sm-12">
						<p className="text-center">Brought to you with <i className="fa fa-heart"></i><br /> 
							from <a href="http://www.carolchung.com" target="_blank">Tusk Tusk Dev.</a><br />
							<a href="https://github.com/cch5ng/meetup-events-p1b" target="_blank">Source</a>
						</p>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Adds recipe to local storage and to state
	 * @param  {[type]} event [description]
	 * result: update firebase
	 */
	addRecipe = (event) => {
		if (this.state.nameValid === 'success') {
			let name = document.getElementById('recipeName').value;
			event.preventDefault();

			//parsing the ingredients, cleaning up the format so it will display cleanly later on
			var ingredientsStr = document.getElementById('recipeIngredients').value;
			var ingredientsAr = ingredientsStr.split(',');
			//stores final array of ingredients strings, trimmed
			var ingredientsTrim = [];
			ingredientsAr.forEach(function(item) {
				var itemCopy = item.slice(0).trim();
				ingredientsTrim.push(itemCopy);
			});

			var stepsStr = document.getElementById('recipeSteps').value;
			var stepsAr = stepsStr.split('\n');

			//authenticate session before insert
			let authData = base.getAuth();
			if (authData) {
				base.push('recipes', {
					data:  {name: name,
						owner: 'cchung',
						ingredients: ingredientsTrim,
						steps: stepsAr
					},
					then(){
						//console.log('inserted recipe');
					}
				});
			} else {
				base.authWithOAuthPopup('google', (error, authData) => {
					if (error) {
						console.log("Login Failed!", error);
					} else {
						console.log("Authenticated successfully with payload");
						//update firebase
					}
				}, {
					remember: 'sessionOnly'
				});
			}
		}
	};

	/**
	 * Form validation to ensure that a new name field is unique (key in localStorage)
	 * @param  {[type]} event [description]
	 * 
	 */
	validationState = (event) => {
		this.setState({
			nameValid: 'success'
		})
		let curName = event.target.value;
		let namesAr = [];
		let recipesAr = this.state.recipes;
		let keysAr = [];
		recipesAr.map(function(recipe) {
			if (recipe.name === curName) {
				namesAr.push(recipe.name);
			}
		});

		for (let i = 0; i < namesAr.length; i++) {
			if (curName === namesAr[i]) {
				this.setState({nameValid: 'error'});
			} else {
				this.setState({nameValid: 'success'});
			}
		}
	};

	/**
	 * Deletes a recipe from localStorage and state (recipes array). Triggered from Recipe.jsx button.
	 * @param  {String} id - Recipe id
	 * @result: update firebase
	 */
	deleteRecipe = (key) => {
		var onComplete = function(error) {
			if (error) {
				console.log('synchronization issue: ' + error);
			} else {
			}
		}

		//authenticate session before insert
		let authData = recipesRef.getAuth();
		if (authData) {
			//update firebase
			recipesRef.child(key).remove(onComplete);
		} else {
			recipesRef.authWithOAuthPopup('google', (error, authData) => {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload");
				}
			}, {
				remember: 'sessionOnly'
			});
		}
	};

	/**
	 * Triggers rebase authWithOAuthPopup() function for google-based login.
	 * @param  {String} id - Recipe id
	 * result: log into both Google and firebase
	 */
	googleLogin = () => {
		base.authWithOAuthPopup('google', (error, authData) => {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload");
			}
		}, {
			remember: 'sessionOnly'
		});
	}

	/**
	 * Log out of firebase
	 * @param  {String} id - Recipe id
	 * result: log out of firebase but does not log out of Google acct
	 */
	logOut = () => {
		base.unauth();
		if (recipesRef.getAuth()) {
			recipesRef.unauth();
		}
	}
}