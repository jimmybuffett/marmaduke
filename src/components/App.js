/*global Mixcloud*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About"

import mixesData from "../data/mixes";



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// whether a mix is playing or not
			playing: false,
			currentMix: "",
			mixIds: mixesData,
			mix: null,
			mixes: [],
		};
	}

	// /teamteamwork/dude-whatever-its-summer-2019/
	fetchMixes = async () => {
		const { mixIds } = this.state;

		mixIds.map(async (id) => {
			try {
				// always remember AWAIT when using fetch in an async function
				const response = await fetch(`https://api.mixcloud.com${id}`);
				const data = await response.json();

				// put the mix into our state
				this.setState((prevState, props) => ({
					mixes: [...prevState.mixes, data],
				}));
			} catch (error) {
				console.log("error");
			}
		});
	};

	mountAudio = async () => {
		// when we use the this keyword, our widget is now accessible
		// anywhere inside the component
		this.widget = Mixcloud.PlayerWidget(this.player);
		// here we wait for our widget to be ready before continuing
		await this.widget.ready;

		// using the mixcloud widget events we can detect when our
		// audio has been paused, set playing state to false
		this.widget.events.pause.on(() =>
			this.setState({
				playing: false,
			})
		);
		// audio is playing again, set playing state to true
		this.widget.events.play.on(() =>
			this.setState({
				playing: true,
			})
		);
	};

	componentDidMount() {
		// when our app component is all loaded onto the page, call this to be sure it's ready
		this.mountAudio();
		this.fetchMixes();
	}

	actions = {
		togglePlay: () => {
			// we want to togglePlay() on our widget
			this.widget.togglePlay();
		},
		playMix: (mixName) => {
			//if the mix name is the same as currentMix, pause the fucker
			const { currentMix } = this.state;
			if (mixName === currentMix) {
				// when our code sees a return statement it will stop running here and execute
				return this.widget.togglePlay();
			}
			//update currentMix in our state with mixName
			this.setState({
				currentMix: mixName,
			});
			// load a new mix by its name and start playing it immediately
			if (this.widget) {
				this.widget.load(mixName, true);
			}
		},
	};

	render() {
		// makes a variable from the first mix in the array
		const [firstMix = {}] = this.state.mixes;

		return (
			<Router>
				<div className="flex-l justify-end">
					<FeaturedMix
						{...this.state}
						{...this.actions}
						{...firstMix}
						id={firstMix.key}
					/>
					<div className="w-50-l relative z-1">
						<Header />
						{/* RoutedPage */}
						<Route
							exact
							path="/"
							render={() => <Home {...this.state} {...this.actions} />}
						/>
						<Route
							path="/archive"
							render={() => <Archive {...this.state} {...this.actions} />}
						/>
						<Route path="/about" render={() => <About {...this.state} />} />
					</div>
				</div>
				<iframe
					className="player db fixed bottom-0 z-5"
					title="audioPlayer"
					width="100%"
					height="60"
					src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fteamteamwork%2Fdude-whatever-its-summer-2019%2F"
					frameBorder="0"
					// allows us to get the actual html element inside react
					ref={(player) => (this.player = player)}
				/>
			</Router>
		);
	}
}

export default App;
