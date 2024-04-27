const mongoose = require('mongoose');
require('dotenv').config();

// mongodb connection
const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then((res) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    required: true,
    unique: true,
  },
  number: {
    minLength: 8,
    type: String,
    validate: {
      validator: (value) => {
        const formatoValido = /^\d{2,6}-\d+$/;
        return formatoValido.test(value);
      },
      message: (props) => 'invalid number / format xxxx-xxxxxx',
    },

    required: true,
  },
});

// format mongo responses
phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // transform object _id to string and add to the object response.
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Contact', phoneBookSchema);
