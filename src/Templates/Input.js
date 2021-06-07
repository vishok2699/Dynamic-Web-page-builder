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
      			<span>{this.props.name}</span><pre></pre>
      			<input type="text" value={this.props.value} />
      		</div>
          <br/>
        </div>
    	);
  	}
}

export default Input