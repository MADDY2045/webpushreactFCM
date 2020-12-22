import React,{useEffect,useState} from 'react';
import firebase from 'firebase';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import StatusModal from './StatusModal';

const EnableNotifications = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [btn,setBtn]=useState('btn btn-success')
  const [notification,setNotification] = useState('');
  const [token,setToken] = useState('');
  const [showNotificationFlag,setshowNotificationFlag] = useState(false);
  const [badgeflag,setBadgeflag] = useState(true);
  const [ copied,setCopied ] = useState(false);

const handleFCMtoken =()=>{
  setCopied(false);
  setBtn('btn btn-success');
  const messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(function () {
        //messageElement.innerHTML = "Got notification permission";
        console.log("Got notification permission");
        return messaging.getToken();
    })
    .then(function (token) {
        // print the token on the HTML page
        console.log(`token is ${token}`);
        setToken(token)
        //tokenElement.innerHTML = "Token is " + token;
    })
    .catch(function (err) {
       // errorElement.innerHTML = "Error: " + err;
        console.log("Didn't get notification permission", err);
    });
}


  useEffect(()=>{
    console.log('app started');
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBISz2uV1dAZ4ND6yPDxFEzFGb-mO5MSoY",
        authDomain: "fcm-webpush-notification.firebaseapp.com",
        databaseURL: "https://fcm-webpush-notification.firebaseio.com",
        projectId: "fcm-webpush-notification",
        storageBucket: "fcm-webpush-notification.appspot.com",
        messagingSenderId: "671401892295",
        appId: "1:671401892295:web:2cd5ca0ed1ad9c88d821e2",
        measurementId: "G-QSPLTPZ290"
      })

      window.firebase.messaging().onMessage( payload=> {

        console.log("Message serverv received. ", JSON.stringify(payload.data.body));
        setTimeout(()=>{
          setNotification('');
        },0)
        setTimeout(()=>{
          setNotification(payload.data.body);
          setBadgeflag(true);
          toast.success(payload.data.body);
          // window.navigator.serviceWorker.ready.then(function(serviceWorker) {
          //   serviceWorker.showNotification("Hello Background", payload.data.body);
          // });
        },100)

    });

}
},[token])

  const showNotification = ()=>{
    setShow(true);
    setshowNotificationFlag(true);
    setBadgeflag(false)
  }


  return (
    <div>
      <nav  id="nav" className="navbar navbar-dark bg-primary">
        <h1 style={{color:'white'}}>FCM Notification</h1>
        <h1 id="message"><i className="fa fa-bell-o" aria-hidden="true"></i>
        {notification !=='' && badgeflag ?  <div onClick={showNotification} id="notification-badge">1</div>:null}
     </h1>
        {/* {showNotificationFlag && !badgeflag ? <h1>{notification}</h1>:null} */}
      </nav>

      <button
      id="getfcmbtn"
      className="btn btn-outline-info" onClick={handleFCMtoken}>Get FCM token</button>
      {token !==''? <div id="token">
        <CopyToClipboard text={token}
          style={{padding:"10px"}}
          onCopy={() => {
            setCopied(true)
            setBtn('btn btn-danger')
            }}>
          <button id="copy-button" className={btn} disabled={copied}>{copied ? 'Copied':'Copy to clipboard'}</button>
        </CopyToClipboard>{token !== '' ? <div>{token}</div> :null}</div>:null}
      {/* <ToastContainer /> */}
      <StatusModal show={show} handleClose={handleClose} notification={notification} />
    </div>
  );
}

export default EnableNotifications;
