import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues, SubmissionError, setSubmitFailed } from 'redux-form';
import styled from 'styled-components';
import { Absolute } from 'rebass';

import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Link from '../../../../components/Link/Link';
import Relative from '../../../../components/Relative/Relative';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

// import Logo from '../../../../assets/icons/multicolor/logo.multicolor.svg';

const logo = () => {
  return (
    <svg
      width="500"
      height="112"
      viewBox="0 0 500 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.0142 0.44315C16.1986 1.06357 15.3949 1.80216 14.502 3.54524L13.6686 5.14059V30.0164V54.8921L9.97774 55.0103C6.58456 55.0989 6.13809 55.1876 4.56056 56.0148C2.47703 57.0488 1.07809 58.7623 0.393506 61.0076C0.00656455 62.3667 -0.0529649 64.1393 0.0363292 71.8502C0.125623 80.861 0.155388 81.1269 0.810211 82.4859C1.19715 83.254 2.06033 84.3767 2.71515 84.9676C4.97727 87.0061 5.06656 87.0061 15.1568 87.0061H24.235L25.753 86.2084C26.5864 85.7652 27.6282 84.9971 28.0747 84.4653C29.7415 82.5154 29.8903 81.9836 30.0391 77.1089L30.188 72.5297L41.2902 72.441L52.3627 72.382V81.895C52.3627 92.2058 52.6305 95.5442 53.7318 98.9712C55.6665 105.057 60.1015 109.075 66.739 110.759C71.293 111.941 73.7932 112 100.73 111.911C124.274 111.793 126.834 111.734 128.858 111.261C136.359 109.489 140.883 105.648 143.175 99.0894L144.187 96.1646L144.276 74.45C144.395 51.2878 144.336 50.1356 142.937 46.2358C140.794 40.2976 137.222 36.2205 131.924 33.7979C127.37 31.6708 128.798 31.7594 98.4979 31.7594C69.3881 31.7594 70.2215 31.7299 65.3996 33.2662C57.9882 35.6592 53.7616 41.627 52.6603 51.2582C52.5115 52.7059 52.3627 57.4624 52.3627 61.8053V69.723H41.2009H30.0391V65.4983C30.0391 61.6872 29.9796 61.1554 29.3248 59.8259C28.4914 58.0533 26.765 56.3398 25.128 55.6602C24.3243 55.3353 22.7766 55.1285 20.3061 55.0103L16.645 54.8626V30.3118C16.645 6.47007 16.6748 5.73147 17.2403 4.81561C17.538 4.28382 18.2226 3.66341 18.6988 3.39752C19.5024 2.98391 42.3915 2.95437 250.417 3.01345L481.242 3.10209L482.135 3.95886C482.641 4.46109 483.207 5.31786 483.355 5.87919C483.534 6.55869 483.653 16.0422 483.653 30.9027V54.8921L480.022 55.0103C475.617 55.158 473.861 55.7784 472.075 57.7874C470.408 59.6782 469.961 61.3917 469.961 65.9119V69.723H458.948H447.936L447.876 50.7265L447.787 31.7594L443.56 31.6708L439.304 31.5822V49.4856V67.3595H401.8H364.297V49.4856V31.5822L360.07 31.6708L355.814 31.7594V71.7911V111.823L360.07 111.911L364.297 112V93.358V74.7455H401.8H439.304V93.358V112L443.56 111.911L447.787 111.823L447.876 92.0876L447.936 72.382H458.948H469.961V76.1635C469.961 80.8314 470.408 82.545 472.075 84.3471C472.759 85.0562 473.92 85.9425 474.664 86.3266C476.033 86.9765 476.271 87.0061 485.141 87.0061H494.22L495.827 86.1198C497.732 85.0857 498.952 83.6676 499.577 81.8064C499.994 80.6246 500.053 78.852 499.964 70.5502C499.875 61.0963 499.845 60.6531 499.22 59.5009C498.446 58.0533 496.571 56.3102 495.053 55.6602C494.279 55.3353 492.702 55.1285 490.142 55.0103L486.332 54.8626V29.78C486.332 5.67239 486.302 4.66789 485.766 3.60432C484.993 2.09759 483.742 1.00448 482.195 0.44315C481.034 0.0590804 457.103 -1.66893e-06 250.03 -1.66893e-06C52.6008 0.0295393 18.9964 0.0886336 18.0142 0.44315ZM124.542 40.3271C129.572 41.627 134.156 46.7381 135.525 52.5877C136.18 55.3648 136.21 90.9945 135.555 94.0375C134.513 99.0008 131.745 101.778 126.715 102.96C125.137 103.314 120.792 103.403 99.3016 103.403C76.74 103.403 73.5254 103.344 71.6204 102.93C66.9474 101.867 63.8816 99.6212 62.1552 95.9578L61.1433 93.8011V72.6774C61.1433 49.6038 61.0837 50.6674 62.8696 47.1221C64.6852 43.5178 68.4356 40.977 73.1384 40.1794C73.9123 40.0612 85.4015 39.943 98.6468 39.9135C119.512 39.8839 123.024 39.943 124.542 40.3271ZM24.3243 58.526C25.0982 58.9101 25.9316 59.6486 26.4078 60.3577L27.2115 61.5394L27.3008 70.3434C27.4198 79.7974 27.3008 80.8905 25.9614 82.4563C24.5327 84.1108 24.0267 84.1994 15.1866 84.1994C10.2456 84.1994 6.85245 84.0812 6.31668 83.8744C5.87021 83.7267 5.09633 83.2245 4.62009 82.7813C3.0128 81.2746 2.95327 80.861 2.95327 71.1411C2.95327 63.0757 3.0128 62.0712 3.5188 61.0076C4.11409 59.7373 4.70939 59.1169 6.07856 58.4078C6.82268 57.9942 8.25139 57.9351 14.9782 57.9056C22.5682 57.9056 23.0742 57.9351 24.3243 58.526ZM493.684 58.2305C494.13 58.3783 494.904 58.8805 495.351 59.3237C497.047 60.919 497.047 60.919 497.047 71.2888C497.047 80.7428 497.047 80.861 496.363 81.8655C496.006 82.4268 495.113 83.1654 494.368 83.5495C493.089 84.1699 492.761 84.1994 485.022 84.1994C477.492 84.1994 476.926 84.1699 475.706 83.579C474.843 83.1654 474.158 82.545 473.682 81.7178L472.938 80.4474V71.2298C472.938 61.3622 473.027 60.8008 474.456 59.4714C476.123 57.9647 476.42 57.9056 484.903 57.9056C489.785 57.9056 493.178 58.0237 493.684 58.2305Z"
        fill="#007FAF"
      />
      <path
        d="M153.562 71.7913V111.971H157.73H161.897L161.956 93.2991L162.045 74.598L170.082 74.5094L178.118 74.4503L190.173 83.0179C196.811 87.7449 208.687 96.1944 216.545 101.808L230.891 111.971L238.154 111.912L245.416 111.823L216.336 91.4379C200.323 80.2113 187.226 70.9937 187.226 70.905C187.197 70.8164 190.441 68.6006 194.429 65.9417C198.388 63.2828 203.984 59.5307 206.841 57.6104C209.699 55.69 219.551 49.0723 228.718 42.9272L245.387 31.7597L237.678 31.671L229.939 31.612L226.575 33.8868C224.73 35.1572 215.771 41.3023 206.633 47.5655C197.525 53.8288 187.405 60.7716 184.131 63.0169L178.178 67.0643H170.022H161.897V49.3382V31.612H157.73H153.562V71.7913Z"
        fill="#007FAF"
      />
      <path
        d="M292.028 35.9549C290.867 38.3775 287.682 44.8475 284.944 50.3722C282.236 55.8968 278.753 62.9282 277.235 66.0303C271.342 78.025 267.413 85.9427 262.204 96.4603C256.965 107.037 254.763 111.557 254.763 111.853C254.763 111.912 256.816 111.971 259.317 111.971H263.841L268.841 102.221L273.872 92.4719H300.392C315.006 92.4719 327.091 92.5901 327.269 92.7082C327.448 92.8264 329.77 97.1989 332.449 102.428L337.27 111.971H341.854C344.384 111.971 346.438 111.853 346.438 111.705C346.438 111.587 344.414 107.362 341.943 102.339C333.58 85.3519 319.858 57.4922 317.417 52.4402C316.048 49.6631 313.221 43.8726 311.078 39.5001L307.178 31.612H300.66H294.141L292.028 35.9549ZM312.209 62.8396C318.4 75.0411 323.4 85.1155 323.311 85.2042C323.043 85.47 277.682 85.411 277.682 85.1746C277.682 84.9383 280.092 80.2408 288.605 63.6668C291.135 58.7921 294.826 51.5835 296.82 47.6246C298.814 43.6953 300.571 40.5046 300.69 40.5637C300.809 40.5932 306.018 50.6085 312.209 62.8396Z"
        fill="#007FAF"
      />
    </svg>
  );
};

