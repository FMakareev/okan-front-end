import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { connect } from 'react-redux';
import Notifications, { success, error } from 'react-notification-system-redux';

/** Icons */
import { ic_add } from 'react-icons-kit/md/ic_add';

/** Image */
import { SvgDownload } from '../../components/Icons/SvgDownload';

/** Image */
import Image from '../Image/Image';

/** Css value */
import { DropZoneStyled, DropZoneIconWrapper, Img, IconStyled } from './PictureUploadPreviewStyled';

const handleDropRejected = (...args) => console.log('reject', args);

const notificationOpts = () => ({
  error: {
    title: 'Ошибка загрузки подписи',
    message: 'Размер картинки не должен превышать : 600КВ',
    position: 'tr',
    autoDismiss: 2,
  },
});

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

    if (files[0].size > 600000) {
      this.props.setNotificationError(notificationOpts().error);
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
      // console.log(reader.result);
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
        {preview && <Img src={preview} alt="image preview" />}
        {!preview && value && <Img src={value} alt="logo" className={styles && styles.img} />}
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

PictureUploadPreview = connect(
  null,
  dispatch => ({
    setNotificationError: message => dispatch(error(message)),
  }),
)(PictureUploadPreview);

export default PictureUploadPreview;
