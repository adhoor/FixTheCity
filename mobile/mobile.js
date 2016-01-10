List = new Mongo.Collection("list");


if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    list: function(){
      return List.find({}, {sort: {createdAt: -1}});
    }
  });
    Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var topic= event.target.topic.value;
      var details = event.target.details.value;
      // Insert a task into the collection
      List.insert({
        topic: topic,
        details: details,
        createdAt: new Date() // current time
      });
      // Clear form
      event.target.topic.value = "";
      event.target.details.value = "";
    }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
