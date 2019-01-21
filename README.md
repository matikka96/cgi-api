# CGI API challenge

API challenge from CGI for Future Talents

Purpose of this challenge was to create MVP API for medical client appointment system.

## Setup

This project is separated on two main folders: `front` and `server`.

As the name suggests `server` folder contains all the server related files. Run it with command:

```
 node server.js
```

Access server from the port **3001**

Respectively React based front-end is running from the folder `front`. Run it with command:

```
npm start
```

Access front-end from the port **3000**

## API

API has been built using **nodejs** and **expressjs**. MongoDB was used as a database.

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

### Appointment booking

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

![Book appointment](https://github.com/matikka96/cgi-api/blob/master/screenshots/book_a.png?raw=true)

First create search query:
1. Select specialist (OPTIONAL)
2. Select from-date
3. Select to-date (OPTIONAL)
4. Press "Search" button

Result will then appear in the table. To book appointment:
1. Define visitors name
2. Press green "Book" button

### Create appointment

![Create appointment](https://github.com/matikka96/cgi-api/blob/master/screenshots/create_a.png?raw=true)

User can create multiple appointments by filling the following information:
* Select specialist
* Start time
* End time
* Notes (OPTIONAL)

Then by pressing the yellow "Add to queue" button, appointment appears in the table below. Above process can be repeated.
When ready all the above appointments can be created at once by pressing green "Create" button.

### Add Specialist

![Add Specialist](https://github.com/matikka96/cgi-api/blob/master/screenshots/add_s.png?raw=true)

In order to add specialist two text fields must be filled:
* Name
* Role

List of all existing specialist will be seen below under "All specialists" heading.

### All appointments [EXTRA]

![All appointments](https://github.com/matikka96/cgi-api/blob/master/screenshots/all_a.png?raw=true)

In this tab, user can view all appointments from the database. This was originally for debugging use only.