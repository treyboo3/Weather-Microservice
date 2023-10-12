# CS361-Portfolio Weather Microservice
Microservice Implementation for my partner's trip planner. The microservice uses weatherapi.com for weather information.

Description: The microservice has a client-server architecture written in JavaScript and runs on NodeJS. The important modules of this microservice include axios for HTTP requests and zeromq for the socket architecture behind the client and the server. The microservice itself requires a location (city) and date (yyyy-MM-DD), and when ran generates weather data for the given parameters.

Request Data: In order to request data, the runClient(location, date) function on the client side must be called with the correct parameters. When the function is called, it creates a socket to communicate with the server side and passes the location and date data to the server.

Receive Data: Once the data has been requested from the server, the server will then configure an HTTP for the weatherapi.com with the passed parameters. The HTTP is requested from the weatherapi servers. The initial HTTP response is a large JSON body, however the server sorts through the data and finds the min, max and avg temperatures along with the precipitation for the specific date. This data is then organized and sent back to the client in which stores the given data in a organized dictionary for my partner to easily access.

UML Sequence: image

![image](https://user-images.githubusercontent.com/102479767/220431456-36f8addb-05e9-4656-a745-0a4136077d99.png)
