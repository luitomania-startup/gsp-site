import React from "react";
import facebook from '../../assets/facebook.svg'
const FBEmbed = () => {
  React.useEffect(() => {
    // FB.XFBML.parse();
  },[]);
  return (
   
<div className="plugin">
<a className="plugin__logo" href="https://www.facebook.com/GanaSurakshaParty/">

<img  src={facebook} alt="facebook" />
</a>


<iframe title="FBEmbed" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FGanaSurakshaParty&tabs=timeline&width=300&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
 width="300" 
height="400" style={{border:"none",overflow:"hidden", borderRadius: "10px"}} scrolling="no" frameBorder={0} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
   
</div>
  );
};

export default FBEmbed;
