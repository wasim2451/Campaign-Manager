import{BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import CampaignDetails from "./pages/CampaignDetails.jsx";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/create" element={<CreateCampaign/>}/>
                <Route path="/campaign/:id/:status" element={<CampaignDetails/>}/>
            </Routes>
        </Router>
    );
}
export default App;