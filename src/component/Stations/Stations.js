import React, { useState, useRef, useEffect, useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import defaultImage from "../../images/defaultImage.jpg";
import "./Stations.css";
import {
  FaRegPlayCircle,
  FaRegPauseCircle,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
} from "react-icons/fa";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { FavoriteContext } from "../../contexts/FavoriteContext";

const Stations = ({ stations, favoriteStationsData, showFavorites }) => {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  const { addToFavorite, removeFromFavorite, checkFavorite } =
    useContext(FavoriteContext);

  const setFavoriteHandler = (station) => {
    const isFav = checkFavorite(station.id);

    if (isFav) {
      removeFromFavorite(station.id);
    } else {
      addToFavorite({
        id: station.id,
        url: station.url,
        urlResolved: station.urlResolved,
        name: station.name,
        favicon: station.favicon,
      });
    }
  };

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  useEffect(() => {
    if (audioPlayerRef.current) {
      isPlaying
        ? audioPlayerRef.current.audio.current.play()
        : audioPlayerRef.current.audio.current.pause();
    }
  }, [isPlaying]);

  const handlePlayStation = (index) => {
    setCurrentStationIndex(index);
    setIsPlaying(true);
    if (audioPlayerRef.current) {
      const audio = audioPlayerRef.current.audio.current;
      audio.load();
      audio.onloadedmetadata = () => {
        audio.play().catch((error) => {
          console.error("Error occurred while playing audio:", error);
          setIsPlaying(false);
        });
      };
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Custom icons for play/pause buttons
  const customIcons = {
    play: <FaRegPlayCircle />,
    pause: <FaRegPauseCircle />,
    volume: <FaVolumeUp />,
    volumeMute: <FaVolumeMute />,
  };

  // Filter stations based on the active filter and showFavorites flag
  const filteredStations = showFavorites ? favoriteStationsData : stations;

  return (
    <div className="container">
      <div className="stations">
        {filteredStations &&
          filteredStations.map((station, index) => (
            <div className="station" key={index}>
              <div className="stationContent d-flex justify-content-between align-items-center">
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon || defaultImage}
                    alt="station logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{station.name.substring(0, 20)}</div>
                </div>
                <div className="button-container">
                  {currentStationIndex === index && isPlaying ? (
                    <button className="btn" onClick={handlePause}>
                      <BsPauseFill size={28} />
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => handlePlayStation(index)}
                    >
                      <BsPlayFill size={28} />
                    </button>
                  )}

                  <button
                    className="btn"
                    onClick={() => setFavoriteHandler(station)}
                  >
                    {checkFavorite(station.id) ? (
                      <FaHeart fill="red" />
                    ) : (
                      <FaHeart />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="sticky-bottom">
        <AudioPlayer
          className="player"
          src={
            filteredStations && filteredStations.length > 0
              ? filteredStations[currentStationIndex].urlResolved
              : "#"
          }
          ref={audioPlayerRef}
          showSkipControls={true}
          showJumpControls={false}
          showDownloadProgress={false}
          showFilledProgress={false}
          showFilledVolume={true}
          hasDefaultKeyBindings={false}
          autoPlayAfterSrcChange={false}
          volumeJumpStep={0.1}
          timeFormat={"auto"}
          layout={"horizontal"}
          customIcons={customIcons}
          defaultDuration={""}
        />
      </div>
    </div>
  );
};

export default Stations;
