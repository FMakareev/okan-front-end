import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';

import { ic_add } from 'react-icons-kit/md/ic_add';

import { SvgDownload } from '../../components/Icons/SvgDownload';

import Image from '../Image/Image';

import { DropZoneStyled, DropZoneIconWrapper, Img, IconStyled } from './PictureUploadPreviewStyled';

const handleDropRejected = (...args) => console.log('reject', args);

/**
 * @example ./PictureUploadPreview.example.md
 */
export class PictureUploadPreview extends Component {
  constructor() {
    super();
    this.state = {
      preview: null,
      files: [],
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.getBase64 = this.getBase64.bind(this);
  }

  static propTypes = {
    /** className */
    styles: PropTypes.string,
    /** CSS: margin - bottom */
    mb: PropTypes.number,
    /** CSS: border-radius */
    br: PropTypes.number,
    /** property of input */
    value: PropTypes.string,
    placeholderImage: PropTypes.string,
    /** loading files or picture */
    files: PropTypes.object,
    /** input value */
    disabled: PropTypes.bool,
  };

  handleDrop(files) {
    if (!files.length && !files[0].preview) {
      return null;
    }

    this.setState({
      files,
    });

    const preview = files[0].preview;

    this.setState({
      preview,
    });
    this.getBase64(files[0]);
  }

  getBase64(file) {
    const {
      input: { onChange },
    } = this.props;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      console.log(reader.result);
      onChange(reader.result);
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }

  render() {
    const {
      input: { value },
      styles,
      disabled,
      mb,
      br,
      placeholder,
    } = this.props;

    const { preview } = this.state;

    return (
      <DropZoneStyled
        disabled={disabled}
        br={br}
        onDrop={this.handleDrop}
        accept="image/*"
        multiple={false}>
        {preview && <img src={preview} alt="image preview" />}
        {!preview && value && <Image src={value} alt="logo" className={styles && styles.img} />}
        {!preview && !value && (
          <DropZoneIconWrapper disabled={disabled}>
            <div> {placeholder}</div>

            <div>{SvgDownload()}</div>
          </DropZoneIconWrapper>
        )}
      </DropZoneStyled>
    );
  }
}

export default PictureUploadPreview;