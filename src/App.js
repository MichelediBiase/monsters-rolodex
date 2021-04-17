import './App.css';
import { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super()

    //this represents the state, and in monsters element
    // all the data from the API is stored, and eventually modified
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  //once the component gets mount, fetch the data from the API
  // parse it to make it javascript compatible
  // and last, use setState to assign it to the state
  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => this.setState({monsters: users}));
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render() {

    //this gets runned every time the component is rendered(the component is rendered every time the state changes)
    //so when searchField changes, filteredMonsters gets uptaded and gets passed to the lower component in the
    //component gerarchy
    const { monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter( monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    
    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder="search for a monster..." 
          //handleChange change the state of the component's searchField element
          //which will then re-render the component and change filteredMonsters, \
          //a variable which will then be passed down to CardList component
          handleChange={this.handleChange}/>
        <CardList monsters={filteredMonsters}></CardList>
      </div> 
    )
  }
}

export default App;