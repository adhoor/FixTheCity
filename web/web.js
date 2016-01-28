List = new Mongo.Collection("list");
var MAP_ZOOM = 15;
if (Meteor.isClient) {
  // This code only runs on the client
  
  Template.body.helpers({
    list: function(){
      return List.find({}, {sort: {createdAt: -1}});
    }
  });
  
  Template.entry.events({
    "click .delete": function () {
      List.remove(this._id);
    }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
