import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'

import Header from './header/Header'
import Routing from './Routing'
import Footer from './footer/Footer'


const App = () => {
  return (
    <div style={{background: '#ebebeb'}}>
      <Header />
      <div style={{marginTop: '56px'}}>
      <Routing />
      </div>
      <Footer />
    </div>
  );
}

export default App
