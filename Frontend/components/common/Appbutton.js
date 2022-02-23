import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({
	title,
	onPress,
	backgroundColor = "red",
	padding = "4%",
}) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor }, { padding }]}
			onPress={onPress}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		// padding: "4%",
		width: "100%",
		// height:60,
	},
	text: {
		color: "white",
		fontSize: 18,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
});
export default AppButton;
