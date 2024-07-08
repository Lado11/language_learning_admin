import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import play from "../../../../../assets/images/play.png";
import { CustomSpin } from "../../../../../components";
import { Colors } from "../../../../../assets/colors";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#7D8FB3",
  cursorColor: "#7D8FB3",
  barWidth: 1,
  barRadius: 3,
  responsive: true,
  height: 18,
  normalize: true,
  partialRender: true
});

export function Waveform({ url, loading }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isReady, setIsReady] = useState(false); // Track if WaveSurfer is ready

  useEffect(() => {
    // Cleanup previous instance on component unmount
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!url) return;

    wavesurfer.current = WaveSurfer.create(formWaveSurferOptions(waveformRef.current));

    wavesurfer.current.load(url)
      .then(() => {
        setIsReady(true);
        wavesurfer.current.setVolume(volume);
        if (playing) {
          wavesurfer.current.play();
        }
      })
      .catch(error => {
        console.error('Error loading audio:', error);
        // Handle error state or show a message to the user
      });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        setIsReady(false);
      }
    };
  }, [url]);

  const handlePlayPause = () => {
    setPlaying(!playing); // Toggle `playing` state
  };

  useEffect(() => {
    if (wavesurfer.current && isReady) {
      if (playing) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [playing, isReady]);

  return (
    <div className="audio">
      {loading ? (
        <CustomSpin size={37} color={Colors.GRAY_COLOR} />
      ) : url && (
        <button type="button" onClick={handlePlayPause}>
          {!playing ? (
            <img src={play} alt="Play" />
          ) : (
            <img src={play} alt="Pause" />
          )}
        </button>
      )}
      <div id="waveform" ref={waveformRef} className="audioListen" />
    </div>
  );
}
