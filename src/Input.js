import React from "react";

class Input extends React.Component {
  state = {
    text: ""
  }

  onChange(event) {
    this.setState({text: event.target.value});
  }

  onSubmit = (event) => {
    if(this.state.text){
      event.preventDefault();
      this.setState({ text: "" });
      this.props.onSendMessage(this.state.text);
    }
    else{
      alert("Write something ...");
    }
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={event => this.onSubmit(event)}>
          <input
            onChange={event => this.onChange(event)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }

}

export default Input;