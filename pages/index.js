import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllChores } from '../lib/chores'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core/'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AppBar, Toolbar, IconButton, Fab } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add';
import { spacing } from '@material-ui/system';

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
  const classes = useStyles();
  const onMobile = useMediaQuery('only screen and (max-width: 768px)');

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
              {allChoresData.map(({ first_name, last_name, chore_name, chore_description }) => (
                <Card className={classes.card} key={chore_name}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>{first_name} {last_name}</Typography>
                    {chore_name}
                  </CardContent>
                </Card>
              ))}
      </section>
      { onMobile ? (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      ) : null}
    </Layout>
  )
}
