'use client'

import IconSpinner from "./icon-spinner.svg";
import styles from "./index.module.scss";


export default function LoadingSpinner() {
	return (
		<IconSpinner className="max-h-[35vh] max-w-[35vw] mx-auto animate-spin" />
	);
}
