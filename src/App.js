import logo from './logo.svg';
import './App.css';
import {
  // ApolloClient,
  // InMemoryCache,
  // ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';


const PICTUREURL = gql`
  query {
    card(slug:"marco-verratti-2021-unique-1"){
      pictureUrl
    }
  }
  
`
function Card() {
  const { loading, error, data } = useQuery(PICTUREURL);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
    <div>hi</div>
    <img src={data.card.pictureUrl} alt="card" />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Card/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
