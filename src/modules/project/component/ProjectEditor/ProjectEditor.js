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
import { sortingCells } from '../../utils/sortingCells';

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
    childName: '',
    parentName: '',
    number: null,
  };

  componentWillUnmount() {
    this.unsubscribeToCellItem();
  }

  componentDidMount() {
    if (this.props.sectionid) {
      this.createPageTitle(this.props.sectionid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sectionid !== this.props.sectionid) {
      this.createPageTitle(nextProps.sectionid);
    }
  }

  /**
   * @param {string} id - id ячейки
   * @desc метод для создания заголовков
   * */
  createPageTitle = async id => {
    try {
      this.unsubscribeToCellItem();

      let childCell = await this.getCellItem(id);
      this.subscribeInstanceToUpdateTitle = this.subscribeToCellItem(
        childCell.data.cellitem.id,
      ).subscribe(({ data }) => {
        const name = data.cellitem && data.cellitem.name;
        const numbers = queryString.parse(this.props.location.search);
        return this.setState(state => ({
          ...state,
          childName: name,
          number: numbers && numbers.sectionNumber,
        }));
      });

      if (childCell && childCell.data.cellitem.parent) {
        let parentCell = await this.getCellItem(childCell.data.cellitem.parent.id);
        this.subscribeInstanceToUpdateParentTitle = this.subscribeToCellItem(
          parentCell.data.cellitem.id,
        ).subscribe(({ data }) => {
          const name = data.cellitem && data.cellitem.name;
          return this.setState(state => ({
            ...state,
            parentName: name,
          }));
        });
      }
    } catch (error) {
      console.log('Error createPageTitle: ', error);
    }
  };

  /** @desc сбрасываем подписки на изменение ячеек */
  unsubscribeToCellItem = () => {
    if (this.subscribeInstanceToUpdateTitle) {
      this.subscribeInstanceToUpdateTitle.unsubscribe();
      this.subscribeInstanceToUpdateTitle = null;
    }
    if (this.subscribeInstanceToUpdateParentTitle) {
      this.subscribeInstanceToUpdateParentTitle.unsubscribe();
      this.subscribeInstanceToUpdateParentTitle = null;
    }
  };

  /**
   * @param {string} id - id ячейки
   * @desc создает подписку на обновление ячейки
   * */
  subscribeToCellItem = id => {
    try {
      return this.props.client.watchQuery({
        query: CellItemQuery,
        variables: { id: id },
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  /**
   * @param {string} id - id ячейки
   * @desc метод выполняет получение данные по ячейке
   * */
  getCellItem = id => {
    return this.props.client.query({ query: CellItemQuery, variables: { id } }).catch(error => {
      console.log('Error getCellItem: ', error);
    });
  };

  render() {
    const {
      sectionid,
      location: { search },
    } = this.props;
    console.log(11, sectionid);

    const { childName, parentName, number } = this.state;

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
              const section = number ? number.slice(0, -2) : '';

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
                    {/** TODO: для формирования нумерации гавного заголовка лучше сделай отдельный метод чтобы этой каши тут небыло */}
                    {number && number.length === 2 ? (
                      <Fragment>{`${number} ${childName || ''}`}</Fragment>
                    ) : (
                      <Fragment>{`${section} ${parentName || ''}`}</Fragment>
                    )}
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
                      {number && number.length <= 2 ? null : (
                        <Fragment>{`${number} ${childName || ''}`}</Fragment>
                      )}
                    </Text>

                    {sortingCells(data.celllist).map((item, index) => {
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
