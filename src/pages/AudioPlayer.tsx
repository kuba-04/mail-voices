import { IonButton, IonIcon } from '@ionic/react';
import { play, pause, playSkipBackCircle, playSkipForwardCircle } from 'ionicons/icons';
import { useRef, useState } from "react";
import './AudioPlayer.css';

const AudioPlayer = ({ message, source }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    const togglePlay = () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        setCurrentTime(audio.currentTime);
    };

    const handleSeek = (seconds: number) => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const newTime = Math.max(0, Math.min(audio.duration, currentTime + seconds));
        setCurrentTime(newTime);
        audio.currentTime = newTime;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="audio-player-container">
            <div className="ion-padding">
                <h1 className="audio-title">{message.subject}</h1>
                <audio
                    ref={audioRef}
                    src={source}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                />

                <div className="audio-controls">
                    <IonButton onClick={() => handleSeek(-15)} fill="clear" className="audio-control">
                        <IonIcon slot="icon-only" icon={playSkipBackCircle} className="audio-icon" />
                    </IonButton>
                    <IonButton onClick={togglePlay} fill="clear" className="audio-control">
                        <IonIcon slot="icon-only" icon={isPlaying ? pause : play} className="audio-icon" />
                    </IonButton>
                    <IonButton onClick={() => handleSeek(15)} fill="clear" className="audio-control">
                        <IonIcon slot="icon-only" icon={playSkipForwardCircle} className="audio-icon" />
                    </IonButton>
                </div>

                {/*<div className="audio-timeline">*/}
                <div className="progress-bar">
                    {/*<div className="audio-timeline-current" style={{ width: `${(currentTime / duration) * 100}%` }} />*/}
                    <div className="progress-bar-fill" style={{ width: `${(currentTime / duration) * 100}%` }} />
                </div>

                <div className="audio-timeline-labels">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
