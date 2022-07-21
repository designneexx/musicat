import '../styles/globals.css'
import 'react-h5-audio-player/lib/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-slider/assets/index.css'

import type { AppProps } from 'next/app'
import React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { themeChange } from 'theme-change'

import AudioSystem from '@/components/AudioSystem'
import AudioSystemProvider from '@/components/AudioSystemProvider'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import { store } from '@/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    themeChange(false)
  })

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AudioSystemProvider>
            {(isSelectedTrack) => (
              <div className="drawer">
                <input
                  id="my-drawer-3"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content grid grid-cols-1 grid-rows-[max-content,1fr,max-content] overflow-hidden">
                  <Header isSelectedTrack={isSelectedTrack} />
                  <div className="h-full overflow-y-auto">
                    <Component {...pageProps} />
                  </div>
                  <div className="pb-8 container">
                    {isSelectedTrack && <AudioSystem />}
                  </div>
                </div>
                <div className="drawer-side">
                  <label htmlFor="my-drawer-3" className="drawer-overlay" />
                  <div className="menu p-4 overflow-y-auto w-80 bg-base-100">
                    <Menu className="flex flex-col gap-1 mt-2" />
                  </div>
                </div>
              </div>
            )}
          </AudioSystemProvider>
          <div>
            <ToastContainer />
          </div>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
