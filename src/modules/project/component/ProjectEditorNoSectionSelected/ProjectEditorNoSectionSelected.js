import React from 'react';
import {Flex} from "@lib/ui/Flex/Flex";
import {Text} from "@lib/ui/Text/Text";
import {ProjectEditorContentWrapper} from "../ProjectEditorContentWrapper/ProjectEditorContentWrapper";

export const ProjectEditorNoSectionSelected = () => (
  <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'60px'} flexDirection={'column'}>
    <ProjectEditorContentWrapper>
      <Text fontFamily={'primary300'} fontSize={6} lineHeight={8}>
        Раздел не выбран.
      </Text>
    </ProjectEditorContentWrapper>
  </Flex>
);

export default ProjectEditorNoSectionSelected;
