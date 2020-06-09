import React from "react";
import { connect } from "react-redux";
import Stat from "./Stat";

const About = ({ mixes, currentMix, setMix }) => (
	<div className="ph3 ph4-l pad-bottom">
		<div className="measure center lh-copy">
			<p className="mt0 ">
				Marmaduke.69 features the latest and greatest in grooves, beats
				and world music.
			</p>
			<p className="mb4">
				Whether you’re into dad hop, dad trip hop, classic dad jazz,
				fusion dad jazz, dadfro beat or break butt… we have you covered!
			</p>
			<Stat
				statName="Featuring..."
				statNumber={mixes.length}
				statWord={"mixes"}
			/>
			<Stat
				statName="Played..."
				statNumber={mixes.reduce(
					(accum, current) => accum + current.play_count,
					0
				)}
				statWord={"times"}
			/>
			<Stat
				statName="With..."
				statNumber={mixes.reduce(
					(accum, current) => accum + current.audio_length,
					0
				)}
				statWord={"seconds"}
			/>
		</div>
	</div>
);

export default connect((state) => state)(About);
