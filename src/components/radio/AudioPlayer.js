import React, { useState, useRef } from "react";
import $ from "jquery";
import AudioControls from "./AudioControls";
import LinesBars from "./LinesBars";
import "./radio.css";
import { RiRadioFill } from "react-icons/ri";
import Marquee from "react-fast-marquee";

const AudioPlayer = () => {
  const ZenoUrl = "http://stream.zeno.fm/71r6wh50ng8uv";
  const radio = {
    audioSrc: ZenoUrl + "?noCache=" + Math.floor(Math.random() * 1000000),
  };

  var height = 0;

  // State
  const [isPlaying, setIsPlaying] = useState(true);

  // Destructure for conciseness
  const { audioSrc } = radio;

  // Refs
  var audioRef = useRef(new Audio(audioSrc));
  console.log('desde root')

  const playPromise = audioRef.current.play();
  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        audioRef.current.pause();
        if (!isPlaying) {
          audioRef.current.pause();
          console.log(audioRef);
          waveAfterWave();
        } else {
          console.log(audioRef);
          audioRef.current.play();
          $(".wave").removeClass("no-animation");
        }
        if (audioRef.current.paused) {
          setIsPlaying(false);
          audioRef.current.pause();
        }

        console.log("audio played auto");
      })
      .catch((error) => {
        waveAfterWave();
        console.log("playback prevented");
        setIsPlaying(false);
      });
  }

  function waveAfterWave() {
    $(".wave").each(function () {
      height = $(this).height();
      $(this).css("height", height);
    });
    $(".wave").addClass("no-animation");
    $(".radio-message").removeClass("animate__rollIn");
  }

  return (
    <div className="container_radio">
      <div className="radio-container">
        <div className="radio-body">
          <LinesBars />

          <div className="button">
            <div className="audio-controls">
              {isPlaying ? (
                <Marquee gradient={false} speed={50} className="overflow-hidden">
                  <span style={{ marginLeft: "300px" }}>
                    <RiRadioFill className="mx-3" />
                    Sonando el iurbanradio
                    <RiRadioFill className="mx-3" />
                  </span>
                  <span style={{ marginLeft: "300px" }}>
                    <RiRadioFill className="mx-3" />
                    Sonando el iurbanradio
                    <RiRadioFill className="mx-3" />
                  </span>
                </Marquee>
              ) : (
                <div className="radio-lid animate__animated animate__slideInDown">
                  {" "}
                  <div className=""></div>{" "}
                </div>
              )}
              <AudioControls
                isPlaying={isPlaying}
                onPlayPauseClick={setIsPlaying}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
