import React from 'react';

/** Icons */
import {ic_add} from 'react-icons-kit/md/ic_add';

/** Image */
import {SvgDownload} from '../../components/Icons/SvgDownload';

/** Image */
import TooltipBase from '../TooltipBase/TooltipBase';

/** Css value */
import {DropZoneStyled, DropZoneIconWrapper, Img} from './PictureUploadPreviewStyled';


class PictureUploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
  }
  _handleImageChange(e) {
    e.preventDefault();
    const {
      input: {onChange},
    } = this.props;

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      onChange(reader.result);
    };

    reader.readAsDataURL(file)
  }

  render() {
    const {
      input: {value},
      placeholder,
      error
    } = this.props;

    let $imagePreview = null;

    if (value) {
      $imagePreview = (<Img src={value}/>);
    } else {
      $imagePreview = (
        <DropZoneIconWrapper>
          <div> {placeholder}</div>
          <SvgDownload/>
        </DropZoneIconWrapper>
      )
    }

    return (
      <TooltipBase isActive={error} warning={error} left={'40%'}>
        <DropZoneStyled>
          {$imagePreview}

          <input
            style={{
              position: 'absolute',
              opacity: '0',
              width: '100%',
              height: '100%',
              top: '0'
            }}
            type="file"
            onChange={(e) => this._handleImageChange(e)}
          />
        </DropZoneStyled>
      </TooltipBase>
    )
  }
}

export default PictureUploadPreview;
