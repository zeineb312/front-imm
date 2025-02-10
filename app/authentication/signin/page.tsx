'use client';

import {
  Button,
  Center,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  TextProps,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes';
import { Surface } from '@/components';
import classes from './page.module.css';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';



const LINK_PROPS: TextProps = {
  className: classes.link,
};

function Page() {
  const { push } = useRouter();
  const form = useForm({
    initialValues: { email: 'demo@email.com', password: 'Demo@123' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value && value?.length < 6
          ? 'Password must include at least 6 characters'
          : null,
    },
  });



  return (
    <div
      style={{
        backgroundImage: "url('/chat-white.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',   
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0, 
        padding: 0, 
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0,
        bottom: 0,
      }}
    >
      <>
        <title>Sign in | DesignSparx</title>
        <meta
          name="description"
          content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
        />
      </>
      <Title ta="center">Welcome back!</Title>
      <Text ta="center">Sign in to your account to continue</Text>

      <Surface component={Paper} className={classes.card}>
        <form
          onSubmit={form.onSubmit(() => {
            push(PATH_DASHBOARD.default);
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            classNames={{ label: classes.label }}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            classNames={{ label: classes.label }}
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              classNames={{ label: classes.label }}
            />
            <Text
              component={Link}
              href={PATH_AUTH.passwordReset}
              size="sm"
              {...LINK_PROPS}
            >
              Forgot password?
            </Text>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
        <Center mt="md">
          <Text
            fz="sm"
            ta="center"
            component={Link}
            href={PATH_AUTH.signup}
            {...LINK_PROPS}
          >
            Do not have an account yet? Create account
          </Text>
        </Center>
      </Surface>
    </div>
  );
}

export default Page;
