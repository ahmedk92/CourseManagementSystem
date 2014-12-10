var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    code: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: false},
    rounds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

var ServiceSchema = new Schema({
    code: {type: String, required: true},//search service by code
    title: {type: String, required: true},
    description: {type: String, required: true},
    Requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var ServiceRequest = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
    creationDate: {type: Date, required: true}
});
var EventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: false},
    from: {type: Date, required: false},
    to: {type: Date, required: false},
    refId: {type: String, required: false}, //course code if the event is for course
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    altEmail: {type: String, required: false},
    company: {type: String, required: false},
    jobTitle: {type: String, required: false},
    mobile: {type: String, required: false}

});

var NotificationSchema = new Schema({
    code: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true}
});
module.exports = {
    Course: mongoose.model('Course', CourseSchema),
    Event: mongoose.model('Event', EventSchema),
    User: mongoose.model('User', UserSchema),
    Service: mongoose.model('Service', ServiceSchema),
    Notification: mongoose.model('Notification', NotificationSchema)
};
/*
 *   user.put("name", name);
 user.put("email",email);
 user.put("altemail", altmail);
 user.put("company", company);
 user.put("jobtitle", jobtitle);
 user.put("mobile", mobile);
 */