const Router = require("express");
const Controller = require("../../controller/controller");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const router = new Router();

router.use(Router.json());
router.use(cookieParser());


router.use((req, res, next) => {
    console.log(req.ip);
    next();
})

router.use((req,res,next) => {
    const token = jwt.sign({name: "Nazarbek"}, "secret", {
        expiresIn: 60 * 15,
    });
    res.cookie("token", token, {
        maxAge: 60*60*1000,
        path: '/login',
    });
    console.log(jwt.verify(token, "secret", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    }));

    next();
});


// ---------------- ROUTERS ----------------- //


router.get('/', Controller.homePage);


router.get('/login', Controller.loginPage);


router.get('/signup', Controller.registrationPage);


// ------------------------------------------ //


module.exports = router;