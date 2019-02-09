import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

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

  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {
    const {
      sectionid,
      location: { search },
    } = this.props;

    const numberSection = queryString.parse(search);
    const section = numberSection.sectionNumber.slice(0, -2);

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
              return (
                <Fragment>
                  <Text
                    width={'60px'}
                    fontFamily={'secondary'}
                    lineHeight={8}
                    fontSize={6}
                    color={'color11'}
                    mt={'15px'}
                    ml={'15px'}>
                    {numberSection.sectionNumber.length === 2 && (
                      <Fragment>{numberSection.sectionNumber}</Fragment>
                    )}

                    {numberSection.sectionNumber.length > 2 && <Fragment>{section}</Fragment>}
                  </Text>

                  <ContentWrapper>
                    <Text
                      width={'60px'}
                      fontFamily={'secondary'}
                      lineHeight={8}
                      fontSize={6}
                      color={'color11'}
                      mt={'7px'}
                      ml={'5px'}
                      mb={'-30px'}>
                      {numberSection.sectionNumber.length <= 2 && null}

                      {numberSection.sectionNumber.length > 2 && (
                        <Fragment>{numberSection.sectionNumber}</Fragment>
                      )}
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
                            sectionNumber={`${numberSection.sectionNumber}${index + 1}`}
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

export default ProjectEditor;
