import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Button, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose, isClose } = useDisclosure()

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if(!success){
            toast({
            title:"Error!",
            description: message,
            status: 'error',
            duration: 8000,
            isClosable: true,
            })}
        else{
            toast({
            title: 'Success',
            description: message,
            status: 'success',
            duration: 8000,
            isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid,updatedProduct);
        onClose();
        if(!success){
            toast({
            title:"Error!",
            description: message,
            status: 'error',
            duration: 8000,
            isClosable: true,
            })}
        else{
            toast({
            title: 'Updated!',
            description: "Product details updated successfully",
            status: 'success',
            duration: 8000,
            isClosable: true,
            })
        }
    }

  return (
    <Box
    shadow="lg"
    rounded="lg"
    overflow="hidden"
    transition="all 0.5s"
    _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} ></Image>
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4} >
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} bg={"gray.700"} color='blue.500' />
                <IconButton icon={<DeleteIcon />} 
                onClick={ () => {handleDeleteProduct(product._id)} } bg={"gray.700"} color='red' />
            </HStack>
        </Box>
        
        <Modal isOpen={isOpen} isClose={isClose} >
            <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product </ModalHeader>
                    <ModalCloseButton onClick={onClose}/>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input
                            placeholder='Product Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input
                            placeholder='Product Image URL'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg={'blue.500'} onClick={() => handleUpdateProduct(product._id,updatedProduct)} mr={3}>
                            Save
                        </Button>
                        <Button bg={"red"} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </ModalContent>
        </Modal>
    </Box>
  )
};

export default ProductCard;