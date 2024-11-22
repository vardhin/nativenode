// Bare minimum to test if Node.js is running
try {
    var rn_bridge = require('rn-bridge');
    console.log('[Node] Successfully required rn-bridge');
    
    // Send a message immediately to test bridge
    rn_bridge.channel.send('Initial test message');
    
    // Basic message handler
    rn_bridge.channel.on('message', (msg) => {
        console.log('[Node] Got message:', msg);
        rn_bridge.channel.send('Received: ' + msg);
    });
} catch (e) {
    console.error('[Node] Startup error:', e);
}