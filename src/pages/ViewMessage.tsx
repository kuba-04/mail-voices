import { useRef, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import {personCircle, play, pause, playSkipForwardCircle, playSkipBackCircle} from 'ionicons/icons';
// import { fastForwardOutline } from 'ionicons/icons/fast-forward-outline';

import './ViewMessage.css';
import sample from '../../resources/voices/file_example_MP3_700KB.mp3'
import {getMessage, Message} from "../data/messages";
import {useParams} from "react-router";
import AudioPlayer from "./AudioPlayer";

function ViewMessage() {
  const [message, setMessage] = useState<Message>();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = getMessage(parseInt(params.id, 10));
    setMessage(msg);
  });

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  return (
      <IonPage id="view-message-page">
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="Inbox" defaultHref="/home" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {message ? (
              <>
                <IonItem>
                  <IonIcon aria-hidden="true" icon={personCircle} color="primary" />
                  <IonLabel className="ion-text-wrap">
                    <h2>
                      {message.fromName}
                      <span className="date">
                    <IonNote>{message.date}</IonNote>
                  </span>
                    </h2>
                    <h3>
                      To: <IonNote>Me</IonNote>
                    </h3>
                  </IonLabel>
                </IonItem>

                <AudioPlayer message={message} source={sample} />

              </>
          ) : (
              <div>Message not found</div>
          )}
        </IonContent>
      </IonPage>
  );
}

export default ViewMessage;
