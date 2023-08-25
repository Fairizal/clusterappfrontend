import Home from './home/Home'
import Cluster from './cluster/Cluster'
import Dataset from './dataset/Dataset'
import Rkpcluster from './report/rkpcluster/Index'
import Rkphistorycluster from './report/rkphistorycluster/Index'
import { Routes, Route } from 'react-router-dom'

const Routing = () => {
	return(
		<>
			<Routes>
    			<Route path='/' element={<Home />} />
        		<Route path='/home' element={<Home />} />
        		<Route path='/cluster' element={<Cluster />} />
        		<Route path='/dataset' element={<Dataset />} />
        		<Route path='/rkpcluster' element={<Rkpcluster />} />
        		<Route path='/rkphistorycluster' element={<Rkphistorycluster />} />
        		<Route
		        	path="*"
		        	element={
		            	<div>
		            		<h2>404 Page not found</h2>
		            	</div>
		            }
		        />
        	</Routes>
		</>
	)
}

export default Routing