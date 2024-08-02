import React, { useEffect, useRef } from "react";
import styles from "./videoPlayer.module.css";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface VideoPlayerProps {
  link: string;
}
// копипаст гугл апи и stOverflow - todo попытаться убрать Yt лого на паузе (в апи их нет такого - вроде)
export function VideoPlayer({ link }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const playPauseBtnRef = useRef<HTMLSpanElement>(null);
  const playerInstance = useRef<any>(null);
  const isPlaying = useRef<boolean>(false);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];

    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerInstance.current = new window.YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId: extractVideoId(link),
        playerVars: {
          controls: 0,
          autoplay: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      //   console.log(playerInstance);
    };
    
  }, [link]);

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w-]{11})/
    );
    return match ? match[1] : "";
  };

  const onPlayerReady = () => {
    if (spinnerRef.current) {
      spinnerRef.current.style.display = "none";
    }
    if (controlsRef.current) {
      controlsRef.current.style.display = "block";
    }
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.BUFFERING) {
      if (spinnerRef.current) {
        spinnerRef.current.style.display = "block";
      }
    } else {
      if (spinnerRef.current) {
        spinnerRef.current.style.display = "none";
      }
    }
    // временно значки паузы todo
    if (event.data === window.YT.PlayerState.PLAYING) {
      isPlaying.current = true;
      if (playPauseBtnRef.current) {
        playPauseBtnRef.current.textContent = "⏸️";
      }
    } else {
      isPlaying.current = false;
      if (playPauseBtnRef.current) {
        playPauseBtnRef.current.textContent = "▶️";
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying.current) {
      playerInstance.current.pauseVideo();
    } else {
      playerInstance.current.playVideo();
    }
  };

  return (
    <div className={styles.playerContainer}>
      <div id="youtube-player" className= {styles.youTubePlayer}ref={playerRef}></div>
      <div className={styles.controls} ref={controlsRef}>
        <span
          className={styles.playPauseBtn}
          onClick={togglePlayPause}
          ref={playPauseBtnRef}
        >
          ▶️
        </span>
      </div>
      <div className={styles.loadingSpinner} ref={spinnerRef}></div>
    </div>
  );
}
