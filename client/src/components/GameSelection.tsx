import React from 'react';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
// app bar and basics
import AppBar from '@material-ui/core/AppBar';
import { SelectLanguageDarkMode } from './SelectLanguageDarkMode';
import Typography from '@material-ui/core/Typography';

// content
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

//translations
import { useTranslation } from './translations';

import config from './data/config.json';
import { Toolbar } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { useSharedState } from '../store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    hint: {
      flexGrow: 1,
      padding: 10,
      paddingBottom: 15
    }
  })
);


function GameSelection(props: {theme: Partial<Theme>}) {
  const { t } = useTranslation();
  const [state] = useSharedState();
  const theme = props.theme;
  const classes = useStyles();

  function createGame(event: React.MouseEvent<HTMLElement>) {
    console.log('create new game: ' + event.currentTarget.dataset.game)
    state.webSocketCon.send(JSON.stringify(
      {
        'type': 'new_game',
        'game': event.currentTarget.dataset.game
      }
    ))
  }

  function gameTemplate(template: {name: string}): any {
    return (
      <Grid item xs={12} sm={3} lg={3} key={template.name}>
        <Card
            data-template={template.name}>
          <CardActionArea onClick={createGame} data-game={template.name}>
            <CardHeader title={t(template.name)}></CardHeader>
            <CardMedia
              image="/unknown.png"
              className={classes.media}
              title={t(template.name) + ' Screenshot'}>
            </CardMedia>
            <CardContent>
              {t(template.name + '_desc')}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>);
  }

  let gameTemplates: any[] = [];
  config.game_templates.forEach((tpl) => {
    gameTemplates.push(gameTemplate(tpl))
  })
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar>
            <SelectLanguageDarkMode />
          </Toolbar>
        </AppBar>
        <main>
          <Container>
            <Typography variant="h6" className={classes.hint}>
              {t("new_game")}
            </Typography>
            <Grid container spacing={2}>
              {gameTemplates}
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export { GameSelection };