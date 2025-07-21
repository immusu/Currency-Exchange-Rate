const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://imamulmursalinsujoy:Rusims%4012345@cluster0.vipcrrg.mongodb.net/sample_restaurants?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));
