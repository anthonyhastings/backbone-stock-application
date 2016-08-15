# Backbone Stock Application

## Introduction
The repository is a demonstration of clean architecture for implementing a
stock application with server-side listings being displayed and an add form
for new stock. It uses a simple ExpressJS to simulate an API layer for the
front-end web application to interact with.


## Installation
The entire tool chain and server are node-based. There is a post install task
which builds client-side files then starts the server. Simply run the following:

```
npm install
```

If for some reason the server doesn't start after this, you can run it with
the following commands:

```
npm run-script build && npm run-script server
```

Look in the terminal for where the application is serving from (by default it
should be http://localhost:4000).


## Notes / Decisions
- The application was built using Google Chrome as the main browser; it's not
doing anything strange and _should_ work across all major browsers.

- A small tool chain has been developed to make the application easier to
maintain; tasks for compiling styles and scripts, minifying images and so on.

- It has some basic responsive styling to ensure that it is still functional
on smaller breakpoints.

- BackboneJS has been used for a clean separation of concerns (data logic, view
handling).

- Data structures via Collections and Models have been given appropriate
functionality to manipulate server data, and to validate client-side forms.
They've also been unit tested to ensure functionality is correct.

- An ExpressJS server was used to create a few RESTful routes for creating and
retrieving records. It's not a full implementation but enough for the demo.

- Dates have been stored as Unix timestamps so they can be easily formatted into
any required timezone (giving the application some portability and scalability).


## With more time...
- I would have implemented and showcased view routing, and had both views on
separate screens for a cleaner interface.

- The views would have been given unit tests to check that rendered templates
have the relevant amount of rows, and that they respond to application level
events.

- The data structure unit testing could be stronger and also test that some
guaranteed fail scenarios do indeed fail.

- An isomorphic solution would have been investigated so that the user upon
page load doesn't have to wait for the JavaScript bundle to download before
interacting with the page.

- Further would could have been done to create an easier interface for mobile
clients and smaller breakpoints in general.

- API endpoints on the server would have been given server-side validation also.
Never trust the client-side alone!

- Localization could've been implemented via a Gettext library so that the
interface could be translated to various languages and currencies.

## Thanks

Thanks for looking at my code! Feel free to forward any questions onto myself
or use the repositories issue tracker.