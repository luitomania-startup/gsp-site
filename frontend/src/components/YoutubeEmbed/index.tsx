import React, { useEffect , useState } from "react";
import youtube from "../../assets/youtube.svg";
import VideoPlayer from './VideoPlayer'

const YoutubeEmbed = () => {
 const [videos , setVideos ] = useState([]);
 const [loading , setLoading] = useState(false)
 useEffect(() => { 
  const API_KEY = 'AIzaSyDeX7wiihasxaIlNey6FYyv_GtCU1QYt6s';
  const channelId = 'UCzwjceEpfVS8S34zZ4yU6yg';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&key=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setVideos(data.items);
      console.log('DATA ITEMS')
      console.log(data.items)
      setLoading(true);
    });
}, []);

  return (
    <div className="plugin">
      <div className="flex h-full w-full justify-center items-center"> Youtube Plugin Under Maintenence</div>
      {/* <a
        className="plugin__logo"
        href="https://www.youtube.com/@ganasurakshaparty3954"
      >
        <img src={youtube} alt="youtube" />
      </a>

      <div className="h-[400px] w-[300px] overflow-y-auto rounded-lg">
      { (loading && videos) ? videos!.map((video:any) => (
        <VideoPlayer key={video.id} videoId={video.id.videoId} />
      )): <div className="font-bold text-center w-full text-4xl">Loading ...</div>}
    </div> */}


     
    </div>
  );
};

export default YoutubeEmbed;
