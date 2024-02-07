import React, { useRef, useState } from 'react';
import CustomOverlay from './CustomOverlay';
import ReactPlayer from 'react-player';

const Landing = () => {
    // RTSP URL
    const rtspUrl = 'rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast';

    // State variables
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Ref for accessing the video player
    const videoRef = useRef(null);

    // Toggle play/pause
    const togglePlay = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Toggle mute/unmute
    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        const video = videoRef.current;
        video.volume = newVolume;
        setVolume(newVolume);
    };

    // Handle playback rate change
    const handlePlaybackRateChange = (e) => {
        const newRate = parseFloat(e.target.value);
        const video = videoRef.current;
        video.playbackRate = newRate;
        setPlaybackRate(newRate);
    };

    // Toggle fullscreen mode
    const toggleFullScreen = () => {
        const video = videoRef.current;
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div>
            {/* Custom overlay */}
            <CustomOverlay />
            
            <div className='mx-80 mt-20 w-[800px]'>
                <div className='bg-black'>
                    {/* Video player */}
                    <ReactPlayer
                        ref={videoRef}
                        url={rtspUrl}
                        playing={isPlaying}
                        muted={isMuted}
                        volume={volume}
                        playbackRate={playbackRate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className='flex flex-row mt-4 gap-4'>
                    {/* Play/Pause button */}
                    <button onClick={togglePlay} className={`px-4 py-2 ${isPlaying ? 'bg-gray-600' : 'bg-gray-400'} text-white rounded-3xl`}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    {/* Mute/Unmute button */}
                    <button onClick={toggleMute} className={`px-4 py-2 ${isMuted ? 'bg-gray-600' : 'bg-gray-400'} text-white rounded-3xl`}>
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    {/* Volume control */}
                    <div className="flex items-center gap-1">
                        <span>Volume</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="mr-2 w-40"
                        />
                        <span className="text-sm">{(volume * 100).toFixed(0)}%</span>
                    </div>
                    {/* Playback rate control */}
                    <div className="flex items-center gap-1">
                        <span>Speed</span>
                        <input
                            type="range"
                            min="0.25"
                            max="2"
                            step="0.25"
                            value={playbackRate}
                            onChange={handlePlaybackRateChange}
                            className="mr-2 w-40"
                        />
                        <span className="text-sm">{playbackRate}x</span>
                    </div>
                    {/* Fullscreen button */}
                    <div style={{ position: 'relative' }}>
                        <button onClick={toggleFullScreen} className="px-4 py-2 bg-gray-400 text-white rounded-3xl">
                            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
