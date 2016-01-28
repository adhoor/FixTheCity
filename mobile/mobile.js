List = new Mongo.Collection("list");


if (Meteor.isClient) {
  // This code only runs on the client
Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});;
  Template.example.events({
    'click .takePhoto': function(event, template) {
        var cameraOptions = {
            width: 800,
            height: 600
        };
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (error) {
              var warining=sAlert.warning('error with picture', {timeout: 'none'});
            }
              else{
           $('.photo').show();
           $('.photo').attr('src', data); 
         }  
        });
        event.preventDefault();
    }
  });
  
    Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var topic= event.target.topic.value;
      var details = event.target.details.value;
      var src=  $( '.photo' ).attr('src');
      var hidden="hidden";
      

      
      var loc;

      loc = Geolocation.latLng();
      if (! loc){
           var warining=sAlert.warning('error retrievin gps', {timeout: 'none'});
        }
      // Insert a task into the collection
      List.insert({
        topic: topic,
        details: details,
        image: src,
        latitude: loc.lat ,
        longitude: loc.lng,
        createdAt: new Date() // current time
      });
      // Clear form
      event.target.topic.value = "";
      event.target.details.value = "";
       $('.photo').attr('src', ""); 
       $('.photo').hide(); 
    }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
