import React,{useEffect} from 'react';
import firebase from 'firebase';

const EnableNotifications = () => {

  const initializeApp=()=>{
    console.log('initialized app!!');
    var config = {
      apiKey: "AIzaSyBISz2uV1dAZ4ND6yPDxFEzFGb-mO5MSoY",
      authDomain: "fcm-webpush-notification.firebaseapp.com",
      databaseURL: "https://fcm-webpush-notification.firebaseio.com",
      projectId: "fcm-webpush-notification",
      storageBucket: "fcm-webpush-notification.appspot.com",
      messagingSenderId: "671401892295",
      appId: "1:671401892295:web:2cd5ca0ed1ad9c88d821e2",
      measurementId: "G-QSPLTPZ290"
    }
    firebase.initializeApp(config);

    const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(()=>{
      console.log('have permission');
      return messaging.getToken();
    })
    .then( token=>{
      console.log(`token is ${token}`);
    } )
    .catch(err=>{
      console.log(`error in permission ${err}`)
    })

    messaging.onMessage(function (payload) {
      console.log("Message received. ", JSON.stringify(payload));

  });

  messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log(`Token refreshed.${refreshedToken}`);
            }).catch(function (err) {
           console.log('Unable to retrieve refreshed token ', err);
        });
});

  }

  useEffect(()=>{
    initializeApp();
  },[])

  return (
    <div>
      <h1>FCM Notification</h1>
    </div>
  );
}

export default EnableNotifications;
