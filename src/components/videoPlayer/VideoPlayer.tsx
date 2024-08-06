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
  title: string;
}
export function VideoPlayer({ link, title }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const playPauseBtnRef = useRef<HTMLSpanElement>(null);
  const playerInstance = useRef<any>(null);
  const isPlaying = useRef<boolean>(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      return new Promise<void>((resolve) => {
        // todo
        // !промисы пригодились - todo проверить позже (не ночью)
        // !подумать обязательно ли в window кидать 
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          tag.onload = () => {
            resolve();
          };
          const firstScriptTag = document.getElementsByTagName("script")[0];
          if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }
        }
      });
    };

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.innerHTML = ""; 
      }
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
    };

    loadYouTubeAPI().then(() => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    });

    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
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
    
    if (event.data === window.YT.PlayerState.BUFFERING && spinnerRef.current) {
      spinnerRef.current.style.display = "block";
    } else if (spinnerRef.current) {
      spinnerRef.current.style.display = "none";
    }

    if (event.data === window.YT.PlayerState.PLAYING) {
      isPlaying.current = true;
      if (playPauseBtnRef.current) {
        playPauseBtnRef.current.innerHTML = `
       
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H2V18H0V0ZM10 0H12V18H10V0Z" fill="black"/>
          </svg>
      
        `;
      }
    } else {
      isPlaying.current = false;
      if (playPauseBtnRef.current) {
        playPauseBtnRef.current.innerHTML = `
          
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 20.1956V3.80409C6 3.01866 6.86395 2.53981 7.53 2.95609L20.6432 11.1519C21.2699 11.5435 21.2699 12.4562 20.6432 12.8479L7.53 21.0436C6.86395 21.4599 6 20.9811 6 20.1956Z" fill="black"/>
          </svg>
          
        `;
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
      <div
        id="youtube-player"
        className={styles.youTubePlayer}
        ref={playerRef}
      ></div>
      <div className={styles.controls} ref={controlsRef}>
        <span
          className={styles.playPauseBtn}
          onClick={togglePlayPause}
          ref={playPauseBtnRef}
        >
          <svg
            width="12"
            height="18"
            viewBox="0 0 12 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V18H0V0ZM10 0H12V18H10V0Z" fill="black" />
          </svg>
        </span>
      </div>
      <div className={styles.loadingSpinner} ref={spinnerRef}></div>
      <div className={`${styles.filmTitle} simpleTxt`}>{title}</div>
    </div>
  );
}
