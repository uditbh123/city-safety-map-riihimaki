// --- Initialize Leaflet map ---
let map = L.map('map').setView([60.7389, 24.7741], 13); // Riihimäki center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- Initialize Firebase ---
const firebaseConfig = {
    apiKey: "AIzaSyDmOSCvdSCJ7wW6GxNpJYXitqJt4y5CRPE",
    authDomain: "city-safety-map.firebaseapp.com",
    projectId: "city-safety-map",
    storageBucket: "city-safety-map.firebasestorage.app",
    messagingSenderId: "448214657719",
    appId: "1:448214657719:web:7c9f5fbd5068dd82417b32",
    measurementId: "G-JFDT9T0QRF"
};

const appFirebase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Fetch alerts dynamically ---
db.collection("alerts").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const alert = change.doc.data();
            L.marker([alert.lat, alert.lng])
             .addTo(map)
             .bindPopup(`<b>${alert.type}</b><br>${alert.description}`);
        }
    });
});

// Reference to the form
const alertForm = document.getElementById('alertForm');

alertForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Get values from form
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);

    // Add to Firestore
    db.collection("alerts").add({
        type: type,
        description: description,
        lat: lat,
        lng: lng
    })
    .then(() => {
        alert("Alert submitted successfully!");
        alertForm.reset(); // Clear the form
    })
    .catch((error) => {
        console.error("Error adding alert: ", error);
    });
});
