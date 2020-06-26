import React from 'react';
import styled from 'styled-components';
import { Lightbox } from "react-modal-image";
import ImageSlide from './ImageSlide.jsx';
import Thumbnails from './Thumbnails.jsx';
import ImageButtons from './ImageButtons.jsx';


const InlineDiv = styled.div`
  display: inline-block
`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomedIn: false,
      backgroundPostion: 'center',
      fullScreen: false
    }
  }

  onMainImageClick(e) {
    e.preventDefault();

    //toggle zoom state
    var zoom;
    this.state.zoomedIn ? zoom = false : zoom = true;

    var position;
    zoom ? position = this.getCoordinates(e) : position = 'center';

    this.setState({
      zoomedIn: zoom,
      backgroundPostion: position
    })
  }

  getCoordinates(e) {
    var boxWidth = e.target.clientWidth;

    var xPos = e.pageX - e.target.offsetLeft;
    var yPos = e.pageY - e.target.offsetTop;

    var xPercent = xPos / (boxWidth / 100) + '%';
    var yPercent = yPos / (boxWidth  / 100) + '%';

    //get background position of final image
    return xPercent + ' ' + yPercent;
  }

  onFullScreenButtonClick(e) {
    e.preventDefault();
    this.setState({
      fullScreen : true
    })
  }

  onZoomInButtonClick(e) {
    e.preventDefault();
    this.setState({
      zoomedIn : true
    })
  }
  onZoomOutButtonClick(e) {
    e.preventDefault();
    this.setState({
      zoomedIn : false
    })
  }

  closeLightbox() {
    this.setState({
      fullScreen : false
    })
  }

  render() {

    return(
      <div className="carousel">
        <div><ImageSlide
          src={this.props.currentImageUrl}
          zoomedIn={this.state.zoomedIn}
          backgroundPosition={this.state.backgroundPostion}
          handleClick={this.onMainImageClick.bind(this)}/>
        </div>
        <div>
          <InlineDiv>
            <ImageButtons
              handleFullScreenClick={this.onFullScreenButtonClick.bind(this)}
              handleZoomInClick={this.onZoomInButtonClick.bind(this)}
              handleZoomOutClick={this.onZoomOutButtonClick.bind(this)}
            />
          </InlineDiv>
          <InlineDiv>
            <Thumbnails
            images={this.props.images}
            imageIndex={this.props.imageIndex}
            handleClick={this.props.handleClick}/>
          </InlineDiv>
        </div>
        <div>
          {
            this.state.fullScreen &&
            <Lightbox
              small={this.props.currentImageUrl}
              large={this.props.currentImageUrl}
              //alt="Hello World!"
              hideDownload={true}
              hideZoom={true}
              onClose={this.closeLightbox.bind(this)}
            />
          }
        </div>
      </div>

    )
  }
}

export default Carousel;