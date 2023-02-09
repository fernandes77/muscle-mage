import {
  ActionIcon,
  AppShell,
  Code,
  Divider,
  Group,
  Navbar as MTNavbar,
  NavLink as MTNavLink,
  NavLinkProps,
  ThemeIcon,
  useMantineColorScheme,
} from '@mantine/core'
import {
  IconDatabaseImport,
  IconFingerprint,
  IconFlame,
  IconHome,
  IconKey,
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconSun,
} from '@tabler/icons-react'
import { useRouter } from 'next/router'

const ColorSchemeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      })}
    >
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  )
}

const NavLink: React.FC<NavLinkProps & { href: string }> = ({ children, href, icon, ...props }) => {
  const { asPath } = useRouter()
  const active = href === asPath

  return (
    <MTNavLink
      {...props}
      active={active}
      component="a"
      icon={<ThemeIcon color={active ? 'primary' : 'gray'}>{icon}</ThemeIcon>}
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        '&:hover': active
          ? undefined
          : {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              '& svg': {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              },
            },
      })}
    />
  )
}

const Navbar: React.FC = () => {
  const data = [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '', label: 'Workouts', icon: IconFlame },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Other Settings', icon: IconSettings },
  ]

  return (
    <MTNavbar width={{ sm: 275 }} p="md">
      <MTNavbar.Section pb="md">
        <Group position="apart">
          <Code sx={{ fontWeight: 700 }}>Muscle Mage!!</Code>
          <ColorSchemeToggle />
        </Group>
      </MTNavbar.Section>

      <Divider />

      <MTNavbar.Section grow pt="xl">
        {data.map((item) => (
          <NavLink key={item.label} href={item.link} label={item.label} icon={<item.icon />} />
        ))}
      </MTNavbar.Section>

      <Divider />

      <MTNavbar.Section pt="md">
        <NavLink href="#" label="Logout" icon={<IconLogout />} />
      </MTNavbar.Section>
    </MTNavbar>
  )
}

export const DashboardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppShell navbar={<Navbar />}>{children}</AppShell>
}
