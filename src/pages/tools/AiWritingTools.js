import { Link } from "react-router-dom"
import data from "../../data/route.json"
import logo from '../../assets/logo192.png'
import search from '../../assets/search.png'
import pro from '../../assets/ai-subheading.png'
import './AiWritingTools.css'

export default function AiWritingTools() {
  
  return (
    <div className='content'>
      <div className="top">
        <img src={logo} alt="logo" className="logo"/>
        <div className="search">
          <img src={search} alt="search" className="icon" />
          <input type="text" className="inp"  placeholder="Search AI Writing Tools"/>
          
        </div>
        <img src={pro} alt="" className="profile"/>
      </div>
      
<div className="ai-writing">
<h3>AI Writing Tools</h3>
      <div className="tools">{
      
data.map((val) => (
  
<div key={val.id} className="disp">
<img src={val.img} alt="ai"  className="tool-img"/>
<div>
<div className="tool">
<h3 className="tool-heading">{val.name}</h3>
<button className="tool-btn"><Link to={`/tools/${val.route}`} className="li">{val.status}</Link></button>
</div>
<p className="tool-subtitle">{val.subtitle}</p>

</div>


</div>




))}
      </div>
      </div>
    </div>
  )
}
