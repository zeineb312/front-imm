import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  rem,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { PATH_AUTH, PATH_DASHBOARD, PATH_DOCS, PATH_GITHUB } from '@/routes';
import { Logo } from '@/components';
import Link from 'next/link';
import classes from './HeaderNav.module.css';
import { IconBrandGithub, IconPlayerPlay } from '@tabler/icons-react';

const MOCK_DATA = [
  {
    link: 'https://652579e5b7998a00083d022b--mantine-analytics-dashboard.netlify.app/',
    label: 'Version 1',
  },
  {
    link: 'https://6564d1b09deea091e3ec0769-jsxuvbmjcr.chromatic.com/?path=/docs/welcome--docs',
    label: 'components',
  },
  {
    link: 'mailto:kelvin.kiprop96@gmail.com',
    label: 'support',
  },
  {
    link: PATH_DOCS.root,
    label: 'documentation',
  },
];

const HEADER_HEIGHT = rem(60);

const HeaderNav = () => {
  const theme = useMantineTheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const tablet_match = useMediaQuery('(max-width: 768px)');

  const items = MOCK_DATA.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        target="_blank"
        className={classes.link}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Box>
      <header className={classes.header}>
        <Container className={classes.inner} fluid>
          <Logo style={{ color: theme.white }} />
          <Group gap="xs" className={classes.links}>
            {/* {items} */}
            {/* <Button
              component="a"
              target="_blank"
              href={PATH_GITHUB.repo}
              variant="transparent"
              c="white"
              leftSection={<IconBrandGithub size={16} />}
              className={classes.link}
            >
              Give us a star
            </Button> */}
            <Button
              component={Link}
              href={PATH_AUTH.signin}
              leftSection={<IconPlayerPlay size={16} />}
            >
              Start now
            </Button>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
            color={theme.white}
          />
        </Container>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Menu"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        transitionProps={{
          transition: tablet_match ? 'slide-up' : 'slide-left',
        }}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          {items}
          <Button
            component="a"
            target="_blank"
            href={PATH_GITHUB.repo}
            variant="transparent"
            c="white"
            leftSection={<IconBrandGithub size={16} />}
            className={classes.link}
          >
            Give us a star
          </Button>
          <Button component={Link} href={PATH_DASHBOARD.default}>
            Live Previews
          </Button>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HeaderNav;
