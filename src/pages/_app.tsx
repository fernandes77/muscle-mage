import { ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme } from '@mantine/core'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'
import { api } from '../utils/api'

const MuscleMageApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const originalTheme = useMantineTheme()
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryColor: 'orange',
            colorScheme: colorScheme,
            components: {
              ThemeIcon: {
                defaultProps: {
                  variant: 'light',
                },
                styles: (_, params) => ({
                  root: {
                    background: params.variant === 'light' ? 'none' : undefined,
                  },
                }),
              },
            },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MuscleMageApp)
