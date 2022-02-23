import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import DropDownPicker from "../DropDownPicker";

function AppSelectorForm({
	name,
	fontSize,
	items,
	onSelectItem,
	selectedItem,
	...otherProps
}) {
	const { setFieldValue, errors, touched, values } = useFormikContext();

	return (
		<>
			<DropDownPicker
				items={items}
				onSelectItem={(item) => setFieldValue(name, item)}
				selectedItem={values[name]}
				// onChange={() => stateChanger(items.value)}
				{...otherProps}
			></DropDownPicker>

			<ErrorMessage
				error={errors[name]}
				fontSize={fontSize}
				visible={touched[name]}
			/>
		</>
	);
}

export default AppSelectorForm;
