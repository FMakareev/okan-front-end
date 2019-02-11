import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Query, withApollo } from 'react-apollo';

/** Components */
import EditorCellController from '../EditorCellController/EditorCellController';
import { withProject } from '../ProjectContext/ProjectContext';
import { EditorAdditionalMenu } from '../EditorAdditionalMenu/EditorAdditionalMenu';

/**View */
import { Flex } from '@lib/ui/Flex/Flex';
import { Box } from '@lib/ui/Box/Box';
import { Text } from '@lib/ui/Text/Text';

/** Graphql */
import CellListQuery from './CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

const ContentWrapper = styled.div`
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  min-height: 60px;
`;

const EditorCellControllerWithProject = withProject(props => <EditorCellController {...props} />);

export class ProjectEditor extends Component {
  static propTypes = {};

  state = {
    name: null,
    parentName: null,
    number: queryString.parse(this.props.location.search).sectionNumber,
  };

  componentDidMount() {
    this.getParent(this.props.sectionid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sectionid !== this.props.sectionid) {
      this.getParent(nextProps.sectionid);
    }
  }

  getParent = parent => {
    this.props.client
      .query({ query: CellItemQuery, variables: { id: parent } })
      .then(({ data }) => {
        return this.setState({
          name: data.cellitem.name,
          parentName: data.cellitem.parent.name,
        });
      })
      .catch(error => {
        console.log('getParent error, string 57 :', error);
      });
  };

  render() {
    const {
      sectionid,
      location: { search },
    } = this.props;

    const { name, parentName, number } = this.state;

    if (!sectionid) {
      return (
        <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'60px'} flexDirection={'column'}>
          <ContentWrapper>
            <Box>Раздел не выбран.</Box>
          </ContentWrapper>
        </Flex>
      );
    }
    return (
      <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'5px'} flexDirection={'column'}>
        <Query skip={!sectionid} query={CellListQuery} variables={{ parent: sectionid }}>
          {({ data, loading, error }) => {
            if (loading) {
              return `Загрузка`;
            }

            if (error) {
              return null;
            }

            if (data && data.celllist) {
              const section = number.slice(0, -2);

              return (
                <Fragment>
                  <Text
                    width={'100%'}
                    fontFamily={'secondary'}
                    lineHeight={8}
                    fontSize={6}
                    color={'color11'}
                    mt={'15px'}
                    ml={'15px'}>
                    {number.length === 2 && <Fragment>{`${number} ${parentName}`}</Fragment>}

                    {number.length > 2 && <Fragment>{`${section} ${parentName}`}</Fragment>}
                  </Text>
                  <ContentWrapper>
                    <Text
                      width={'100%'}
                      fontFamily={'secondary'}
                      lineHeight={8}
                      fontSize={6}
                      color={'color11'}
                      mt={'7px'}
                      ml={'5px'}
                      mb={'-30px'}>
                      {number.length <= 2 && null}

                      {number.length > 2 && <Fragment>{`${number} ${name}`}</Fragment>}
                    </Text>

                    {data.celllist.map((item, index) => {
                      return (
                        <Box
                          position={'relative'}
                          zIndex={data.celllist.length - index}
                          key={`EditorCellControllerWithProject-${index}`}>
                          <EditorCellControllerWithProject
                            key={`EditorCellControllerWithProject-${index}`}
                            data={item}
                            editable={
                              item.content.number === 0 // редактирование первого блока и не запускает автосохранение // TODO: эта штука работает не так, проблема в том что она каждый раз включает
                            }
                            sectionNumber={`${number}${index + 1}`}
                          />
                        </Box>
                      );
                    })}
                  </ContentWrapper>
                </Fragment>
              );
            }

            return null;
          }}
        </Query>

        <EditorAdditionalMenu sectionid={sectionid} />
      </Flex>
    );
  }
}

ProjectEditor = withRouter(ProjectEditor);

ProjectEditor = withApollo(ProjectEditor);

export default ProjectEditor;
