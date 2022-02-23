import React from "react";
import { StyleSheet, Text } from "react-native";

function ErrorMessage({ error, visible, fontSize = 16.5 }) {
	if (!error || !visible) return null;
	return <Text style={[styles.error, { fontSize }]}>{error}</Text>;
}

const styles = StyleSheet.create({
	error: { color: "#c42831", marginLeft: 15 },
});

export default ErrorMessage;
