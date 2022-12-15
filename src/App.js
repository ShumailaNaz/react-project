import { BrowserRouter  , Route, Routes  } from 'react-router-dom';
import Home from './pages/home/Home'
import Signup from './pages/singup/Signup'
import Signin from './pages/signin/Signin'
import AiWritingTools from './pages/tools/AiWritingTools'
import ImageGenerator from './components/ImageGenerator'
import Comingsoon from './components/Comingsoon'
import './App.css';
import data from './data/route.json'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

<Route path='/' element={ <Home />} />
<Route path='/signup' element={ <Signup />} />
<Route path='/signin' element={ <Signin />} />
<Route path='/tools' element={ <AiWritingTools />} />
<Route path='*' element={ 
  <div>Page not Found</div>
} />


{data.map((val)=>(
  <Route key={val.id} path={`/tools/${val.route}`} element={(val.status==="Coming Soon") ? <Comingsoon /> : <ImageGenerator value={val} />} />
 
))
}

      </Routes>
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
