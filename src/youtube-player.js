import React, {component, Component} from 'react';
import './youtube-player.css'


function RenderPLayer(props) {
    return(
        <div className="YoutubePlayer">
        <iframe id="player" type="text/html" className="Youtubeiframe"
        src={props.src}
        frameBorder="0"
        enablejsapi="true"
        allow="autoplay"
        allowFullScreen
        ></iframe>
    </div>
    );
}

function RenderWelcome(props){
    return(
        <div className="PlayerWelcomeMessage">
            <h4>Paste a link in the textbox to watch a video together</h4>
        </div>
    );
}

class YoutubePlayer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log("src:"+ this.props.src);
        return(
            
            <div className="PlayerComponent" >
                { (this.props.src)?<RenderPLayer src={this.props.src}/>:<RenderWelcome/> }
            </div>
            
        );
    }
}

export default YoutubePlayer;

/* http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com*/ 