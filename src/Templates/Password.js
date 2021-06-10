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
      			 <span>
      			 	<div class="bo">
      			 		{this.props.name}
      			 	</div>
      			 </span><pre></pre>
      			 <input type="password" value={this.props.value} size={this.props.size} />
      		</div>
          <br/>
        </div>

    	);
  	}
}

export default Password