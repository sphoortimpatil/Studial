import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Appbutton";

function SubmitButton({ title, backgroundColor, padding, marginBottom = 0 }) {
	const { handleSubmit } = useFormikContext();
	return (
		<AppButton
			title={title}
			onPress={handleSubmit}
			backgroundColor={backgroundColor}
			padding={padding}
			marginBottom={marginBottom}
		/>
	);
}

export default SubmitButton;
