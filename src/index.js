import _ from 'lodash';
import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './Components/search_bar';
import VideoList from './Components/video_list';
import VideoDetails from './Components/video_details';
const API_KEY = 'AIzaSyCYwJQlJSlaVz-XBVLrLM3TDQ-31r27njg';

// Create a new component. This component should produce
// some html

// const = similar to var, const = final vartype
class App extends Component{
  constructor(props){
      super(props);

      this.state = {
        videos: [],
        selectedVideo : null
      };
      this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term : term},(videos) =>{
      //this.setState({videos: videos})
      this.setState({
        videos : videos,
        selectedVideo : videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
  return (
          <div>
            <SearchBar onSearchTermChange = {videoSearch}/>
            <VideoDetails video = {this.state.selectedVideo} />
            <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
          </div>
  );
}
}



// Take this component's generated HTML and put it on the page
// (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
