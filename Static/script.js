// Initialize map at Riihimäki
let map = L.map('map').setView([60.7389, 24.7741], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a test marker
L.marker([60.7389, 24.7741]).addTo(map)
    .bindPopup("Riihimäki Center")
    .openPopup();
