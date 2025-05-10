import { Link} from "react-router-dom"
import style from './Main.module.css'
function MainPage(){
    return(
        <>
         <div className={style.Mainpagediv}>
            <h1>Banking App</h1>
        <div className={style.mainpagediv2}>
        <h1 id="la">LACASA <span style={{color:'#c11119'}}>DE </span>PAPEL </h1>
        <h1><i class="bi bi-bank2"></i></h1>
        <div className={style.mainpagedivbu}>
        <h1><Link to='/Bank'>Bank</Link></h1>
        <h1><Link to='/User'>User</Link></h1>
        </div>
        <h3>Happy Banking...</h3>
        </div>
        </div>
        </>
    );
}
export default MainPage;