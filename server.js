'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');
const { reservations } = require('./test-data/reservations')
const uuid = require('uuid')

const PORT = process.env.PORT || 8000;

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  res.json(flights[flightNumber])
};

const handleReservation = (req, res) => {
  const reservationInfo = {
    id: uuid.v4(),
    flight: req.body.flight,
    seat: req.body.seat,
    givenName: req.body.givenName,
    surname: req.body.surname,
    email: req.body.email,
  }
  reservations.push(reservationInfo)
  console.log(reservations)
  res.json(reservationInfo)
}

const handleGetReservation = (req, res) => {
  const { id } = req.params;

  res.json(reservations.find(reservation => reservation.id === id))
  
}

const handleRedirect = (req, res) => {
  res.redirect('/seat-select')
}

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  
  // endpoints
  .get('/', handleRedirect)
  .get('/flights/:flightNumber', handleFlight)
  .post('/reservation', handleReservation)
  .get('/reservation/:id', handleGetReservation)
  .use((req, res) => res.send('Not Found'))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
