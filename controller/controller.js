// const Router = require("express");
const User = require("../modules/user");
const bcryptjs = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");

// const router = new Router();


// router.use(cookieParser());

const createpath = (page) => path.resolve(__dirname, `../views/${page}.ejs`);




class Controller {

    async homePage(req, res) {
        // res.cookie("Age", 13)
        const title = 'Home';
        res.render(createpath('index') , { title });
    };

//----------------------------------------------------//

    async loginPage(req, res) {
        const title = 'Log in';
        res.render(createpath('login') , { title });
    }

//----------------------------------------------------//

    async registrationPage(req, res) {
        const title = 'Sign up';
        res.render( createpath('registration') , { title });
    }

//----------------------------------------------------//

    async login(req,res) {
        const { email , password } = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(206).send();
        }

        const compare = bcryptjs.compareSync(password, user.password);

        if (!compare) {
            return res.status(206).send();
        }

        return res.status(307).send();
    }

//----------------------------------------------------//

    async registration(req,res) {
        const {email, password, name, surname} = req.body;

        const check = await User.findOne({email: email});
        if (check) {
            return res.status(204).send();
        }

        const sec_password = bcryptjs.hashSync(password, 5);

        const user = new User({email: email, password: sec_password , name: name, surname: surname});
        await user.save();
        return res.status(302).send();
    }

//----------------------------------------------------//

}

module.exports = new Controller();