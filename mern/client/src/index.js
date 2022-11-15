import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri ='mongodb+srv://admin:notes-db.@cluster0.1yzsl33.mongodb.net/?retryWrites=true&w=majority';
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('notes');
//     const collection1 = database.collection('angela-notets');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { date: '02/02/2022' };
//     const note = await collection1.findOne(query);

//     console.log(note);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
