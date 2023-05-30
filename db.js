const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  profilePicture: String,
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});

const User = mongoose.model('User', UserSchema);
