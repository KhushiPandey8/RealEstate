import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({ propertyDetails = {} }) => {
  const { 
    price = 'N/A', 
    rentFrequency = '', 
    rooms = 0, 
    title = '', 
    baths = 0, 
    area = 0, 
    agency = {}, 
    isVerified = false, 
    description = '', 
    type = '', 
    purpose = '', 
    furnishingStatus = '', 
    amenities = [], 
    photos = [] 
  } = propertyDetails;

  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
      {photos && <ImageScrollbar data={photos} />}
      <Box w='full' p='6'>
        <Flex paddingTop='2' alignItems='center'>
          <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
          <Text fontWeight='bold' fontSize='lg'>
            AED {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size='sm' src={agency?.logo?.url} alt="Agency Logo" />
        </Flex>
        <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
      </Box>
      <Box marginTop='2'>
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
        <Text lineHeight='2' color='gray.600'>{description}</Text>
      </Box>
      <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Type</Text>
          <Text fontWeight='bold'>{type}</Text>
        </Flex>
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Purpose</Text>
          <Text fontWeight='bold'>{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Furnishing Status</Text>
            <Text fontWeight='bold'>{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {amenities.length > 0 && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilities:</Text>}
        <Flex flexWrap='wrap'>
          {amenities?.map((item, index) => (
            item?.amenities && item.amenities.length > 0 ? (
              item.amenities.map((amenity) => (
                <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                  {amenity.text}
                </Text>
              ))
            ) : null
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  try {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
    return {
      props: {
        propertyDetails: data,
      },
    };
  } catch (error) {
    console.error("Error fetching property details:", error);
    return {
      props: {
        propertyDetails: {},  // Return an empty object in case of an error
      },
    };
  }
}
