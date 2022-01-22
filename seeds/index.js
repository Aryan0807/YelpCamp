const mongoose = require('mongoose');
const Campground= require('../models/campground');
const cities =require('./cities');
const {places, descriptors}= require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
})

const sample = (array)=> array[Math.floor(Math.random()*array.length)];
const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000= Math.floor(Math.random()*1000);
        const price =Math.floor(Math.random()*30)+10;
       const camp= new Campground({
           author: '61e6686d60b3ad553892319a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                  url: 'https://res.cloudinary.com/dm4okte1s/image/upload/v1642760781/YelpCamp/yxzsiicapfrqfoa9etpv.jpg',
                  filename: 'YelpCamp/yxzsiicapfrqfoa9etpv',
                },
              ],
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel qui pariatur numquam aliquam magni at assumenda nostrum, non harum molestiae nulla a itaque soluta quia vero facere dolor perferendis nam!',
            price: price,
            geometry: { 
              type: 'Point', 
              coordinates: [
                cities[random1000].longitude, 
                cities[random1000].latitude,
               ] 
            },
        });
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});