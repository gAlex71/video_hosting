import type { AppProps } from 'next/app'
import '../app/styles/globals.scss'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import ReduxToastr from 'react-redux-toastr'
import NextProgressBar from 'nextjs-progressbar'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextProgressBar
				color='#FF7652'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>

			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<Component {...pageProps} />
					<ReduxToastr
						newestOnTop={false}
						preventDuplicates
						progressBar
						closeOnToastrClick
						timeOut={4000}
						transitionIn='fadeIn'
						transitionOut='fadeOut'
					/>
				</PersistGate>
			</Provider>
		</>
	)
}
