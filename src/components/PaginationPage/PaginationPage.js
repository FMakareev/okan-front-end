import React, {Component} from 'react';


/**View */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';
import {SvgPlay} from '@lib/ui/Icons/SvgPlay';
import {ButtonWithImage} from "@lib/ui/ButtonWithImage/ButtonWithImage";
import SmallPreloader from "@lib/ui/SmallPreloader/SmallPreloader";

export class PaginationPage extends Component {
  static defaultProps = {
    data: [],
  }

  render() {
    const {pagination, data, loading, error, Consumer} = this.props;
    if(error){
      throw Error(error);
    }
    return (
      <Box>
        {
          loading && <SmallPreloader/>
        }
        {
          !loading && <Consumer data={data}/>
        }
            <Flex justifyContent={'center'} mt={[4]}>
              <ButtonWithImage
                fontSize={4}
                onClick={pagination.prevPage}
                disabled={pagination.disabledToPrevPage}
                size={'xsmall'}
                variant={'large'}
                style={{transform: 'rotate(180deg)'}}
              >
                <SvgPlay/>
              </ButtonWithImage>

              <Text
                fontSize={6}
                lineHeight={8}
                color={'color7'}
                textAlign={'center'}
                px={[4]}
                fontFamily={'primary500'}>
                {pagination.pageNumber}
              </Text>

              <ButtonWithImage
                fontSize={4}
                onClick={pagination.nextPage}
                disabled={pagination.disabledToNextPage}
                size={'xsmall'}
                variant={'large'}
              >
                <SvgPlay/>
              </ButtonWithImage>
            </Flex>


      </Box>
    );
  }
}

export default PaginationPage;
