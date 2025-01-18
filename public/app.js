document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/performance')
        .then(response => response.json())
        .then(data => {
            // Display Server and Client Metrics
            document.getElementById('server-metrics').textContent = data.server_metrics;
            document.getElementById('client-metrics').textContent = data.client_metrics;

            // Display Disk Usage
            document.getElementById('disk-usage').textContent = `
                Server Disk Usage: ${data.server_metrics}
                Client Disk Usage: ${data.client_metrics}
            `;

            // Display IOPS Read/Write Speeds
            document.getElementById('iops').textContent = `
                Server IOPS and Read/Write Speeds: ${data.server_metrics}
                Client IOPS and Read/Write Speeds: ${data.client_metrics}
            `;

            // Display Network Traffic
            document.getElementById('network-traffic').textContent = `
                Server Network Traffic: ${data.server_metrics}
                Client Network Traffic: ${data.client_metrics}
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});









