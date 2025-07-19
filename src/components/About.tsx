import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

const About = () => {
	useGSAP(() => {
		const titleSplit = new SplitText('#about h2', {
			type: 'words',
		});

		const textSplit = new SplitText('#about .sub-content p', {
			type: 'lines',
		});

		const ScrollTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '#about',
				start: 'top 40%',
				toggleActions: 'play none none reverse',
			},
		});

		ScrollTimeline.from('.badge', {
			x: -100,
			opacity: 0,
			duration: 0.8,
			ease: 'expo.out',
		})
			.from(
				titleSplit.words,
				{
					y: 100,
					opacity: 0,
					stagger: 0.02,
					ease: 'expo.out',
				},
				'<'
			)
			.from(
				textSplit.lines,
				{
					y: 100,
					opacity: 0,
					stagger: 0.02,
					ease: 'expo.out',
				},
				'<'
			);

		// images timeline------
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#about',
					start: 'center 105%',
					toggleActions: 'play none none reverse',
				},
			})
			.from('.top-grid div, .bottom-grid div', {
				opacity: 0,
				ease: 'power1.inOut',
				stagger: 0.08,
			});
	});

	return (
		<div id="about">
			<div className="mb-16 md:px-0 px-5">
				<div className="content">
					<div className="md:col-span-8">
						<p className="badge">Best Cocktails</p>
						<h2>
							Where every detail matters <span className="text-white">-</span>
							from muddle to garnish
						</h2>
					</div>

					<div className="sub-content">
						<p>
							Every cocktail we serve is a reflection of our obsession with
							detail — from the first muddle to the final garnish. That care is
							what turns a simple drink into something truly memorable.
						</p>

						<div>
							<p className="md:text-3xl text-xl font-bold">
								<span>4.5</span>/5
							</p>
							<p className="text-sm text-white-100">
								More than +12000 customers
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="top-grid">
				<div className="md:col-span-3">
					<div className="noisy" />
					<img src="/images/abt1.png" alt="grid-img-1" />
				</div>

				<div className="md:col-span-6">
					<div className="noisy" />
					<img src="/images/abt2.png" alt="grid-img-2" />
				</div>

				<div className="md:col-span-3">
					<div className="noisy" />
					<img src="/images/abt5.png" alt="grid-img-5" />
				</div>
			</div>

			<div className="bottom-grid">
				<div className="md:col-span-8">
					<div className="noisy" />
					<img src="/images/abt3.png" alt="grid-img-3" />
				</div>

				<div className="md:col-span-4">
					<div className="noisy" />
					<img src="/images/abt4.png" alt="grid-img-4" />
				</div>
			</div>
		</div>
	);
};

export default About;
