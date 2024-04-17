import { IconSpinner } from "@/components/SVGIcons";

import styles from "./index.module.scss";


export default function LoadingSpinner() {
	return (
		<div className="max-h-[35vh] max-w-[35vw] mx-auto animate-spin">
			<IconSpinner />
		</div>
	);
}
