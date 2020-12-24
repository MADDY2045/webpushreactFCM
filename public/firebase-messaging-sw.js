importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

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

  const messaging = firebase.messaging()


  messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notification = payload.data;
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: notification.icon
    };

  return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

