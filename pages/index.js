import Router from 'next/router'
import {
  Alert, FormControl, Button, Text, FormErrorMessage,
  AlertIcon, Flex, Heading, Input, Spinner, useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'
import { Field, Form, Formik } from 'formik'

export default function Home() {
  const formBackground = useColorModeValue('gray.100', 'gray.800')

  const handleSubmit = (values) => {
    const name = values.name
    Router.push({
      pathname: `/user/${name}`,
      query: { pid: name },
    }, `/user/${name}`)


  }
  // 200 , 404 403
  function validateName(value) {
    let error
    if (!value) {
      error = 'Username is required'
    }
    // else error = 'Username not found. Try something else!!!'
    return error
  }

  return (
    <Flex height='100vh' alignItems='center' justifyContent='center' pb='10'>
      <Flex direction='column' alignItems='center' backgroundColor={formBackground} p={12} rounded={6} gap={6}>
        <Image src='/github-octocat.svg' width={100} height={100} />
        <Heading size='xl' fontSize='2.2rem'>Find Your Github Space</Heading>
        {/* {useSWR ? <Text>{useSWR}</Text> : 'nothing here'} */}
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values, actions) => {
            handleSubmit(values)
            actions.setSubmitting(false)
          }}
        >
          {(props) => (
            <Form>
              <Field name='name' validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <Input
                      {...field}
                      placeholder='name'
                      color='blue.200'
                      backgroundColor='rgb(38,48,60)'
                      outline='none'
                      border='none'
                      padding='2.2rem'
                      size='md'
                      fontSize='2.2rem'
                      textAlign='center'
                      fontWeight={400}
                      mb={2}
                    />
                    <FormErrorMessage>


                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        {/* <Input
          color='blue.200'
          backgroundColor='rgb(38,48,60)'
          outline='none'
          border='none'
          padding='2.2rem'
          size='md'
          fontSize='2.2rem'
          textAlign='center'
          fontWeight={400}
          onChange={e => handleInputChange(e)}
        />
        {error && <Alert status='warning'>
          <AlertIcon />
          User not found, try something else
        </Alert>
        }
        {loading && <Spinner size='xl' />} */}
      </Flex>
    </Flex>
  )
}
