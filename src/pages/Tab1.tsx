import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [gram1, setGram1] = useState<string>('');
  const [price1, setPrice1] = useState<string>('');
  const [gram2, setGram2] = useState<string>('');
  const [price2, setPrice2] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [resultTitle, setResultTitle] = useState<string>('');
  const [resultContents, setResultContents] = useState<string[]>([]);

  const calculate = () => {
    if (!gram1 || !price1 || !gram2 || !price2) {
      return setShowToast(true);
    }
    const gramPrice1 = Number(price1) / Number(gram1);
    const gramPrice2 = Number(price2) / Number(gram2);
    if (gramPrice1 === gramPrice2) {
      setResultTitle('AとBはかわりません！');
      setResultContents([`1gあたり${gramPrice1}`]);
    }
    if (gramPrice1 > gramPrice2) {
      setResultTitle('Bの方がお得です！');
      setResultContents([
        `A: 1gあたり${gramPrice1}円`,
        `B: 1gあたり${gramPrice2}円`,
      ]);
    }
    if (gramPrice1 < gramPrice2) {
      setResultTitle('Aの方がお得です！');
      setResultContents([
        `A: 1gあたり${gramPrice1}円`,
        `B: 1gあたり${gramPrice2}円`,
      ]);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>コスパ判定</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">グラムA</IonLabel>
            <IonInput value={gram1} placeholder="Enter Input" onIonChange={e => setGram1(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">金額A</IonLabel>
            <IonInput value={price1} placeholder="Enter Input" onIonChange={e => setPrice1(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">グラムB</IonLabel>
            <IonInput value={gram2} placeholder="Enter Input" onIonChange={e => setGram2(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">金額B</IonLabel>
            <IonInput value={price2} placeholder="Enter Input" onIonChange={e => setPrice2(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        <IonButton class="calculate-button" expand="block" onClick={calculate}>比較する</IonButton>
        {resultTitle !== '' && resultContents.length > 0 &&
          <IonCard color="tertiary">
            <IonCardHeader>
              <IonCardTitle>{resultTitle}</IonCardTitle>
            </IonCardHeader>
            { resultContents.map((resultContent: string) => {
              return (
                <IonCardContent>
                  {resultContent}
                </IonCardContent>
              )
            })}
          </IonCard>
        }
        <IonToast
          color="danger"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="値が足りないよ！"
          duration={1500}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
