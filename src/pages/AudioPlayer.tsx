import { IonButton, IonIcon } from '@ionic/react';
import { play, pause, playSkipBackCircle, playSkipForwardCircle } from 'ionicons/icons';
import {useRef, useState} from "react";

const AudioPlayer = ({ message, source }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    const togglePlay = () => {
        if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleFastForward = () => {
        audioRef.current.currentTime += 15;
    };

    const handleRewind = () => {
        audioRef.current.currentTime -= 15;
    };

    return (
        <div className="audio-player-container">
            <div className="ion-padding">
                <h1>{message.subject}</h1>
                <audio
                    ref={audioRef}
                    src={source}
                    onLoadedData={handleLoadedData}
                    onTimeUpdate={handleTimeUpdate}
                />
                <div className="buttons-container">
                    <IonButton onClick={handleRewind}>
                        <IonIcon slot="icon-only" icon={playSkipBackCircle} />
                    </IonButton>
                    <IonButton onClick={togglePlay}>
                        <IonIcon slot="icon-only" icon={isPlaying ? pause : play} />
                    </IonButton>
                    <IonButton onClick={handleFastForward}>
                        <IonIcon slot="icon-only" icon={playSkipForwardCircle} />
                    </IonButton>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
