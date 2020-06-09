import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import actions from "../store/actions";

const PlayMix = ({
	playMix,
	id,
	currentMix,
	playing,
	children,
	className,
	fromMixcloud
}) => (
	<div
		className={classNames({
			// add classname when present
			[className]: className,
			// classname on the left, true/false on teh right
			playing: id === currentMix && playing && fromMixcloud,
			loading: id === currentMix && !playing && !fromMixcloud
		})}
		onClick={() => playMix({ currentMix: id, fromMixcloud: false })}
	>
		{children}
	</div>
);

export default connect((state) => state, actions)(PlayMix);
