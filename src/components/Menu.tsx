import { useState } from 'react';
import { allCocktails } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const totalCocktails = allCocktails.length;

	// get the current cocktail----
	const currentCocktail = allCocktails[currentIndex];

	// get the previous and next cocktails----
	const prevCocktail =
		allCocktails[(currentIndex - 1 + totalCocktails) % totalCocktails];
	const nextCocktail = allCocktails[(currentIndex + 1) % totalCocktails];

	// adding animations----
	useGSAP(() => {
		gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
		gsap.fromTo(
			'.cocktail img',
			{ opacity: 0, xPercent: -100 },
			{
				xPercent: 0,
				opacity: 1,
				duration: 1,
				ease: 'power1.inOut',
			}
		);
		gsap.fromTo(
			'.details h2',
			{ yPercent: 100, opacity: 0 },
			{
				yPercent: 0,
				opacity: 100,
				ease: 'power1.inOut',
			}
		);
		gsap.fromTo(
			'.details p',
			{ yPercent: 100, opacity: 0 },
			{
				yPercent: 0,
				opacity: 100,
				ease: 'power1.inOut',
			}
		);
	}, [currentIndex]);

	useGSAP(() => {
		// scroll animations----
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#menu',
					start: 'top 120%',
					end: 'bottom top',
					scrub: 1,
				},
			})
			.to(
				'#m-left-leaf',
				{
					y: -300,
					ease: 'power2.inOut',
				},
				0
			)
			.to(
				'#m-right-leaf',
				{
					y: 300,
					ease: 'power2.inOut',
				},
				0
			);
	});

	return (
		<section id="menu" aria-labelledby="menu-heading">
			<img
				src="/images/slider-left-leaf.png"
				alt="left-leaf"
				id="m-left-leaf"
			/>
			<img
				src="/images/slider-right-leaf.png"
				alt="right-leaf"
				id="m-right-leaf"
			/>

			<h2 id="menu-heading" className="sr-only">
				Cocktail Menu
			</h2>

			<nav className="cocktail-tabs" aria-label="Cocktail Navigation">
				{allCocktails.map((cocktail, index) => (
					<button
						key={cocktail.id}
						className={`
			${index === currentIndex ? 'text-white border-white' : 'text-white/50 border-white/50'}
			 `}
						onClick={() => setCurrentIndex(index)}
					>
						{cocktail.name}
					</button>
				))}
			</nav>

			<div className="content">
				<div className="arrows">
					<button
						className="text-left"
						onClick={() => {
							setCurrentIndex(
								(currentIndex - 1 + totalCocktails) % totalCocktails
							);
						}}
					>
						<span>{prevCocktail.name}</span>
						<img
							src="/images/right-arrow.png"
							alt="right-arrow"
							aria-hidden="true"
						/>
					</button>

					<button
						className="text-left"
						onClick={() => {
							setCurrentIndex((currentIndex + 1) % totalCocktails);
						}}
					>
						<span>{nextCocktail.name}</span>
						<img
							src="/images/left-arrow.png"
							alt="left-arrow"
							aria-hidden="true"
						/>
					</button>
				</div>

				<div className="cocktail">
					<img
						src={currentCocktail.image}
						className="object-contain"
						alt="cocktail.image"
					/>
				</div>

				<div className="recipe">
					<div className="info">
						<p>Recipe for:</p>
						<p id="title">{currentCocktail.name}</p>
					</div>

					<div className="details">
						<h2>{currentCocktail.title}</h2>
						<p>{currentCocktail.description}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Menu;
