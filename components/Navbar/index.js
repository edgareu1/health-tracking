'use client'

import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="bg-gray">
			<div className="flex items-center justify-between container py-4 px-2 mx-auto">
				<h1>
					HELLO WORLD
				</h1>

				<ul className="flex items-center gap-x-4">
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
