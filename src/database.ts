import mongoose from 'mongoose';

import config from './config/config';

mongoose.connect(config.DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB conectada');
});

connection.on('error', (error) => {
    console.log(error);
    process.exit(0);
});