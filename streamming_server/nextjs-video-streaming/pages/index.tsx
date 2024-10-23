// @ts-nocheck
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { JumpLoader, VideoControls, VideoPlayer } from '../components';
import { VideoProp, videosData } from '../data';
import styles from '../styles/Home.module.css';

export default function Home() {
	const ENVIRONMENT_MODE = process.env.NODE_ENV;
	console.log(ENVIRONMENT_MODE);

	const testVideo = "http://d22z5rkmnlv053.cloudfront.net/download/kiosk/3/0.mp4?Expires=1729869114&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cDovL2QyMno1cmttbmx2MDUzLmNsb3VkZnJvbnQubmV0L2Rvd25sb2FkL2tpb3NrLzMvMC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3Mjk4NjkxMTR9fX1dfQ__&Signature=bq6EIuHjL%7EzCRpoAwGJBPgFkbTU-gmzKxDSETl-7wZw%7EKCeTk-X0QbCrPf0NDEWr2Dmxle-rKB2o-NYyXxin9ilFmP5CqIHeRjVsxpFyTI1RXZf7KnbOCeu8IIH2fMWNDk66d941OjjOzW81NBADdZw1k7K5RD8ySlDtKFcwIb5QlukSPB5acTL1cehwYhexDg5MqGs0hCNk0zyun9UPw1y6XZb45jvsNwcbVhoJ1lB7Wt6HsRxHs9WxzAOtWRAs7yZZPng3ebGnAVWCerxVkUlEPZXOAip5li1Zi58DMhd6lOXTEWq3Up0Arsq4od1Csg3%7EVnhtAltL6lPEhJO4pw__&Key-Pair-Id=K3B7L0BS26GDMS";

	let SERVER_HOST =
		ENVIRONMENT_MODE === 'development'
			? `http://localhost:5000/video/stream`
			: 'https://nestjs-video-streaming-production.up.railway.app/video/stream';	
	
	// SERVER_HOST = testVideo;
	console.log(SERVER_HOST);

	const videos: VideoProp[] = videosData;
	const [isLoading, setIsLoading] = useState(true);
	const [activeVideoIndex, setActiveVideoIndex] = useState(0);

	console.log('videosData: ', videosData);

	useEffect(() => {
		setTimeout(() => {
			if (videos.length) setIsLoading(false);
		}, 5000);
	}, []);

	const [currentVideo, setCurrentVideo] = useState(videos[0]);

	const handleNextVideo = () => {
		let { length } = videos;
		let index = activeVideoIndex + 1;
		index = index % length;
		setActiveVideoIndex(index);
		setCurrentVideo(videos[index]);
	};

	const handlePrevVideo = () => {
		let { length } = videos;
		let index = activeVideoIndex;

		if (index === 0) {
			index = length - 1;
		} else {
			index = index - 1;
		}
		setActiveVideoIndex(index);
		setCurrentVideo(videos[index]);
	};

	const nextVideoTitle = (index, arr) => {
		let nextIndex = index + 1;
		nextIndex = nextIndex % arr.length;
		return arr[nextIndex].title;
	};

	const prevVideoTitle = (index, arr) => {
		let prevIndex = 0;
		if (index === 0) {
			prevIndex = arr.length - 1;
		} else {
			prevIndex = index - 1;
		}
		return arr[prevIndex].title;
	};
	
	console.log('currentVideo: ', currentVideo);
	console.log('activeVideoIndex: ', activeVideoIndex);

	return (
		<div className={styles.container}>
			<Head>
				<title>NextJs Video Streaming</title>
				<meta
					name="description"
					content="A video streaming app using Node js with Nest js framework for backend and NextJs for Frontend."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isLoading ? (
				<JumpLoader />
			) : (
				<>
					<h1>Video Streaming App in NextJs and NestJs</h1>
					<main className={styles.main}>
						<VideoPlayer videoId={activeVideoIndex} serverUrl={SERVER_HOST} />
						<VideoControls
							currentVideo={currentVideo}
							onNext={handleNextVideo}
							onPrev={handlePrevVideo}
							nextTitle={nextVideoTitle(activeVideoIndex, videos)}
							prevTitle={prevVideoTitle(activeVideoIndex, videos)}
						/>
					</main>
				</>
			)}

			<footer className={styles.footer}>
				<p>
					&copy;{new Date().getFullYear()}
					<a
						href="https://github.com/hesbon-osoro"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className={styles.logo}>
							<Image
								src="/github.png"
								alt="GitHub Logo"
								width={50}
								height={50}
							/>
						</span>
					</a>{' '}
					wazimu
				</p>
			</footer>
		</div>
	);
}
