'use client';

import {
  Button,
  Group,
  Paper,
  rem,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import React from 'react';
import Link from 'next/link';
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes';
import { useMediaQuery } from '@mantine/hooks';
import classes from './page.module.css';
import { Surface } from '@/components';
import { Metadata } from 'next';
import styles from './page.module.css'; 




const metadata: Metadata = {
  title: 'Password Reset | DesignSparx',
  description:
    'Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!',
};

function Page() {
  const mobile_match = useMediaQuery('(max-width: 425px)');

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
        <title>Password Reset | DesignSparx</title>
        <meta
          name="description"
          content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
        />
      </>
      <Title ta="center">Forgot your password?</Title>
      <Text ta="center">Enter your email to get a reset link</Text>

      <Surface component={Paper} className={classes.card}>
        <TextInput label="Your email" placeholder="me@email.com" required />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <UnstyledButton
            component={Link}
            href={PATH_AUTH.signin}
            color="dimmed"
            className={classes.control}
          >
            <Group gap={2} align="center">
              <IconChevronLeft
                stroke={1.5}
                style={{ width: rem(14), height: rem(14) }}
              />
              <Text size="sm" ml={5}>
                Back to the login page
              </Text>
            </Group>
          </UnstyledButton>
          <Button
            component={Link}
            href={PATH_DASHBOARD.default}
            fullWidth={mobile_match}
          >
            Reset password
          </Button>
        </Group>
      </Surface>
    </div>
  );
  function PasswordResetPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
  
      if (/^\d{0,6}$/.test(value)) {
        setPassword(value);
        setError('');
      } else {
        setError('Le mot de passe doit contenir exactement 6 chiffres.');
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (password.length === 6) {
        alert('Mot de passe valide !');
      } else {
        setError('Le mot de passe doit contenir exactement 6 chiffres.');
      }
    };
  
    return (
      <div className={styles.container}>
        <h1>Réinitialisation du mot de passe</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Nouveau mot de passe (6 chiffres) :
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              maxLength={6}
              placeholder="123456"
              className={styles.input}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Valider
          </button>
        </form>
      </div>
    );
  }
}

export default Page;
