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
  socket.connect(); // Połącz z serwerem WebSocket
  console.log('Połączono z serwerem WebSocket');


  updateButton.addEventListener('click', () => {
    // Wysyłamy żądanie aktualizacji danych postaci
    const characterId = "2"; 
    const newData = {
      // _id: "2",
      level: 1,
      experience: 0,

      class: "Wizard",
      name: "Dawid_test_nowy",
      health: 100,
      location: "Lorencia",
      stats: {
        agility: 20,
        vitality: 20,
        strength: 20,
        energy: 20
      },
    };
    socket.emit('updateCharacter', { characterId, newData });
  });


  // Nasłuchiwanie na zdarzenia zwrotne, np. "characterUpdated"
  socket.on('characterUpdated', (updatedCharacter) => {
    console.log('Zaktualizowane dane postaci:', updatedCharacter);
  });

  // // Obsługa rozłączenia
  // socket.on('disconnect', () => {
  //   console.log('Rozłączono z serwerem WebSocket');
  // });
});
