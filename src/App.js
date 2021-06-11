import React from 'react';
import ReactDOM from 'react-dom';
import Templates from './Templates/templates.js';
import Button from './Templates/Button.js';
import './App.css';
import './Templates/templates.css'
import usericon from "./Images/usericon.png";

const nameCapitalized = (name) => name.charAt(0).toUpperCase() + name.slice(1) ;

function App() {
  return (

	<div>
    <div className="App">
    	<div class="header">
	    		<h1>Dynamic Web Page Builder</h1>
	    		<button  id="userIcon" onClick={openForm} class="userClass"><img class="imageclass" src={usericon} /></button>

	    		<h3>A Web Application framework to dynamically render template-driven web pages based on the metadata JSON and push the source code to git.</h3>
	    	</div>
	    		<div class="sidenav sidebar"> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	    			<div id="customize"  onClick={() => renderPage('customize')}  class="selected_Menu">
	  						<br/><div class="menutext"><h4 class="dI fwN">   Customize Web Page</h4></div> <br/>
	  				</div>
	  				<div id="existing" onClick={() => renderPage('existing')}>
	  						<br/><div class="menutext"><h4 class="dI fwN">    Existing Web Page</h4></div><br/>
  				</div>
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
		   <i class="arrow up"></i>
		   <div class="form-popup dN " id="myForm">
		   		<div class="form-container">
					    <h1>User Token</h1>
					    <button type="token" class="btn" onClick={getToken}> Get Token </button>
					    <input type="text" placeholder="Paste the token" id="newtoken" required />
					    <button type="token" class="btn" onClick={closeForm}>Apply Token</button>
					    <button type="button" class="btn cancel" onClick={closeForm}>Close</button>
			    </div>
			</div>
		</div>
  );
}


function getJSON(){
	return {
		"ActionDisplayName": "Naming",
	"Attributes": [
		{
			"name": "Name",
			"value": "Vishok",
			"type" : "input",
			"size": "10"
		},
		{
			"name": "NickName",
			"value": "VK",
			"type" : "input",
			"size": "10"
		}
	]
};
}


function openForm(){
		document.getElementById('myForm').classList.remove('dN');
}

function closeForm(){
		document.getElementById('myForm').classList.add('dN');	
}

function getToken(){
	window.open("https://github.com/settings/tokens/new");
}

function renderPage(page){
		if(page === 'customize'){
				window.location.reload();
				document.getElementById('inputjson').classList.remove('dN');
				document.getElementById('gitpush').classList.remove('dN');
				document.getElementById('generate').classList.remove('dN');
				document.getElementById('getfile').classList.add('dN');
				document.getElementById('customize').classList.add('selected_Menu');
				document.getElementById('existing').classList.remove('selected_Menu');
		} else {
				document.getElementById('inputjson').classList.add('dN');
				document.getElementById('gitpush').classList.add('dN');
				document.getElementById('generate').classList.add('dN');
				document.getElementById('getfile').classList.remove('dN');
				document.getElementById('existing').classList.add('selected_Menu');
				document.getElementById('customize').classList.remove('selected_Menu');
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

	var repoInfo = getGITRepoInformation();
	var email = repoInfo.email;
	var token = repoInfo.token;
	var username = repoInfo.username;
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
	      window.alert("Successfully pushed, try in Existing Templates section");
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

function getGITRepoInformation(){

	//https://github.com/settings/tokens/new  public : repo
	var repoInfo = {};
	repoInfo.email = "vishok.s99@gmail.com";
	var newtoken = document.getElementById('newtoken').value;
	if(newtoken === ""){
			repoInfo.token = "token  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";
	} else {
		repoInfo.token = "token " + newtoken;
	}
	repoInfo.username = "vishok2699";	
	return repoInfo;
}




function getFilesContentsFromGIT(){

	var repoInfo = getGITRepoInformation();
	var email = repoInfo.email;
	var token = repoInfo.token;
	var username = repoInfo.username;
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

	var repoInfo = getGITRepoInformation();
	var email = repoInfo.email;
	var token = repoInfo.token;
	var username = repoInfo.username;

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
	   		debugger;
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
