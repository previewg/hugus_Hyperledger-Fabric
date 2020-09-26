
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const profile_upload = require('../app');




// MongoDB 설정
router.use(session({
    secret: 'Molrang~$1$234',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: "mongodb://localhost/Hug_us_session",
        collection: "sessions"
    })
}));



router.post('/signup', async (req, res, next) => {
    const {email, nickname, password} = req.body;
    let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let regPassword = /^[a-zA-Z0-9]{10,15}$/

    try {
        const exUser = await User.findOne({where: {email}});
        const exNick = await User.findOne({where: {nickname}});
        //중복방지
        if (exUser) {
            return res.status(400).json({
                error: 'EMAIL EXISTS',
                code: 1
            })
        }
        if (!regEmail.test(req.body.email)) {
            return res.status(400).json({
                error: 'BAD EMAIL EXP',
                code: 2
            })
        }
        if (exNick) {
            return res.status(400).json({
                error: 'NICKNAME EXISTS',
                code: 3
            })
        }
        if (!regPassword.test(req.body.password)) {
            return res.status(400).json({
                error: "BAD PASSWORD",
                code: 4
            })
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash,
        });
        return res.status(200).json({success: 'true'});

    } catch (err) {
        console.error(err);
        return next(err);
    }

});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    User.findOne({where: {email}}).then((user) => {
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        ;

        bcrypt.compare(password, user.password).then((isMatched) => {
            if (isMatched) {
                let session = req.session;
                session.loginInfo = {
                    user_email: user.email
                };
                // session.save(err =>{
                //     if(err) throw err;
                // });
                //  console.log(req.session);

                const payload = {
                    id: user.id,
                    nickname: user.nickname,
                };
                // jwt 객체가 sign() method를 호출해서 토큰을 생성
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        //token 지속시간
                        expiresIn: '24h',
                    },
                    (err, token) => {
                        // res.cookie(key,value) cookie에 key값을 넣는 방식
                        res.cookie('hugus', token);
                        res.json({
                            nickname: user.nickname,
                            id: user.id,
                            token: token,
                        });
                    },
                );
            } else {
                return res
                    .status(400)
                    .json({password_incorrect: 'PassWord Incorrect'});
            }
        });
    });
});

router.post('/signout', (req, res) => {
    let store = req.sessionStore;
    store.destroy(err => {
        if (err) throw err;
    })
    res.clearCookie('hugus')
    return res.json({success: true});
})
router.post('/update', (req, res, next) => {
    const {email, nickname, password} = req.body;
    User.update({nickname: nickname}, {where: {nickname}})
})
router.post('/destroy', (req, res, next) => {
    const {username} = req.body;
    let store = req.sessionStore;

    try {
        store.destroy(err => {
            if (err) throw err;
        })
        res.clearCookie('hugus')
        User.destroy({where: {nickname: username}}).then(result => {
                return res.status(200).json({success: 'true'});

            }
        )
    } catch (error) {
        console.error(error);
        return next(error);
    }

})
router.put("/profile", profile_upload.single("file"), async (req, res) => {
    const {username} = req.body;
    try {
        console.log(req.file)
        let profile = req.file.path
        await User.update({
                user_profile: profile
            }, {where: {nickname: username}}
        )
        res.json({profile_path:profile})
    } catch (err) {
        console.log(err);
        res.json({message: false})
    }
});
router.post('/confirm', async (req, res) => {
    console.log(req.body)
    const {username, password } = req.body.user;


    User.findOne({where: {nickname: username}}).then((user) => {
        bcrypt.compare(password, user.password).then((isMatched) => {
            if (isMatched) {
                return res

                    .status(200)
                    .json({success: true})
            } else {
                res
                    .status(400)
                    .json({password_incorrect: 'PassWord Incorrect'})
            }
        })
    })
})
module.exports = router;
