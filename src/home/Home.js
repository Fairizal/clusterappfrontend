import logo from '../assets/img/background.webp'
import './home.css'
import { Link } from 'react-router-dom'
import Headers from '../header/Headers'

const Home = () => {
  return(
    <>
      <Headers title={'Cluster-App'} />
      <div class="img-wrapper">
        <img src={logo} />
        <div className="overlay">
          <h2>Cluster-App</h2>
          <p>
            <Link to="/cluster" style={{color:'black'}}>Start Cluster >></Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Home