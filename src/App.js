import React from 'react';
import ReactDOM from 'react-dom';
import Templates from './Templates/templates.js';
import Button from './Templates/Button.js';
import './App.css';
import './Templates/templates.css'

const nameCapitalized = (name) => name.charAt(0).toUpperCase() + name.slice(1) ;

function App() {
  return (
    <div className="App">
    	<h1> JSON to HTML Converter </h1>
    	<div class="split left">
		   <div class="">
		      <center>
		         <h4 align="left"> JSON:  </h4>
		         <textarea  class="jsontextarea" id="inputjson" name="inputjson" rows="20" cols="50"></textarea>
		      </center>
		      <br/><button type="button" onClick={processJson}>Generate</button>
		   </div>
		</div>
		<div class="split right">
		   <div class="">
		      <span>
		         <div id="outputhtml" align="left"> Preview</div><br/>
		      </span>
			 <button type="button" id="gitpush" class="dN" onClick={pushCodetoGit}>PushtoGIT</button>
		   </div>
		</div>
    </div>
  );
}


function processJson()
{
	try{
		document.getElementById('outputhtml').innerHTML = "";
		var jsonstring = document.getElementById('inputjson').value ;
		var complete_structure = JSON.parse(jsonstring); 	

		var attribute_structure = complete_structure.Attributes;
		attribute_structure.forEach( function(structure){
			var element = document.createElement('div');	
			var html = new Templates[nameCapitalized(structure.type)](structure);
			ReactDOM.render(html.render(), element);
			document.getElementById('outputhtml').appendChild(element);
		});
		var buttonelement = document.createElement('div');
		var button_html = new Button(complete_structure);
		ReactDOM.render(button_html.render(), buttonelement);
		document.getElementById('outputhtml').appendChild(buttonelement);
		document.getElementById('gitpush').classList.remove('dN')	
	} catch (e){
		window.alert("Incorrect JSON");
		console.log(e);
	}
}

function pushCodetoGit(){



	var email = "vishok.s99@gmail.com";
	//https://github.com/settings/tokens/new
	var token = "token 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";
	var username = "vishok2699";
	var filename = "login.html";

	var url = "https://api.github.com/repos/vishok2699/Dynamic-Web-page-builder/contents/src/Response/" + filename;
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url);
	var doc_content = document.getElementById('outputhtml').innerHTML;
	var content = btoa(unescape(encodeURIComponent(doc_content)));

	xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
	xhr.setRequestHeader("Authorization", token);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
	      console.log(xhr.status);
	      window.alert(xhr.responseText);
	   }};

	var data = {
	    "message": "Response HTML Constructed",
	    "content": content ,
	    "committer": {
	        "name": username,
	        "email": email,
	        "author": {
	            "name": username,
	            "email": email
	        }
	    }
	};

	xhr.send(JSON.stringify(data) );

}


export default App;
