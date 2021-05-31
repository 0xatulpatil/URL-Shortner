const express = require('express');
const { nanoid } = require('nanoid');

const router = express();


const bodyParser = require('body-parser')
const { Deta } = require('deta');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const deta = Deta('YOUR DETA KEY'); // configure your Deta project
const db = deta.Base('simpleDB');

router.use(express.static(__dirname + '../public'));


router.get('/', (req, res) => {

    res.render('home.ejs');

});

router.post('/url', async (req, res) => {
    let url = req.body.url;
    let keys = nanoid(4);
    try {
        db.put(
            {
                URL: url,
                key: keys,
            }
        );

        let webl = '7jp3ho.deta.dev'
        let keyParam = keys
        let shortenedURL = webl + '/' + keyParam;


        res.render('show.ejs', { data: shortenedURL });
    } catch (err) {
        console.log(err);
    }

});





module.exports = router;


