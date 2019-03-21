import React from 'react';
import PropTypes from 'prop-types';

/** Components */
import ProjectItem from './ProjectItem';

/** View */
import PaginationPage from '@lib/ui/PaginationPage/PaginationPage';

export const ProjectList = ({ data }) => {
  return (
    <>
      <PaginationPage data={data} Component={ProjectItem} />
    </>
  );
};

ProjectList.propTypes = {
  /** data */
  data: PropTypes.any,
};

export default ProjectList;
