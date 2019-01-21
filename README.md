# CGI Future Talents API challenge

Purpose of this challenge was to create MVP API for medical client appointment system.

## Setup

This project is separated on two main folders: `front` and `server`.

As the name suggests `server` folder contains all the server related files. Run it with command:

```
 node app.js
```

Access server from: http://localhost:3001/

Respectively React based front-end is running from the folder `front`. Run it with command:

```
npm start
```

Access front-end from: http://localhost:3001/

MongoDB is hosted at mlab.com.

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
- Parameters: {from: String, to: String (OPTIONAL)}

### Searching for free appointments from selected specialist

> /api/v1/timeslots/free?specialists=a&from=x&to=y

- Type: GET
- Parameters: {specialist: String, from: String, to: String (OPTIONAL)}

### Searching for all appointments

> /api/v1/timeslots/all?specialists=a&from=x&to=y

This is basically the same as *"Searching for free appointments from selected specialist"*, but it returns both available and reserved appointments.

- Type: GET
- Parameters: {specialist: String (OPTIONAL), from: String, to: String (OPTIONAL)}

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

Searches for appointments based on specified parameters.

- Type: GET
- Parameters: {specialist: String, from: String, to: String}
- Return: [Appointments] 

## Front-end [OPTIONAL]

User interface has been built in React with the help of Materializecss framework.

There are currently 4 tabs:
1. Book appointment
2. Create appointment
3. Add specialist
4. All appointments

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

By pressing the yellow "Add to queue" button API request is sent to server in order to verify that selected timeslot is available. In case of success appointment appears in the table below. Above process can be repeated.

When ready all the above appointments can be created at once by pressing green "Create" button. Note that newly added appointments are not checked for overlaps in schedule between each other.

### Add Specialist

![Add Specialist](https://github.com/matikka96/cgi-api/blob/master/screenshots/add_s.png?raw=true)

In order to add specialist following fields must be filled:
* Name
* Role

List of all existing specialist will be seen below under "All specialists" heading.

### All appointments [EXTRA]

![All appointments](https://github.com/matikka96/cgi-api/blob/master/screenshots/all_a.png?raw=true)

In this tab, user can view all appointments from the database. This was originally for debugging use only.

## Security

Database used for this project **IS NOT SECURE**. Database url, username, and password are all seen in `/server/config/keys.js` file. This is sandbox database without any important information and for demonstrational use only. 

### How to make equivalent app and API secure?

In order to make this kind of system secure there needs to be a user verification. It might be a good idea to separate users on those with and without admin rights.

For example only admin could be able to:
* Add new specialists
* Modify any record

At the same time normal user would be able to modify and request information that he is only verified for. Information such as:
* Own account information
* Booked appointments
* Ability to modify / cancel own appointment

### How to make it happen in practice?

There are multiple ways of verifying users in situations like this. One the most used one is to save encrypted token to device cookies or local storage. It will then serve as something to verify with on the server side.

Example:

After user logging in encrypted token is sent from server to the user. This token is then used to verify current user on the server during API-requests. Because token is encrypted on the server, it can only be decrypted from the same place. 

Middleware could be added to the API-requests that requires user identification. Let us have a look one of the routes:

```
// Middleware for user verification
verifyUser = (req, res, next) => {
  if (userIsVerified) {
    next();
  } else {
    res.send({message: "User not verified"});
  }

}

// Search for free appointments
router.get("/appointment/free", verifyUser, function(req, res, next) {
...
```

In this example "verifyUser" function is used as a middleware to verify user. If user is verified `next()` is called and process continues normally. In other case execution is interrupted securely.