const SvgPlay = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.1351 8.58297L2.56862 0.197654C2.19712 -0.0365882 1.73582 0.00243778 1.38742 0.00243778C-0.00618175 0.00243778 4.78129e-07 1.14194 4.78129e-07 1.43063V18.5693C4.78129e-07 18.8134 -0.00610045 19.9976 1.38742 19.9976C1.73582 19.9976 2.1972 20.0364 2.56862 19.8023L15.135 11.417C16.1665 10.767 15.9882 9.99997 15.9882 9.99997C15.9882 9.99997 16.1665 9.23289 15.1351 8.58297Z"
      fill="inherit"
    />
  </svg>
);

const SvgEye = () => (
  <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24.7211 7.04184C23.4188 4.92143 21.6678 3.2177 19.4684 1.93068C17.2688 0.643608 14.9461 0 12.5 0C10.0539 0 7.73114 0.643365 5.53153 1.93068C3.33188 3.2177 1.58099 4.92143 0.278915 7.04184C0.0929879 7.36588 0 7.68535 0 8.00024C0 8.31514 0.0929879 8.63461 0.278915 8.95855C1.58099 11.0791 3.33188 12.7829 5.53153 14.0697C7.73114 15.3569 10.0539 16 12.5 16C14.9461 16 17.2688 15.359 19.4684 14.0767C21.6678 12.7943 23.4191 11.0882 24.7211 8.95855C24.9071 8.63461 25 8.31529 25 8.00024C25 7.68535 24.9071 7.36588 24.7211 7.04184ZM9.50733 3.24309C10.3397 2.41443 11.3371 1.99995 12.4999 1.99995C12.6858 1.99995 12.844 2.06494 12.9743 2.19449C13.1043 2.32409 13.1697 2.48156 13.1697 2.66672C13.1697 2.85201 13.1043 3.00939 12.9746 3.13879C12.8445 3.26853 12.6862 3.33333 12.5002 3.33333C11.7004 3.33333 11.0166 3.61588 10.4493 4.18058C9.88188 4.74562 9.59832 5.4261 9.59832 6.22237C9.59832 6.40776 9.53304 6.56504 9.40291 6.69474C9.27259 6.82453 9.11457 6.88928 8.92859 6.88928C8.74247 6.88928 8.5844 6.82438 8.45412 6.69474C8.3238 6.56504 8.25872 6.40757 8.25872 6.22237C8.25872 5.06504 8.67504 4.0718 9.50733 3.24309ZM18.5618 12.5353C16.6969 13.66 14.6764 14.2227 12.5 14.2227C10.3237 14.2227 8.30313 13.6603 6.43839 12.5353C4.57365 11.4102 3.02276 9.89857 1.78583 8.00024C3.19951 5.81494 4.97126 4.18053 7.10109 3.09739C6.53378 4.06023 6.25002 5.10201 6.25002 6.22232C6.25002 7.93549 6.86165 9.40042 8.08457 10.6182C9.30748 11.836 10.7795 12.4446 12.5 12.4446C14.2207 12.4446 15.6922 11.8357 16.9154 10.6182C18.1386 9.40076 18.75 7.93549 18.75 6.22232C18.75 5.10201 18.4662 4.06008 17.8989 3.09739C20.0286 4.18053 21.8004 5.81509 23.2141 8.00024C21.9773 9.89857 20.4266 11.4102 18.5618 12.5353Z"
      fill="#848484"
    />
  </svg>
);

