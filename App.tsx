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

  React.useEffect(() => {
    // Store the message handler
    const messageHandler = (msg: any) => {
      console.log('[RN] Got message:', msg);
      setStatus('Last message: ' + msg);
    };

    // Add listener with stored handler
    nodejs.channel.addListener('message', messageHandler);

    // Start nodejs
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
      <Button 
        title="Test Node" 
        onPress={() => nodejs.channel.send('Test from RN')}
      />
    </SafeAreaView>
  );
}

export default App;
