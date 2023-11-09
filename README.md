## Author

- [Ferdous Rahsepar](https://github.com/mo1297mo)

### Simple Bus Ticket Booking System

Welcome to the Bus Ticket Booking System project! This application enables users to conveniently book bus tickets for specific routes and timings. Developed as a university project, it serves primarily for educational purposes.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

The Bus Ticket Booking System boasts the following functionalities:
- **Ticket Booking**: Users can book tickets by specifying their name, preferred date, time, and route.
- **Booking Management**: Registered users can view, modify, or delete their bookings. (Not done yet)
- **Seat Availability**: The application ensures real-time seat availability checks to prevent overbooking. (Not done yet)
- **Database Integration**: User data and bookings are stored in a Postgres database.

## Technologies

The technological stack underpinning this project includes:
- **PostgreSQL**: database system.
- **Spring Boot Framework**: Backend.
- **React.js**: A JavaScript library for building user interfaces, which will be used for the frontend.
- **Axios**: A popular HTTP client for making API requests from the React frontend.


## Getting Started

To initiate this project on your local machine, follow the steps below:

### Running with Docker Compose

For easy setup and deployment, we offer a Docker Compose configuration inclusive of all necessary services and containers. Here's how to launch the project with Docker Compose:

1. Clone the repository: 
```
git clone https://github.com/mo1297mo/bus-ticket-system.git
```
2. Navigate to the project directory via CLI. (Don't forget to add the environment variables)


3. Build and activate the containers with Docker Compose:
```
docker-compose up -d
```

4. To stop and erase the containers post-use, input:
```
docker-compose down
```


Enjoy the Bus Ticket Booking System!

## Usage

Create a fresh user account or sign in using an existing account.
Reserve a ticket by inputting your name, route, date, and time.
Manage your bookings - peruse and cancel.
Contributing
Your contributions to refine this project are always welcomed. Please don't hesitate to open issues, offer pull requests, or provide invaluable feedback to enhance our bus booking system.

## Contributing

We welcome contributions to this project. Feel free to open issues, submit pull requests, or provide feedback to help improve our restaurant booking system.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---