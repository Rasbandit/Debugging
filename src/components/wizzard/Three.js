import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import inactive from './../../images/step_inactive.png';
import active from './../../images/step_active.png';
import complete from './../../images/step_completed.png';
import SweetAlert from 'sweetalert2-react';

class Three extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: props.images,
      main: 0,
      show: false,
    };
  }

  setBigImg(main) {
    this.setState({
      main,
    });
  }

  addImage(img, position) {
    let newImages = this.state.images;
    newImages[position] = img;
    newImages = newImages.filter(item => {
      if (item) return true;
      return false;
    });
    this.setState({
      images: newImages,
    });
  }

  clearImage(position) {
    const newImages = this.state.images;
    let main = this.state.main;
    if (position === this.state.main || position > this.state.images.length - 1) {
      main = 0;
    }
    newImages.splice(position, 1);
    this.setState({
      main,
      images: newImages,
    });
  }

  nextStep(info) {
    if (info.images.length > 0) {
      this.props.handleChange(info);
    } else {
      this.setState({ show: true });
    }
  }

  render() {
    const inputs = this.state.images.map((item, id, array) => (
      <div className="img-inputs" key={item}>
        <input
          type="text"
          value={item}
          id={id}
          onChange={e => {
            this.addImage(e.target.value, id);
          }}
        />
        <div
          className="clear-button"
          onClick={() => {
            this.clearImage(id);
          }}
        >
          Clear
        </div>
      </div>
    ));

    if (this.state.images.length < 4) {
      inputs.push(
        <div className="img-inputs" key={this.state.images[this.state.images.length]}>
          <input
            type="text"
            value=""
            id={this.state.images.length}
            onChange={e => {
              this.addImage(e.target.value, this.state.images.length);
            }}
          />
        </div>
      );
    }

    const thumbnails = this.state.images.map((image, index) => (
      <div
        key={image.id}
        className="thumbnail"
        onClick={() => {
          this.setBigImg(index);
        }}
      >
        <img id={image.id} src={image} alt="" />
      </div>
    ));

    return (
      <div className="step">
        <SweetAlert
          show={this.state.show}
          type="info"
          title="Empty Fields"
          text="Please add at least one picture"
          onConfirm={() => this.setState({ show: false })}
        />
        <h1>Step Three</h1>
        <div className="step-gauge">
          <img src={complete} alt="circle" />
          <img src={complete} alt="circle" />
          <img src={active} alt="circle" />
          <img src={inactive} alt="circle" />
          <img src={inactive} alt="circle" />
        </div>
        <div className="inputs">
          <div className="img-container">
            {this.state.images[0] ? <img src={this.state.images[this.state.main]} alt="" /> : 'Image Preview'}
          </div>
          <div className="thumbnails">{thumbnails.length <= 1 ? '' : thumbnails}</div>
          <section>
            <label>Image URL</label>
            {inputs}
          </section>
          <div className="buttons">
            <Link to="/wizzard/2" className="next-button">
              Previous Step
            </Link>
            <div
              onClick={() => {
                this.nextStep(this.state);
              }}
              className="next-button"
            >
              Next Step
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Three;
