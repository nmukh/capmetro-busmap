/**
* Busroute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
	    
	    coordinates: {
	      type: 'json'
	    }
	      
	  },
	  
	  /*
	  * Search models based on location
	  */
	  search: function (conditions) {
	 
	    // Let's build up a MongoDB query
	    var query = {};
	 
	    // We need to use `native` for geo queries
	    Property.native(function (err, collection) {
	 
	      // Co-ordinates are passed from the client side (GMaps JS API)
	      // Note that we don't get them server-side because apparently 
	      // the server-side API isn't designed for real-time user searches. 
	      // Probably too slow or something.
	      query.coordinates = {
	        $near: {
	          $geometry: {
	            type: "Point",  
	            coordinates: [ // long then lat
	              conditions.coordinates.lng, 
	              conditions.coordinates.lat 
	            ]
	          },
	          // $maxDistance : <distance in meters> // TODO
	        }
	      };
	 
	    });
	 
	 
	  }
};

