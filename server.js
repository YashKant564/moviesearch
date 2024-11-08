// const axios = require("axios");

// async function make_api_calls() {
//   const get_response_1 = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts",
//     {
//       params: {
//         userId: 1,
//       },
//     }
//   );
//   console.log(get_response_1.data);

//   const post_response_2 = await axios.post(
//     "https://jsonplaceholder.typicode.com/posts",
//     {
//       title: "something",
//       body: "anything",
//       userId: 10,
//     }
//   );
//   console.log(post_response_2.data);
// }

// make_api_calls();

const express = require("express");

const app = express();
const axios = require("axios");
const path = require("path");
const { log } = require("console");
const port = 3000;
const apikey = "1e439343";

app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// const fun = async()=>{
//     const response = await axios.get("https://www.omdbapi.com/", {
//         params:{
//             apikey: apikey,
//             s: "test",
//         },
//     });
//     console.log(response.data);
// }

// fun();

// /search?query

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/search", async(req, res) => {
    // const name = req.query.search_text;
    const query = req.query.query;
    try{
    const response = await axios.get("http://www.omdbapi.com/", {
        params:{
            apikey: apikey,
            s: query,
        },
    });
    
    return res.status(200).json(response.data);
    }catch(error){
        res.status(500).send("Error fetchind data from omdb api");
    }
});

app.listen(port, () =>{
    console.log(`server at http://localhost:${port}/`);
});