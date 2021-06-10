import React from 'react';
import './templates.css';

class Input extends React.Component {

	Input(structure){
		this.structure = structure;
	}

  	render() {
  		return (
        <div>
      		<div>
      			<div class="bo">
      				{this.props.name}
      			</div>
      			<pre></pre>
      				<input type="text" value={this.props.value} size={this.props.size}/>
      		</div>
         <br/>
        </div>
    	);
  	}
}

export default Input