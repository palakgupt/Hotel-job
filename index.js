// script.js

// Sample data for rooms
const rooms = [
    { id: 1, name: "Deluxe Room", price: 120, guests: 2, amenities: ["Wi-Fi", "TV", "Air Conditioning"], img: "room1.jpg" },
    { id: 2, name: "Suite Room", price: 200, guests: 4, amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar"], img: "room2.jpg" },
    { id: 3, name: "Single Room", price: 80, guests: 1, amenities: ["Wi-Fi", "TV"], img: "room3.jpg" },
];

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const checkInDate = document.getElementById('check-in').value;
    const checkOutDate = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;
    
    const availableRooms = rooms.filter(room => room.guests >= guests);
    displayRooms(availableRooms);
});

function displayRooms(rooms) {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';

    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = 'room';
        roomElement.innerHTML = `
            <img src="${room.img}" alt="${room.name}">
            <h3>${room.name}</h3>
            <p>Price: $${room.price}/night</p>
            <p>Guests: ${room.guests}</p>
            <p>Amenities: ${room.amenities.join(', ')}</p>
            <button onclick="bookRoom(${room.id})">Book Now</button>
        `;
        roomList.appendChild(roomElement);
    });
}

function bookRoom(roomId) {
    document.getElementById('rooms-section').classList.add('hidden');
    document.getElementById('booking-section').classList.remove('hidden');
    
    const room = rooms.find(room => room.id === roomId);
    document.getElementById('booking-form').onsubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!name || !email || !phone) {
            alert('Please fill in all fields.');
            return;
        }

        document.getElementById('booking-section').classList.add('hidden');
        document.getElementById('confirmation-section').classList.remove('hidden');
        document.getElementById('confirmation-message').innerText = `Thank you, ${name}! Your booking for ${room.name} has been confirmed.`;
    };
}
