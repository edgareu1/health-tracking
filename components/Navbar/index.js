'use client'

import Link from "next/link";

import IconCool from "./icon-cool.svg";
import styles from "./index.module.scss";


export default function Navbar() {
	return (
		<nav className="sticky top-0 left-0 bg-white bg-opacity-90 z-50">
			<div className="flex items-center justify-between container py-4 px-2 mx-auto">
				<Link href="/">
					<IconCool className="animate-bounce mb-[-1rem]" />
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
