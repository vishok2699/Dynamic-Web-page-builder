import React from 'react';
import './templates.css';

class Password extends React.Component {

	Password(structure){
		this.structure = structure;
	}
  	render() {
  		return (
        <div>
      		<div>
      			 <span>{this.props.name}</span><pre></pre>
      			 <input type="password" value={this.props.value} />
      		</div>
          <br/>
        </div>

    	);
  	}
}

export default Password