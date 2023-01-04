import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import "./test.css";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const Test = () => {

  const [name, setName] = useState("");

  function connect() {
      let socket = new SockJS("/v1/stomp");
      stompClient = over(socket);
      stompClient.connect({}, function (frame){
         
          stompClient.subscribe('/topic/greetings', function (greeting) {
              console.log(JSON.parse(greeting.body));
          });
      });
  }

 

  function disconnect() {
      if (stompClient !== null) {
          stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  function sendName1() {
      stompClient.send("/app/hello", {}, JSON.stringify({'name': name}));
  }

    return (
      <div >
    
      <div >
          
              <div >
                  <label>WebSocket connection:</label>
                  <button  type="submit" onClick={connect}>Connect</button>
                  <button  type="submit" disabled="disabled" onClick={disconnect}>Disconnect
                  </button>
              </div>
          
      </div>
      <div >
          
              <div >
                  <label>What is your name?</label>
                  <input
                  placeholder="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
          />
              </div>
              <button type="submit" onClick={sendName1}>Send</button>
          
      </div>
  
  <div>
  </div>
</div>
    );
};

export default Test;