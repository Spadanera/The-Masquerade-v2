import { Interface, type } from 'implement-js';

const Place = Interface('Place')({
    getPlaces: type('function'),
    getPlace: type('function'),
    createPlace: type('function'),
    updatePlace: type('function'),
    deletePlace: type('function')
}, {
    error: true,
    strict: true 
});

export default Place;