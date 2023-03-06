import React from 'react';
// const VideoPlayer = ({ videoId}:any)=>{
//     return 
//       <div>
        
//        
//       </div>
    
//   }
// export default VideoPlayer;



const VideoPlayer = ({videoId}:any) => {
  return (
    <div>
 <iframe 
          title={videoId}
          width="280"
          height="155"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
    </div>
  )
}

export default VideoPlayer