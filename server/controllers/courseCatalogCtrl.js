(function (courseCatalogCtrl) {

    var model = require('../model/cmsModel');
    var Course = model.Course;
    courseCatalogCtrl.init = function (app) {

        /* Design Unique ID: 2637*/
        app.post("/course/registerToRound", function (req, res) {
            var User = model.User;
            var Event = model.Event;
            User.findOne({email: req.body.userEmail}).exec()
                .then(function (user) {
                    //if (err)
                    //    return res.json(500, {message: "Internal server error: " + err});
                    if (user == null)
                        return res.json(404, {message: "User with that email is not found: " + req.body.userEmail});
                    Event.findById(req.body.eventId, function (err, evnt) {
                        if (err)
                            return res.json(500, {message: "Internal server error: " + err});
                        if (evnt == null)
                            return res.json(404, {message: "No event with this id"});

                        if (evnt.users.indexOf(user._id) > -1)
                            return res.json(409, {message: "User already subscribed to this event"}).end();
                        evnt.users.push(user);
                        evnt.save(function (err, evnt) {
                            if (err)
                                return res.json(500, {message: "Internal server error: " + err});
                            res.json(201, {message: "created"});
                        });
                    });
                });
        });
        /* Design Unique ID: 2604*/
        app.get("/courses", function (req, res) {
            Course.find({}, function (err, courses) {
                if (err) res.status(500).end();
                res.json({courseList: courses});
            });
            //var cutoff = new Date();
            //cutoff.setDate(cutoff.getDate()-5);
            //MyModel.find({modificationDate: {$lt: cutoff}}, function (err, docs) { ... });
        });
        /* Design Unique ID: 2650*/
        app.get("/courses/nextRounds/:courseCode", function (req, res) {

            var Event = model.Event;
            console.log(req.param("courseCode"));
            Event.find({from: {$gt: Date.now()}, refId: req.param("courseCode")}, function (err, evnts) {
                if (err) res.status(500).end();
                console.log(evnts[0].from);
                res.json({eventList: evnts});
            });
            //app.get('/p/:tagId', function(req, res) {
            //    res.send("tagId is set to " + req.param("tagId"));
            //});
            //var cutoff = new Date();
            //cutoff.setDate(cutoff.getDate()-5);
            //MyModel.find({modificationDate: {$lt: cutoff}}, function (err, docs) { ... });
        });
        /* Design Unique ID: 2605*/
        app.post("/courses", function (req, res) {

            var course = new Course();
            course.code = req.body.code;
            course.title = req.body.title;
            course.description = req.body.description;
            course.cost = req.body.cost;

            course.save(function (err, course) {
                if (!err) {
                    res.json(201, {id: course._id});
                } else {
                    res.json(500, {message: "Could not create course. Error: " + err});
                }
            });
            //Course.create(req.body);
        });

        app.put("/courses", function (req, res) {

            Course.findById(req.body.id, function (err, course) {
                if (course == null)
                    return res.status(404).end();
                course.title = req.body.title;
                course.description = req.body.description;
                course.cost = req.body.cost;

                course.save(function (err, course) {
                    if (!err) {
                        res.status(200).end();
                    } else {
                        res.json(500, {message: "Could not create course. Error: " + err});
                    }
                });
            });
        });

        app.delete("/courses", function(req, res){
            Course.findById(req.body.id, function (err, course) {
                if (course == null)
                    return res.status(404).end();

               course.remove(function (err) {
                    if (!err) {
                        res.status(204).end();
                    } else {
                        res.json(500, {message: "Could not delete course. Error: " + err});
                    }
                });
            });
        });
    };
})(module.exports);