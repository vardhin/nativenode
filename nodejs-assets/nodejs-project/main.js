// Bare minimum to test if Node.js is running
try {
    var rn_bridge = require('rn-bridge');
    var moment = require('moment');
    console.log('[Node] Successfully required dependencies');
    
    // Send initial message in JSON format
    rn_bridge.channel.send(JSON.stringify({
        type: 'STATUS',
        data: 'Node.js is ready'
    }));
    
    // Basic message handler with error handling
    rn_bridge.channel.on('message', (msg) => {
        try {
            if (msg === 'GET_CURRENT_TIME') {
                const formattedTime = moment().format('MMMM Do YYYY, h:mm:ss a');
                rn_bridge.channel.send(JSON.stringify({
                    type: 'TIME_RESPONSE',
                    data: formattedTime
                }));
            } else {
                console.log('[Node] Unknown message type:', msg);
                rn_bridge.channel.send(JSON.stringify({
                    type: 'ERROR',
                    error: 'Unknown message type'
                }));
            }
        } catch (err) {
            console.error('[Node] Message handling error:', err);
            rn_bridge.channel.send(JSON.stringify({
                type: 'ERROR',
                error: err.message
            }));
        }
    });
} catch (e) {
    console.error('[Node] Startup error:', e);
}