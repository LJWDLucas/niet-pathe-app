import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { getInitialMovies } from '../actions/movieActions';
import CarouselBrowseSlide from './CarouselBrowseSlide';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      activeIndex: 0,
      movies: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    const { movies } = this.props;
    this.setState({
      movies: this.spliceMovies(Object.values(movies)),
      initialized: true
    });
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const { activeIndex, movies } = this.state;
    const nextIndex = activeIndex === movies.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const { activeIndex, movies } = this.state;
    const nextIndex = activeIndex === 0 ? movies.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  spliceMovies(movies, prev = []) {
    if (movies.length === 0) {
      return prev;
    }
    prev.push(movies.splice(0, 4));
    return this.spliceMovies(movies, prev);
  }

  render() {
    const { initialized, activeIndex, movies } = this.state;

    if (!initialized) return null;

    return (
      <div className="flex-wrap justify-content-center">
        <Carousel
          className="w-1200px"
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          interval="5000"
        >
          <CarouselIndicators items={movies} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {movies.map(item => (
            <CarouselItem
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}
            >
              <CarouselBrowseSlide movies={item} />
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          ))}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.entities.movies
});

const mapDispatchToProps = dispatch => ({
  fetchInitialMovies: () => dispatch(getInitialMovies(10)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);

Browse.propTypes = {

};
