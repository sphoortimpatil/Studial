import React from "react";

import LottieView from "lottie-react-native";

function ReadingAnimation(props) {
	return (
		<LottieView
			autoPlay
			loop
			source={require("../../assets/animations/reading-cartoon.json")}
		/>
	);
}

export default ReadingAnimation;
