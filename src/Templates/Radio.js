import React from 'react';
import './templates.css';

class Radio extends React.Component {
  render() {
  const optionsmap = this.props.options;
    return (
      <div>
      	<span>
          <div class="bo">
            <label for="{this.props.name}">{this.props.name}</label><br/>
          </div><pre></pre>
      		{optionsmap.map( item => 
      				<div class="lab">
  	    				<input type="radio" id="{item.displayvalue}" name="{this.props.name}" value="{item.value}" />
  	    				<label for="{item.value}">{item.displayvalue}</label>
  	    			</div>
      			)}
          <br/>
      	</span>
        <br/>
      </div>
    );
  }
}

export default Radio