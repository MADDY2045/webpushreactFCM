import React,{useEffect,useState} from 'react';
import firebase from 'firebase';
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import  { detect }  from 'detect-browser';

const browser = detect();
// import StatusModal from './StatusModal';
// import { Link } from 'react-router-dom';

let config={
  apiKey: "AIzaSyBISz2uV1dAZ4ND6yPDxFEzFGb-mO5MSoY",
  authDomain: "fcm-webpush-notification.firebaseapp.com",
  databaseURL: "https://fcm-webpush-notification.firebaseio.com",
  projectId: "fcm-webpush-notification",
  storageBucket: "fcm-webpush-notification.appspot.com",
  messagingSenderId: "671401892295",
  appId: "1:671401892295:web:2cd5ca0ed1ad9c88d821e2",
  measurementId: "G-QSPLTPZ290"
};

const EnableNotifications = (props) => {
  const [ mainData,setMainData ] = useState([]);
  const [btn,setBtn]=useState('btn btn-success')
  const [token,setToken] = useState('');
  const [ copied,setCopied ] = useState(false);

  const checkTokenValidity = (browser)=>{
    //alert(browser);
  }

useEffect(()=>{
  console.log(process.env);
    console.log('app started');

    if (browser) {
      console.log(browser.name);
      console.log(browser.version);
      console.log(browser.os);
    }
    let tempData = {};
    let tempArray = [];
    console.log(`id fcm supported ? ${firebase.messaging.isSupported()}`);
    console.log('fcm app length is ..........',firebase.apps.length);
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
   }else {
      firebase.app();
   }
   const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.')
        return messaging.getToken();
      }).then( responseToken =>{
        console.log(`token new is ${responseToken}`);
        setToken(responseToken);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify. ', err)
      })

  switch(browser.name) {
      case 'chrome':
        tempData.browser = 'chrome';
        tempData.token = token;
        tempArray.push(tempData);
        break;
      case 'opera':
        tempData.browser = 'opera';
        tempData.token = token;
        tempArray.push(tempData);
        break;
      case 'firefox':
          tempData.browser = 'firefox';
          tempData.token = token;
          tempArray.push(tempData);
          break;
      case 'edge-chromium':
        tempData.browser = 'edge-chromium';
        tempData.token = token;
        tempArray.push(tempData);
        break;
      default:
        // code block
    }
    console.log(`tempdata is ${JSON.stringify(tempData,null,2)}`);
    setMainData(tempArray);
},[token])

useEffect(()=>{
  console.log(`outside ${JSON.stringify(mainData.length,null,2)}`);
  if( mainData && mainData.length >0){
    console.log(`maindata is ${JSON.stringify(mainData,null,2)}`);
    // checkTokenValidity(mainData[0].browser);
    console.log(`component mounted!!!!!!!!!!!!!`);
    }
},[mainData])

return (
    <div>
      <nav  id="nav" className="navbar navbar-dark bg-primary">
        <h1 style={{color:'white'}}>FCM Notification</h1>
        <h1 id="message"><i className="fa fa-bell-o" aria-hidden="true"></i>
        {/* {notification !=='' && badgeflag ?  <div onClick={showNotification} id="notification-badge">1</div>:null} */}
     </h1>
    </nav>
    {/* <button
      id="getfcmbtn"
      className="btn btn-outline-info" onClick={handleFCMtoken}>Get FCM token</button> */}
      {token !==''? <div id="token">
        <CopyToClipboard text={token}
          style={{padding:"10px"}}
          onCopy={() => {
            setCopied(true)
            setBtn('btn btn-danger')
            }}>
          <button id="copy-button" className={btn} disabled={copied}>{copied ? 'Copied':'Copy to clipboard'}</button>
        </CopyToClipboard>{token !== '' ? <div>{token}</div> :null}</div>:<h4>Loading ...... </h4>}
    {/* <StatusModal show={show} handleClose={handleClose} notification={notification} /> */}
    </div>
  );
}

export default EnableNotifications;
