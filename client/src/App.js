import { GlobalStyles} from '@bigcommerce/big-design'
import Layout from './components/Layout/Layout'

function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <div>
        <Layout/>
      </div>
    </div>
  );
}

export default App;
