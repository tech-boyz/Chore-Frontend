import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllChores } from '../lib/chores'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export async function getStaticProps () {
  const allChoresData = await getAllChores()
  return {
    props: {
      allChoresData
    }
  }
}
export default function Home ({ allChoresData }) {
  const classes = useStyles()

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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Roommate</TableCell>
                <TableCell>Chore Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allChoresData.map(({ first_name, last_name, chore_name, chore_description }) => (
                <TableRow key={chore_name} hover>
                  <TableCell component='th' scope='row'>
                    {first_name} {last_name}
                  </TableCell>
                  <TableCell>{chore_name}</TableCell>
                  <TableCell>{chore_description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </Layout>
  )
}
