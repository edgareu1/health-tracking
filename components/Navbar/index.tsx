import type { ReactNode } from "react";
import Link from "next/link";

import { IconCool } from "@/components/SVGIcons";

import styles from "./index.module.scss";


export default function Navbar(): ReactNode {
	return (
		<nav className="static md:sticky top-0 left-0 bg-white bg-opacity-90 z-50">
			<div className="flex items-center justify-between container py-4 px-2 mx-auto">
				<Link href="/">
					<div className="animate-bounce mb-[-1rem]">
						<IconCool />
					</div>
				</Link>

				<ul className="flex items-center gap-x-6">
					<li>
						<Link href="/">
							Input
						</Link>
					</li>

					<li>
						<Link href="/dashboard">
							Dashboard
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
