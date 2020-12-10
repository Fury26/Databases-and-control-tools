const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use('/', require('./routers/clubRouter'));
app.use('/', require('./routers/matchRouter'));
app.use('/', require('./routers/playerRouter'));
app.use('/', require('./routers/stadiumRouter'));
app.use('/', require('./routers/tournamentsRouter'));
app.use('/', require('./routers/clubStadiumRouter'));
app.use('/', require('./routers/clubsTournamentsRouter'));


app.listen(5000, () => {
    console.log('Server has started on port 5000');
});