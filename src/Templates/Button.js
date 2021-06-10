import React from 'react';
import './templates.css';

class Button extends React.Component {

	Button(structure){
		this.structure = structure;
	}

  	render() {
  		return (
    		<div>
          		<button type="button"  class="sub" id="{this.props.ActionDisplayName}_button">{this.props.ActionDisplayName}</button>
    		</div>
    	);
  	}
}

export default Button