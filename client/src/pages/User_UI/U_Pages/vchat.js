import React, { Component } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

export default class vchat extends Component {
  render() {
    const roomID = "Kavinda";
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 1648097675;
      const serverSecret = "7b7e3f90dcdcace8b4aa03ab53d13f51";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(),  "manohara");


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });


  };
    return (
        <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: '100vw', height: '100vh' }}
      ></div>
    )
  }
}
