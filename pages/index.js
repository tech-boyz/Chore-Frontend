import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllChores } from '../lib/chores'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core/'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AppBar, Toolbar, IconButton, Avatar } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { spacing } from '@material-ui/system';
import Grid from '@material-ui/core/Grid'; 

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  card: {
    margin: 10,
  },
  iconItem: {
    display: "inline-flex",
    alignItems: "center",
    justify: "center"
  },
  success: {
    color: "green[500]",
  },
  avatar: {
    marginLeft: "auto",
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
  const possibleTitles = [
    {
      title: "Chores 'R Us", 
      image: "/images/toysrus.png"
    },
    {
      title: "George Choreman", 
      image: "/images/foreman.jpg"
    },
    {
      title: "The Cold Chore", 
      image: "/images/ussr.png"
    },
    {
      title: "Chore Some Beers 🍻",
      image: "/images/"
    },
    {
      title: "The Marine Chore",
      image: "/images/marines.png"
    },
    {
      title: "Gears of Chore",
      image: "/images/gears.png"
    },
    {
      title: "Star Chores",
      image: "/images/r2d2.jpg"
    }
  ]
  const appBarTitle = possibleTitles[Math.floor(Math.random() * possibleTitles.length)];

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
        {allChoresData.map(({ first_name, last_name, chore_name, chore_description, completed }) => (
          <Card className={classes.card} key={chore_name}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <Typography variant="h6" gutterBottom>{first_name} {last_name}</Typography>
                  <Typography variant="subtitle2" gutterBottom>{chore_name}</Typography>
                </Grid> 
                <Grid className={classes.iconItem} item xs={2}>
                  { completed ? ( 
                    <DoneIcon className={classes.success}/>
                  ) : (
                    <ClearIcon color="secondary"/>
                  )}
                </Grid> 
              </Grid>
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
            <Typography variant="h6">
              {appBarTitle.title}              
            </Typography>
            <Avatar className={classes.avatar} alt="chore" src={appBarTitle.image}/>
          </Toolbar>
        </AppBar>
      ) : null}
    </Layout>
  )
}
