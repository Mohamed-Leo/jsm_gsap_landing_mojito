import { useLocation } from 'react-router';
import { navLinks } from '../../constants/index.ts';
import { HashLink } from 'react-router-hash-link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
	const { hash: hashPathName } = useLocation();

	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: 'nav',
				start: 'bottom top',
				scrub: 1,
			},
		});

		navTween.to('nav', {
			backgroundColor: '#00000050',
			backdropFilter: 'blur(10px)',
			duration: 0.5,
			ease: 'power1.inOut',
		});

		// a simple animation for the nav------
		gsap.from('.anim-link', {
			opacity: 0,
			y: -100,
			stagger: 0.2,
		});
	});

	return (
		<nav>
			<div>
				{/* <Logo /> */}
				<HashLink to="#home" className="flex items-center gap-2 anim-link">
					<img src="images/logo.png" alt="logo" className="w-5" />
					<p>Velvet Pour</p>
				</HashLink>

				{/* links */}
				<ul>
					{navLinks.map((link) => (
						<li
							key={link.id}
							className={
								hashPathName === `#${link.id}`
									? 'activeLink anim-link'
									: 'anim-link'
							}
						>
							<HashLink to={`#${link.id}`}>{link.title}</HashLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