class FormPasswordRecovery extends Component {
  constructor(props) {
    super(props);

    this.state = { type: 'password', isOpen: false, item: 1 };

    this.submit = this.submit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  submit(value) {}

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen, type: this.state.isOpen ? 'password' : 'text' });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { type, isOpen } = this.state;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Flex alignItems={'center'} justifyContent={'center'} pt={17} pb={'125px'}>
          {logo()}
        </Flex>

        <Flex alignItems={'center'} flexDirection={'column'} mb={'100px'}>
          <Flex width={'100%'}>
            <Relative width={'100%'}>
              <Field
                name="old_password"
                component={TextFieldBase}
                placeholder={'Старый пароль'}
                type={type}
              />
              <Absolute top={'33%'} right={'4%'}>
                <ButtonBase variant={'empty'} value={this.state.item} onClick={this.handleClick}>
                  {isOpen ? <div> {SvgEye()} </div> : <div> {SvgEye()}</div>}
                </ButtonBase>
              </Absolute>
            </Relative>
          </Flex>

          <Flex width={'100%'}>
            <Relative width={'100%'}>
              <Field
                name="new_password"
                component={TextFieldBase}
                placeholder={'Новый пароль'}
                type={type}
              />
              <Absolute top={'33%'} right={'4%'}>
                <ButtonBase variant={'empty'} onClick={this.handleClick}>
                  {isOpen ? <div> {SvgEye()} </div> : <div> {SvgEye()}</div>}
                </ButtonBase>
              </Absolute>
            </Relative>
          </Flex>

          <Flex width={'100%'}>
            <Relative width={'100%'}>
              <Field
                name="return_new_password"
                component={TextFieldBase}
                placeholder={'Потвердите новый пароль'}
                type={type}
              />
              <Absolute top={'33%'} right={'4%'}>
                <ButtonBase variant={'empty'} onClick={this.handleClick}>
                  {isOpen ? <div> {SvgEye()} </div> : <div> {SvgEye()}</div>}
                </ButtonBase>
              </Absolute>
            </Relative>
          </Flex>
        </Flex>

        <Flex justifyContent={'center'}>
          <Link to="/auth/login">
            <ButtonWithImage
              type="submit"
              disabled={pristine || submitting}
              variant={'large'}
              size={'large'}
              name={'Сменить пароль'}
              ml={9}
              rightIcon={SvgPlay()}
            />
          </Link>
        </Flex>
      </form>
    );
  }
}

FormPasswordRecovery = reduxForm({
  form: 'FormPasswordRecovery',
})(FormPasswordRecovery);

export default FormPasswordRecovery;
