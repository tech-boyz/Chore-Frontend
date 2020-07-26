import { getAllChores } from '../lib/chores'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
export async function getStaticProps () {
  const allChoresData = await getAllChores()
  return {
    props: {
      allChoresData
    }
  }
}
export default function Home ({ allChoresData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.lightText}>
          (This is a serverless application meant to keep track of weekly chores, brought to you by your favorite software/electrical engineers.)
        </p>
        <a href='https://github.com/tech-boyz'>Our source code</a>.
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Chore List</h2>
        <table className={utilStyles.table}>
          {allChoresData.map(({ first_name, last_name, chore_name, chore_description }) => (
            <tr className={utilStyles.tableEntry} key={chore_name}>
              <td>{first_name} {last_name}</td>
              <td>{chore_name}</td>
              <td>{chore_description}</td>
            </tr>
          ))}
        </table>
      </section>
    </Layout>
  )
}
