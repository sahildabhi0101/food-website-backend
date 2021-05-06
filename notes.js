//  koi pan program mate server banavvu pade
// first npm init no use karvano
// after then npm install express thi server create karvanu

// const { format } = require("morgan")

// npm i nodemon server auto reload mate and package.json ma scripts ma "dev":"nodemon app.js"  and browser ma run karva mate npm run dev

// http://localhost:8080/
// all post jova mate  GET

// http://localhost:8080/post
// post create karva mate POST
// format::
// {
//     "title":"this is sahil's fourth post",
//     "body":"this is fourth post's body"
// }

// http://localhost:8080/signup
// new user create karva mate POST
// format ::
// {
//     "name": "red2",
//     "email":"red2@gmail.com",
//     "password":"rrrrrr10"
// }

// http://localhost:8080/signin
// login POST
// format::
// {
//     "email":"abcde3@gmail.com",
//     "password":"aaaq123"
// }

// http://localhost:8080/signout
// sign out mate GET
// format ::
// {
//     "email":"abcde3@gmail.com",
//     "password":"aaaq123"
// }

// http://localhost:8080/users
// see all user GET

// http://localhost:8080/users/60549e03ad81b6515c75a961
// see particular user by id GET
// id user mathi lai levi

// http://localhost:8080/users/60549e03ad81b6515c75a961
// update(edit) user info  PUT
// format:: 
// {
//     "name" : "redone"
// }
// je item change karvi hoy e lakhvu

// http://localhost:8080/users/60556529c2f8624fe06140ae
// delete user DELETE 

// http://localhost:8080/post/new/605a29ebace5e42724d13687
//POST post banavva mate by user through
// means ke je user e post banavi hoy e post ma enu user-id dekhay
//URL ma last ma user-id che je data base mathi mali jay
// format :: body ma x-www-from vala ma 2 row add karvi 
// first row :: title
//second row :: body 
// both row ma baju ma description lakhvu


// http://localhost:8080/posts/by/605a29ebace5e42724d13687
// GET see all post who have been posted by one user
// URL ma last ma je che e user-id che je database mathi mali jay

// http://localhost:8080/post/605ab55b9db81a0a303fa22b
// DELETE post ne delete karva mate
// url ni last ma post nu id

// http://localhost:8080/post/605abf41c9bd3e2aa48fbdf5
// PUT update karva mate
// url ni last ma  post nu id 
// format
// {
//     "title":"this is first updated post's title"
// }


// mongodb ne local-host ma leva mate no video :: 12 ma playlist no 26 na last ma 