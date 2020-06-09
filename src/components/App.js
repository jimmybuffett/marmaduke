import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About"
import Show from "./Show"
import Player from "./Player"

import mixesData from "../data/mixes";
import actions from '../store/actions';



class App extends Component {

	fetchMixes = async () => {
		const { addMix } = this.props

		mixesData.map(async (id) => {
			try {
				// always remember AWAIT when using fetch in an async function
				const response = await fetch(`https://api.mixcloud.com${id}`);
				const data = await response.json();

				addMix(data);
			} catch (error) {
				console.log("error");
			}
		});
	};

	componentDidMount() {
		this.fetchMixes();
	}

	render() {
		return (
			<Router>
				<div className="flex-l justify-end">
					<FeaturedMix />
					<div className="w-50-l relative z-1">
						<Header />
						{/* RoutedPage */}
						<Route
							exact
							path="/"
							component={Home}
						/>
						<Route
							path="/archive"
							component={Archive}
						/>
						<Route path="/about" component={About} />

						<Route path="/show/:slug"
						// pass in the route params so that we can access the url of the current show page
						render={routeParams => <Show {...routeParams} {...this.state}/>} />
					</div>
				</div>
				<Player />
			</Router>
		);
	}
}

export default connect(state => state, actions)(App);
