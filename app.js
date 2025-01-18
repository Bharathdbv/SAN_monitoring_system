const express = require('express');
const path = require('path');
const { Client } = require('ssh2');
const fs = require('fs');
// const cors = require('cors');
// app.use(cors());

const app = express();
const port = 5000;


app.use(express.static(path.join(__dirname, 'public')));

function executeSSHCommand(host, username, privateKeyPath, command) {
    return new Promise((resolve, reject) => {
        const ssh = new Client();
        ssh.on('ready', () => {
            ssh.exec(command, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                let result = '';
                stream.on('data', (data) => {
                    result += data.toString();
                }).on('close', () => {
                    ssh.end();
                    resolve(result);
                });
            });
        }).connect({
            host: host,
            port: 22,
            username: username,
            privateKey: fs.readFileSync(privateKeyPath),
        });
    });
}

app.get('/api/performance', async (req, res) => {
    try {
        const serverPrivateKeyPath = 'C:/Users/BHARATH/Downloads/server.pem';
        const clientPrivateKeyPath = 'C:/Users/BHARATH/Downloads/client.pem';

        const serverIP = '13.232.180.115';
        const clientIP = '15.207.16.235';

        const serverMetrics = await executeSSHCommand(serverIP, 'ubuntu', serverPrivateKeyPath, 'bash /home/ubuntu/server_metrics.sh');
        const clientMetrics = await executeSSHCommand(clientIP, 'ubuntu', clientPrivateKeyPath, 'bash /home/ubuntu/client_metrics.sh');

        res.json({
            server_metrics: serverMetrics,
            client_metrics: clientMetrics,
        });
    } catch (error) {
        console.error('Error fetching performance data:', error);
        res.status(500).send('Error fetching performance data');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
