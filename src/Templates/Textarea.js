import React from 'react';
import './templates.css';

class Textarea extends React.Component {
  render() {
  		return (
    		<div>
    			<span>{this.props.name}</span>
    			<textarea class="jsontextarea" id="{this.props.name}_textarea" name="{this.props.name}_textarea" rows="10" cols="50" value={this.props.value}></textarea>
    			<br/>
    		</div>
    	);
  	}
}

export default Textarea