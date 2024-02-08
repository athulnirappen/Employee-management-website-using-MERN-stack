const mongoose=require('mongoose')

const connectionstring = process.env.DATABASE

mongoose.connect(connectionstring, {
  useUnifiedTopology: true,
  useNewUrlParser:true
}).then((data) => {
    console.log(`mongodb atlas connected to ems server ||`);
}).catch((err) => {
    console.log(`mongodb connection failed`);
})