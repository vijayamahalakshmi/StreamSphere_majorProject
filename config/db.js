const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://n191025:Vij%40y%40m%40h%40123@cluster0.ydd56wu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connection successful!')).catch(err=>console.log(err))

