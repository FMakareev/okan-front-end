import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {Field, reduxForm, Form} from 'redux-form';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import {error, success} from 'react-notification-system-redux';
import {withApollo} from 'react-apollo';

/** View */
import TextAreaBase from '../../../../components/TextAreaBase/TextAreaBase';

/** Graphql Schema */
import CreateCommentMutation from '../../graphql/CreateCommentMutation.graphql';
import CellListQuery from '../../graphql/CellListQuery.graphql';
import {Box} from "@lib/ui/Box/Box";
import {Flex} from "@lib/ui/Flex/Flex";
import styled from "styled-components";
import BackgroundColorProperty from "@lib/styles/styleProperty/BackgroundColorProperty";
import BorderColorProperty from "@lib/styles/styleProperty/BorderColorProperty";
import {getUserFromStore} from "../../../../store/reducers/user/selectors";
import has from '../../../../utils/has';


const FormStyled = styled(Form)`
  width: 550px;
  border: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color4'})};
  ${props => BackgroundColorProperty({...props, backgroundColor: 'color0'})};
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const createCommentNotification = () => ({
  success: {
    title: 'Комментарий создан',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Комментарий не создан',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class EditorCellCommentCreateForm extends Component {

  static propTypes = {
    cell: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      isLoading: false,
    };
  }

  createComment = value => {
    if(!has.call(value, 'message')) return;
    if (!value.message.length) return;
    const {setNotificationSuccess, reset, setNotificationError, user, cell} = this.props;
    this.toggleLoading();
    return this.props['@apollo/create']({
      variables: {
        message: value.message,
        sender: user.id,
        cell: cell.id,
      },
      update: (store, {data: {createcomment}}) => {

        const options = {query: CellListQuery, variables: {parent: cell.parent.id}};
        let data = null;

        try {
          data = store.readQuery(options);
        } catch (error) {
          console.error('Error createComment update.readQuery: ', error);
        }

        if (!data) {
          return null;
        }

        try {
          data.celllist.map(item => {
            if (item.id === this.props.cell.id) {
              if(Array.isArray(item.comments)){
                item.comments.push(createcomment.comment);
              } else {
                item.comments = [createcomment.comment];
              }
            }
            return item;
          });
        } catch (error) {
          console.error('Error createComment update.change: ', error);
        }

        try {
          store.writeQuery({...options, data});
        } catch (error) {
          console.error('Error createComment update.writeQuery: ', error);
        }

      },
    })
      .then(() => {
        this.toggleLoading();
        setNotificationSuccess(createCommentNotification().success);
        reset();
      })
      .catch(error => {
        console.error('Error createComment submit:', error);
        this.toggleLoading();
        setNotificationError(createCommentNotification().error);
      });
  };


  toggleLoading = () => {
    this.setState((state) => ({
      isLoading: !state.isLoading,
    }))
  };

  render() {
    const {handleSubmit} = this.props;
    const {isLoading} = this.state;
    return (<Box zIndex={1} right={'10px'} top={'10px'}>
      <FormStyled onSubmit={() => {
      }}>
        <Field
          disabled={isLoading}
          onBlur={handleSubmit(this.createComment)}
          name={'message'}
          size={'md'}
          color={'color7'}
          component={TextAreaBase}/>
      </FormStyled>
      <Flex justifyContent={'flex-end'}/>
    </Box>)
  }
}

EditorCellCommentCreateForm = reduxForm({
  form: `EditorCellCommentCreateForm`,
})(EditorCellCommentCreateForm);

EditorCellCommentCreateForm = graphql(CreateCommentMutation, {
  name: '@apollo/create',
})(EditorCellCommentCreateForm);

EditorCellCommentCreateForm = connect(
  store => ({
    user: getUserFromStore(store),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellCommentCreateForm);

EditorCellCommentCreateForm = withApollo(EditorCellCommentCreateForm);

export default EditorCellCommentCreateForm;

