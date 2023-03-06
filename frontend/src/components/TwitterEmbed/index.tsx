import React from "react";
import twitter from '../../assets/twitter.svg'

const TwitterPlugin = () => {
  return (
    <div className="plugin">
     <a className="plugin__logo" href="https://twitter.com/GanaSuraksha?ref_src=twsrc%5Etfw">

     <img  src={twitter} alt="Twitter" />
     </a>
     <a className="twitter-timeline" data-width="300" data-height="400" href="https://twitter.com/GanaSuraksha?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
};

export default TwitterPlugin;
