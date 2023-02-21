import { Request } from "zeromq";

async function runClient(location, date) {
  console.log("Connecting to weather server…");

  //  Socket to talk to server
  const sock = new Request();
  sock.connect("tcp://localhost:5555");

  var paramenters = location + ' ' + date

  //Request
  console.log("Sending location and date for weather...");
  await sock.send(paramenters);

  // Response
  const result = await sock.receive();
  
  // Organize Data
  var string = result.toString();
  var words = string.split(' ');
  const mintemp_f = words[0]
  const maxtemp_f = words[1]
  const avgtemp_f = words[2]
  const totalprecip_in = words[3]

  const weather = {
    'Minimum Temperature F': mintemp_f,
    'Maximum Temperature F': maxtemp_f,
    'Average Temperature F': avgtemp_f,
    'Total Precipitation Inches': totalprecip_in
  }

  console.log(weather);
}

runClient('London', '2023-11-11');
