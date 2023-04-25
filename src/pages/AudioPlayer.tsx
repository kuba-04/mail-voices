import { IonButton, IonIcon } from '@ionic/react';
import { play, pause, playSkipBackCircle, playSkipForwardCircle } from 'ionicons/icons';
import {useRef, useState} from "react";
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

    return (
        <div className="audio-player-container">
            <div className="ion-padding">
                <h1>{message.subject}</h1>
                <audio
                    ref={audioRef}
                    src={source}
                    onTimeUpdate={handleTimeUpdate}
                />

                <div className="buttons-container">
                    <IonButton onClick={() => handleSeek(-15)}>
                        <IonIcon slot="icon-only" icon={playSkipBackCircle} />
                    </IonButton>
                    <IonButton onClick={togglePlay}>
                        <IonIcon slot="icon-only" icon={isPlaying ? pause : play} />
                    </IonButton>
                    <IonButton onClick={() => handleSeek(15)}>
                        <IonIcon slot="icon-only" icon={playSkipForwardCircle} />
                    </IonButton>
                </div>

                <div className="ion-padding">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${(currentTime / audioRef.current?.duration) * 100}%` }} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AudioPlayer;
