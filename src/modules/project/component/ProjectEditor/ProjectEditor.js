import React, {Component} from 'react';
import {Query} from "react-apollo";

/** Components */
import EditorCellController from "../EditorCellController/EditorCellController";

/**View */

/**PropTypes */
import {Flex} from "@lib/ui/Flex/Flex";
import styled from "styled-components";
import {withProject} from "../ProjectContext/ProjectContext";
import {EditorAdditionalMenu} from "../EditorAdditionalMenu/EditorAdditionalMenu";


/** Graphql */
import CellListQuery from './CellListQuery.graphql';
import {Box} from "@lib/ui/Box/Box";


const ContentWrapper = styled.div`
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;  
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


const EditorCellControllerWithProject = withProject((props) => (<EditorCellController {...props}/>));

export class ProjectEditor extends Component {
  static propTypes = {};


  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
  }

  render() {
    const {sectionid} = this.props;

    return (
      <Flex pl={'10px'} pr={'40px'} mb={'20px'} flexDirection={'column'}>
        <ContentWrapper>
          <Query
            skip={!sectionid}
            query={CellListQuery}
            variables={{
              parent: sectionid
            }}
          >
            {
              ({data, loading, error}) => {
                if (loading) {
                  return `Загрузка`;
                }

                if (error) {
                  return `Ошибка`;
                }

                if (data && data.celllist) {
                  return data.celllist.map((item, index) =>
                    (<Box
                      position={'relative'}
                      zIndex={data.celllist.length - index}
                    >
                      <EditorCellControllerWithProject
                        key={`EditorCellControllerWithProject-${index}`}
                        data={item}/>
                    </Box>));
                }
                return null;
              }
            }
          </Query>
        </ContentWrapper>
        <EditorAdditionalMenu/>
      </Flex>
    );
  }
}

export default ProjectEditor;
