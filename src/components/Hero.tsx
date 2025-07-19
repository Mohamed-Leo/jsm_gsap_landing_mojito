import { HashLink } from 'react-router-hash-link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const isMobile = useMediaQuery({ maxWidth: 768 });

	useGSAP(() => {
		const sharedProps = {
			ease: 'expo.out',
			duration: 1.8,
			yPercent: 100,
			stagger: 0.05,
		};

		const heroTexts = gsap.timeline({
			delay: 1.3,
		});
		// animate the hero title----
		const heroSplit = new SplitText('.title', { type: 'chars , words' });
		heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
		heroTexts.from(heroSplit.chars, {
			...sharedProps,
		});

		// animate the hero paragraphs----
		const heroParagraphs = new SplitText('.subtitle', { type: 'lines' });
		heroTexts.from(
			heroParagraphs.lines,
			{
				...sharedProps,
				opacity: 0,
			},
			'-=1.1'
		);

		// leaf animations----
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#hero',
					start: 'top top',
					end: 'bottom top',
					scrub: 1,
				},
			})
			.to(
				'.right-leaf',
				{
					y: 200,
				},
				0
			)
			.to(
				'.left-leaf',
				{
					y: -200,
				},
				0
			)
			.to('.arrow', { y: 100 }, 0);

		// video animation----------------------------
		const tlVideo = gsap.timeline({
			scrollTrigger: {
				trigger: 'video',
				start: isMobile ? 'top 50%' : 'center 60%',
				end: isMobile ? '120% top' : 'bottom top',
				scrub: true,
				pin: true,
			},
		});

		if (videoRef.current) {
			videoRef.current.onloadedmetadata = () => {
				tlVideo.to(videoRef.current, {
					currentTime: videoRef.current ? videoRef.current.duration : 0,
				});
			};
		}
	}, []);

	return (
		<>
			<section id="hero" className="noisy h-[100vh] overflow-y-hidden">
				<h1 className="title overflow-hidden">MOJITO</h1>

				<img
					src="/images/hero-left-leaf.png"
					alt="left-leaf"
					className="left-leaf"
				/>
				<img
					src="/images/hero-right-leaf.png"
					alt="right-leaf"
					className="right-leaf"
				/>

				<div className="body">
					<img src="/images/arrow.png" alt="arrow" className="arrow" />

					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Cool. Crisp. Classic.</p>
							<p className="subtitle">
								Sip the Spirit <br /> of Summer
							</p>
						</div>

						<div className="view-cocktails">
							<p className="subtitle">
								Every cocktail on our menu is a blend of premium ingredients,
								creative flair, and timeless recipes — designed to delight your
								senses.
							</p>
							<HashLink to="#cocktails">View cocktails</HashLink>
						</div>
					</div>
				</div>
			</section>

			<div className="video absolute inset-0">
				<video
					ref={videoRef}
					muted
					playsInline
					preload="auto"
					src="/videos/output.mp4"
				/>
			</div>
		</>
	);
};

export default Hero;
