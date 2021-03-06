import React, { Component } from "react";

const Stat = ({statName, statNumber, statWord}) => (
	<div className="w-third tc pa3 ba bw2 b--light-gray" style={{marginRight: -2}}>
		<div className="f6 biryani ttu">{statName}</div>
		<div className="f5 b biryani-black ttu tracked">{statNumber} {statWord}</div>
	</div>
);

const About = ({mixes}) => (
	<div className="ph3 ph4-l">
		<div className="measure center lh-copy f4 ph3">
			<p className="mt0">Marmaduke.69 features the latest and greatest in grooves, beats and world music.</p>
			<p>Whether you’re into dad hop, dad trip hop, classic dad jazz, fusion dad jazz, dadfro beat or break butt… we have you covered!</p>
		</div>

		<div className="flex pt3 ph3 ph4-l">
			<Stat statName="Featuring..." statNumber={mixes.length} statWord={"mixes"}/>
			<Stat statName="Played..." statNumber={mixes.reduce((accum, current) => accum + current.play_count, 0)} statWord={"times"} />
			<Stat statName="With..." statNumber={mixes.reduce((accum, current) => accum + current.audio_length, 0)} statWord={"seconds"} />
		</div>

	</div>
);

export default About;