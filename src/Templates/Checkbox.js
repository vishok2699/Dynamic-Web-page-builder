import React from 'react';
import './templates.css';

class Checkbox extends React.Component {
  render() {
  const optionsmap = this.props.options;
    return (
    	<div>
    		<label for="{this.props.name}">{this.props.name}</label>
    		{optionsmap.map( item => 
    				<div>
	    				<input type="checkbox" id="{item.displayvalue}" name="{this.props.name}" value="{item.value}" />
	    				<label for="{item.value}">{item.displayvalue}</label>
	    			</div>
    			)}
          <br/>
    	</div>

    );
  }
}

export default Checkbox