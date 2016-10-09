/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function (req, res) {
        var user = req.user;      
        var data;
        Book.find({"user.email":user.email}).exec(function (err, books) {
            if (err) {
                console.log(err);
            }            
            data=books;
        });
        console.log(data);
        res.view({books:data});
    },
    'create': function (req, res, next) {
        var user = req.user;
        var values = req.params.all();
        values.user = user;
        Book.create(values, function bookCreated(err, book) {
            if (err)
                return next(err);
            res.redirect('/book/new');
        })
    }
};

