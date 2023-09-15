// Importujemy moduł socket.io-client
import io from 'socket.io-client';

// Adres i port serwera WebSocket
const serverUrl = 'http://localhost:3003';
 // Zastąp adresem i portem swojego serwera

// Połącz się z serwerem WebSocket
const socket = io(serverUrl);

document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');
  const updateButton = document.getElementById('updateButton');


  connectButton.addEventListener('click', () => {
   
    socket.connect(); // Połącz z serwerem WebSocket
    console.log('Połączono z serwerem WebSocket', socket.connect());
 
  });

  updateButton.addEventListener('click', () => {
    // Wysyłamy żądanie aktualizacji danych postaci
    const characterId = "1"; 
    const newData = {
      _id: "1",
      level: 1110,
      experience: 500,
      health: 80,
      stats: {
        agility: 15,
        vitality: 25,
      },
    };
    socket.emit('updateCharacter', { characterId, newData });
  });


  // Nasłuchiwanie na zdarzenia zwrotne, np. "characterUpdated"
  socket.on('characterUpdated', (updatedCharacter) => {
    console.log('Zaktualizowane dane postaci:', updatedCharacter);
  });

  // Obsługa rozłączenia
  socket.on('disconnect', () => {
    console.log('Rozłączono z serwerem WebSocket');
  });
});
