
const Button = ({ text = "",onClick,tdisplay,twidth, icon, color,tcolor,icolor,fsize,bor,bo,pad,isize }) => {

  return (
      <div className="btn button-k mx-2" onClick={onClick} typeof="submit" style={{ backgroundColor: color,fontWeight:"600",padding:pad,border:bo,color:tcolor,fontSize:fsize,borderRadius:bor}}>
        {text === "" ? (
          <i className={icon} style={{color:icolor,fontSize:isize}}></i>
        ) : (
          <div>
            <span className="mx-1" style={{display:tdisplay,width:twidth}}>{text}</span> <i className={icon} style={{color:icolor,fontSize:isize}}></i>
          </div>
        )}
      </div>
    );
  };
  
  export default Button;
  