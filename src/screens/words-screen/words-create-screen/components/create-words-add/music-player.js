import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import play from "../../../../../assets/images/play.png"

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#7D8FB3",
  cursorColor: "#7D8FB3",
  barWidth: 1,
  barRadius: 3,
  responsive: true,
  height: 18,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer?.current?.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div className="audio">
      {url ? <button onClick={handlePlayPause}>
        {!playing ? <img src={play} /> : <img src={play} />}
        </button> : null}
      <div id="waveform" ref={waveformRef} className="audioListen" />
    </div>
  );
}
// export function Waveform({ url }) { 
//   const [wavesurfer, setWavesurfer] = useState(null)
//   const [isPlaying, setIsPlaying] = useState(false)

//   const onReady = (ws) => {
//     setWavesurfer(ws)
//     setIsPlaying(false)
//   }

//   const onPlayPause = () => {
//     wavesurfer && wavesurfer.playPause()
//   }

//   return (
//     <>
//       <WavesurferPlayer
//         height={100}
//         waveColor="violet"
//         url={url}
//         // onReady={onReady}
//         onPlay={() => setIsPlaying(true)}
//         onPause={() => setIsPlaying(false)}
//       />

//       <button onClick={onPlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//     </>
//   )
// }


