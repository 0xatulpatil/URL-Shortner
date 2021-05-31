// install express with `npm install express` 
const express = require('express')
const { Deta } = require('deta');
const deta = Deta('c0gvhbor_xA7yVeSCeJ72Cefnv4kHynK77mpU94Cn');
const db = deta.Base('simpleDB');
const app = express();


app.use(express.urlencoded({extended: false}))
const router = require('./routes/routes');
app.use(express.json());

app.get('/', (req, res) => res.send('Hey what are you doing here?, You shouldnt be here!'));



//setting ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/home', router);


app.get('/:id', async (req, res)=>{
    try{
    const data = await db.get(req.params.id)
    const mainURL = await data.URL

   res.redirect(mainURL);
    }catch(err){
        
    }
});




// export 'app'
module.exports = app

app.listen('3000', ()=>{
    console.log('app started on port 3000')
});
