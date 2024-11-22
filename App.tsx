/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import nodejs from 'nodejs-mobile-react-native';
import {SafeAreaView, Text, Button} from 'react-native';

function App(): React.JSX.Element {
  const [status, setStatus] = React.useState('Initializing...');
  const [currentTime, setCurrentTime] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const messageHandler = (msg: string) => {
      console.log('[RN] Got message:', msg);
      try {
        const parsedMsg = JSON.parse(msg);
        
        switch (parsedMsg.type) {
          case 'TIME_RESPONSE':
            setCurrentTime(parsedMsg.data);
            setError(null);
            break;
          case 'ERROR':
            setError(parsedMsg.error);
            break;
          default:
            console.warn('[RN] Unknown message type:', parsedMsg.type);
        }
      } catch (err) {
        console.error('[RN] Message parsing error:', err);
        setError('Failed to parse message from Node.js');
      }
      setStatus('Active');
    };

    nodejs.channel.addListener('message', messageHandler);

    try {
      nodejs.start('main.js');
      console.log('[RN] Started nodejs');
    } catch (err) {
      console.error('[RN] Start failed:', err);
      setStatus('Failed to start: ' + err);
    }

    return () => {
      nodejs.channel.removeListener('message', messageHandler);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Text>Status: {status}</Text>
      {error && <Text style={{color: 'red'}}>Error: {error}</Text>}
      {currentTime && <Text>Current time: {currentTime}</Text>}
      <Button 
        title="Get Current Time" 
        onPress={() => {
          try {
            nodejs.channel.send('GET_CURRENT_TIME');
          } catch (err) {
            setError('Failed to send message to Node.js: ' + err);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default App;
