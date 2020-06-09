import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import PlayButton from "./PlayButton";
import PlayMix from "./PlayMix";

const FeaturedMix = ({ name, title, pictures = {}, slug, picture_primary_color, ...props }) => (
	<div
		className="w-50-l vh-100 flex items-center justify-center cover bg-center pad-bottom fixed-1 left-0 mix-overlay relative"
		style={{ 
			backgroundImage: `url(${pictures.extra_large})`,
			backgroundColor: `#${picture_primary_color}` 
		}}>
		<div className="w-100 tc pa3 relative z-2">
			<p className="b biryani f6 white ttu">{title}</p>
			<h1 className="mix-title mt0 mb3 anton white ttu">{name}</h1>
			<Link to={`/show/${slug}`} className="absolute absolute--fill z-3" />

			<PlayMix  id={slug} className="relative z-5 pointer">
				<PlayButton />
			</PlayMix>
		</div>
	</div>
);

// this is a selector, grabs certain data from our state
const getMix = (state) => {
	let featuredMix;

	if (state.featuredMix) {
		[featuredMix] = state.mixes.filter(
			(mix) => mix.id === state.featuredMix
		);
	} else {
		[featuredMix] = state.mixes.filter(
			(mix) => mix.id === state.currentMix
		);
	}

	const [firstMix = {}] = state.mixes;
	return featuredMix || firstMix;
};

const getTitle = (state) => {
	if (state.featuredMix) {
		return "Currently viewing";
	} else if (state.currentMix && state.playing) {
		return "Currently playing";
	} else {
		return "Featured mix";
	}
};
export default connect((state) => ({
	...getMix(state),
	title: getTitle(state)
}))(FeaturedMix);
