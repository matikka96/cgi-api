# CGI API challenge

API challenge from CGI for Future Talents

Purpose of this challenge was to create MVP API for medical client appointment system.

## API

API has been built using *nodejs* and *expressjs*. MongoDB was used as a database.

### Adding specialist

> /api/v1/specialists

- Type: POST
- Parameters: {name: String, role: String}

### Create appointment(s) for specialist

> /api/v1/specialists

- Type: POST
- Parameters: {appointments: [{startTime: String, endTime: String, specialistName: String, notes: String}]}

### Searching for free appointments

> /api/v1/timeslots/free?from=x&to=y

- Type: GET
- Parameters: {from: String, to: String}

### Searching for free appointments from selected specialist

> /api/v1/timeslots/free?specialists=a&from=x&to=y

- Type: GET
- Parameters: {specialist: String, from: String, to: String}

### Appointment boooking

> /api/v1/timeslots/t

- Type: PUT
- Parameters: {id: String, newStatus: String, visitorName: String}

### Load all specialists [EXTRA]

> /api/v1/specialist-load-all

- Type: GET
- Parameters: {}

### Check timeslot availability [EXTRA]

> /api/v1/appointment/available

- Type: GET
- Parameters: {specialist: String, from: String, to: String}

## Front-end [OPTIONAL]

User interface has been built in React with the help of Materializecss framework.

There are currently 3 tabs:
1. Book appointment
2. Create appointment
3. Add specialist

### Book appointment


