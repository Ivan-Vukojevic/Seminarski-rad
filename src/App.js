import React from 'react';
import './App.css';
import Messages from './Messages';
import Input from './Input';

function randomName() {
    const adjectives = ["adorable", "helpful", "bored", "shiny", "elegant", "noisy", "deep", "mute", "rare", "unique", "delicate", "quiet", "attractive", "cool", "famous", "expensive", "lively", "polite", "charming", "delightful", "wispy", "grumphy", "hidden", "billowing", "broken", "cold", "damp", "cloudy", "frosty", "gentle", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "glorious", "rough", "still", "small", "glamorous", "average", "shy", "wandering", "withered", "wild", "colorful", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "modern", "restless", "divine", "polished", "ancient", "comfortable", "lively", "nameless"];
    const nouns = ["Vienna", "Brussels", "Sarajevo", "Havana", "Zagreb", "London", "Helsinki", "Berlin", "Athens", "Budapest", "Dublin", "Rome", "Jerusalem", "Tokyo", "Luxembourg", "Podgorica", "Oslo", "Warsaw", "Lisbon", "Moscow", "Edinburgh", "Belgrade", "Ljubljana", "Bratislava", "Madrid", "Stockholm", "Bangkok", "London", "Kyiv", "Washington D.C.", "Cardiff", "Montevideo", "Ankara", "Tunis", "Bern", "Seoul", "Freetown", "San Marino", "Riyadh", "Riga", "Doha", "Reykjavik", "Tallinn", "Cairo", "Copenhagen", "Prague", "San Jose", "Sofia", "Brasilia", "Minsk", "Ottawa", "Bridgetown", "New Delhi", "Baghdad", "Kingston", "Wellington", "Pyongyang", "Abu Dhabi", "Manila", "Asuncion", "Mexico City", "Beirut", "Tehran", "Santiago"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  }

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends React.Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("4CD4e5cZZ0AwWwVK", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
}

export default App;
