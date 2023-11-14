const readline = require('readline');
const axios = require('axios');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('Waiting for RFID card data (type \'exit\' to quit):');
rl.on('line', async input => {
  // Check for exit command
  if (input.toLowerCase() === 'exit') {
    rl.close();
  } else {
    const rfidData = input.trim();

    // Check if RFID data matches a specific value
    if (rfidData) {
      try {
        // Make API call to the desired endpoint
        
        const response = await axios.post('http://localhost:5050/getRfidCard', {
          rfidData: rfidData

        });
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error calling API:', error.message);
      }
    }
  }
});
rl.on('close', () => {
  console.log('Exiting the program.');
  process.exit(0);
});
