import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
let posts =[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req,res)=> {
    res.render('index.ejs', {
        posts: posts
});
}
);



//Create new post
app.post('/', (req,res)=> {

posts.push(req.body);
console.log(posts);

    res.redirect('/');
});




//Delete post 
app.post('/delete',(req,res) => {
        console.log('Delete request received');

        for(let x=0;x<posts.length;x++) {
            
            if(posts[x].heading === req.body.deletebutton){
                posts.splice(x,1);
            }
        }
        res.redirect('/');
    })





//Go to separate page for updating post
app.post('/updatepage',(req,res) => {

    getPostInfo('updatepage.ejs',req.body.updatebutton,res);
    
    })



//Update post when new content is input and button pressed
app.post("/update",(req,res) => {
console.log(req.body);
    for(let x=0;x<posts.length;x++) {
            
        if(posts[x].heading === req.body.updatepost){
            posts.splice(x,1,req.body);
        }
    }

    res.redirect('/')
})





//view post in full on separate page
app.post('/postview', (req,res)=> {
        getPostInfo('postview.ejs',req.body.viewbutton,res);
    }
    );





app.listen(port, (req, res)=> {
        console.log("Always watching on " + port);
    });






//Function to render relevant post on separate page
function getPostInfo (page,button,response) {
        for(let x=0;x<posts.length;x++) {
            
            if(posts[x].heading === button){
                response.render(page, {
                    heading: posts[x].heading,
                    author: posts[x].author,
                    content: posts[x].content,
            });
            }
        } 
    }





/*
    function changePost(button,content){
        for(let x=0;x<posts.length;x++) {
            
            if(posts[x].heading === button){
                posts.splice(x,1,content);
            }
        }
    }
        */