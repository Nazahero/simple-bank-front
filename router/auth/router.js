const Router = require("express");
const Controller = require("../../controller/controller");
const router = new Router();

const jsonParser = Router.json();


// ---------------- ROUTERS ----------------- //


router.post('/login', jsonParser, Controller.login);


router.post('/registration', jsonParser, Controller.registration);


// ------------------------------------------ //


module.exports = router;