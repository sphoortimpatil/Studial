import React from "react";

import LottieView from "lottie-react-native";

function RegisterAnimation(props) {
	return (
		<LottieView
			autoPlay
			loop
			style={{
				width: "100%",
				height: 250,
				// backgroundColor: "#eee",
			}}
			source={require("../../assets/animations/register.json")}
		/>
	);
}

export default RegisterAnimation;
