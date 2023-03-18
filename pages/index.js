import { Flex, FormControl, FormErrorMessage, Heading, Input, useColorModeValue } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import Router from 'next/router'
import Cookies from 'js-cookie'

export default function Home() {
  const formBackground = useColorModeValue('gray.100', 'gray.800')

  const handleSubmit = (values) => {
    const name = values.name
    Cookies.set('userId', name)
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
    return error
  }

  return (
    <Flex height='90vh' alignItems='center' justifyContent='center'  pb='10' >
      <Flex direction='column' alignItems='center' backgroundColor={formBackground} p={12} rounded={6} gap={6}>
        <Image src='/github-octocat.svg' width={100} height={100} />
        <Heading size={{base: 'lg', md: 'xl'}} fontSize='2.2rem' align='center'>Find Your Github Space</Heading>
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
      </Flex>
    </Flex>
  )
}
