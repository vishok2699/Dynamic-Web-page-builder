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
    	<div class="header">
    		<h1>Dynamic Web Page Builder</h1>
    		<h3>A Web Application framework to dynamically render template-driven web pages based on the metadata JSON and push the source code to git.</h3>
    	</div>
    		<div class="sidenav sidebar"> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  				<a href="http://localhost:3000/" onClick={() => renderPage('customize')}>Customize Web Page</a> <br/>
  				<a href="#link2" onClick={() => renderPage('existing')}>Existing Web Page</a>
				</div>
				<br/><br/><br/><br/><br/><br/><br/><br/><br/>
					<div class="hi">
					   <div>
					      <span>
					         <div id="outputhtml" align="left"> </div><br/>
					         <textarea class="jsontextarea" id="inputjson" rows="25" cols="50" ></textarea>
					      </span>
					      <br/>
					    </div>
					</div>
				 			<button type="button" id="gitpush" class="sub_green dN" onClick={pushCodetoGit}>PushtoGIT</button>
							<button type="button" class="sub_green" onClick={processJson} id="generate">Generate</button>
							<button type="button" class="sub_green dN" onClick={getFilesContentsFromGIT} id="getfile">GetFile</button>
		   </div>
  );
}


function getJSON(){
	return {
		"ActionDisplayName": "Login",
	"Attributes": [
		{
			"name": "Name",
			"value": "Vishok Kumar",
			"type" : "password"
		},
		{
			"name": "username",
			"value": "vk02",
			"type" : "input"
		},
		{
			"name": "password",
			"value": "password",
			"type" : "password"
		},
		{
			"name": "userType",
			"type" : "dropdown",
			"dropdownvalues": [
				{
					"displayvalue": "Guest",
					"value": "guest"
				},
				{
					"displayvalue": "Admin",
					"value": "admin"
				}
			]
		},
		{
			"name": "Gender",
			"type" : "radio",
			"options": [
				{
					"displayvalue": "Male",
					"value": "male"
				},
				{
					"displayvalue": "Female",
					"value": "female"
				},
				{
					"displayvalue": "Other",
					"value": "other"
				}
			]
		},
		{
			"name": "Hobbies",
			"type" : "checkbox",
			"options": [
				{
					"displayvalue": "Playing",
					"value": "playing"
				},
				{
					"displayvalue": "Reading",
					"value": "Reading"
				}
			]
		}

	]
};
}

function renderPage(page){
		debugger;
		if(page === 'customize'){
				document.getElementById('inputjson').classList.remove('dN');
				document.getElementById('gitpush').classList.remove('dN');
				document.getElementById('generate').classList.remove('dN');
				document.getElementById('getfile').classList.add('dN');
		} else {
				document.getElementById('inputjson').classList.add('dN');
				document.getElementById('gitpush').classList.add('dN');
				document.getElementById('generate').classList.add('dN');
				document.getElementById('getfile').classList.remove('dN');
				getFilesFromGIT();
		}
}

function getInputJson(){
		var complete_structure = document.getElementById('inputjson').value;
		if(complete_structure === ""){
				complete_structure = getJSON();
		}else {
			complete_structure = JSON.parse(complete_structure);
		}
		return complete_structure;
}

function processJson()
{
	try{
		debugger;
		document.getElementById('outputhtml').innerHTML = "";
		var complete_structure = getInputJson();

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
		document.getElementById('gitpush').classList.remove('dN');
		document.getElementById('generate').classList.add('dN');
		document.getElementById('inputjson').classList.add('dN');
	} catch (e){
		window.alert("Incorrect JSON");
		console.log(e);
	}
}

function pushCodetoGit(){



	var email = "vishok.s99@gmail.com";
	//https://github.com/settings/tokens/new  public : repo
	var token = "token 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";
	var username = "vishok2699";
	var filename = (getInputJson()).ActionDisplayName + ".html";

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

function getFilesContentsFromGIT(){

	debugger;
	var email = "vishok.s99@gmail.com";
	//https://github.com/settings/tokens/new  public : repo
	var token = "token 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";
	var username = "vishok2699";	
	var filename = document.getElementById('files').value;

	var url = "https://api.github.com/repos/vishok2699/Dynamic-Web-page-builder/contents/src/Response/" + filename ;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	var doc_content = document.getElementById('outputhtml').innerHTML;
	var content = btoa(unescape(encodeURIComponent(doc_content)));

	xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
	xhr.setRequestHeader("Authorization", token);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
	   		debugger;
	      console.log(xhr.status);
	      var resp = JSON.parse(xhr.responseText);
	      var content_resp = resp.content;
	      document.getElementById('outputhtml').innerHTML = window.atob(content_resp);
	      document.getElementById('getfile').classList.add('dN');
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




function getFilesFromGIT(){

	var email = "vishok.s99@gmail.com";
	//https://github.com/settings/tokens/new  public : repo
	var token = "token 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";
	var username = "vishok2699";	
	var filename = "response.html";

	var url = "https://api.github.com/repos/vishok2699/Dynamic-Web-page-builder/contents/src/Response/" ;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	var doc_content = document.getElementById('outputhtml').innerHTML;
	var content = btoa(unescape(encodeURIComponent(doc_content)));

	xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
	xhr.setRequestHeader("Authorization", token);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
	      console.log(xhr.status);
	      var resp = JSON.parse(xhr.responseText);
				var dropdown = '<select name="files" id="files">'; 
	      for (var i =0; i<resp.length; i++){
	      	dropdown += '<option value="' + resp[i].name + '" >' + resp[i].name +'</option>';
	      }
	      dropdown += '</select>';
	      document.getElementById('outputhtml').innerHTML = dropdown;
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
