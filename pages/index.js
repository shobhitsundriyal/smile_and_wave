import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Smile and Wave</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>Wave to us</main>
		</div>
	)
}
