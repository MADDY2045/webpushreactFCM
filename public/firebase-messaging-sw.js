// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// eslint-disable-next-line no-undef
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

  // eslint-disable-next-line no-undef
  firebase.initializeApp(config);

//   // eslint-disable-next-line no-undef
   const messaging = firebase.messaging();


// //   messaging.setBackgroundMessageHandler(function (payload) {
// //     console.log('[firebase-messaging-sw.js] Received background message ', payload);
// //     const notification = payload.data;
// //     // Customize notification here
// //     const notificationTitle = notification.title;
// //     const notificationOptions = {
// //         body: "Hello Maddy!!",
// //         icon: 'https://cdn3.iconfinder.com/data/icons/picons-social/57/43-twitter-512.png'
// //     };

// //   return self.registration.showNotification("Hi This is a background message",
// //         notificationOptions);
// // });

