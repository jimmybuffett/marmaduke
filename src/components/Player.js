/*global Mixcloud*/
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";

class Player extends Component {
	//every time the props change, we get access here vvv
	componentWillReceiveProps(nextProps) {
		// bail if widget isn't ready
		if (!nextProps.widgetReady) {
			return;
		}
		// if there is a new mix, we start playing it
		if (nextProps.currentMix !== this.props.currentMix) {
			this.widget.load(nextProps.currentMix, true);

			//if the event hasn't come from mixcloud, we want to toggle play on audio
		} else if (nextProps.fromMixcloud) {
			this.widget.togglePlay();
		}
	}

	mountAudio = async () => {
		const { playMix, setWidgetReady } = this.props;
		// when we use the this keyword, our widget is now accessible
		// anywhere inside the component
		this.widget = Mixcloud.PlayerWidget(this.player);
		// here we wait for our widget to be ready before continuing
		await this.widget.ready;

		// set widget state to ready in redux so we can block things from happening before its ready
		setWidgetReady(true)

		// using the mixcloud widget events we can detect when our
		// audio has been paused, set playing state to false
		this.widget.events.pause.on(() =>
			playMix({
				playing: false,
				fromMixcloud: true,
			})
		);
		// audio is playing again, set playing state to true
		this.widget.events.play.on(() =>
			playMix({
				playing: true,
				fromMixcloud: true,
			})
		);
	};

	componentDidMount() {
		// when our app component is all loaded onto the page, call this to be sure it's ready
		this.mountAudio();
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
		return (
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
		);
	}
}

export default connect((state) => state, actions)(Player);
