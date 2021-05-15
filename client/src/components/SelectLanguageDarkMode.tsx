import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// app bar and basics
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useSharedState } from '../store';

//translations
import { useTranslation } from './translations';

import config from './data/config.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    }
  })
);

function SelectLanguageDarkMode() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useSharedState();
  const icon = state.prefersDarkMode ? <Brightness7Icon /> : <Brightness4Icon />;

  const setDarkMode = (prefersDarkMode: boolean) => {
    const autoDetectDarkMode = false;
    setState((prev) => ({ ...prev, prefersDarkMode, autoDetectDarkMode }));
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const languages: any = config.languages;

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    const data = event.currentTarget.dataset;
    if (data.language) {
      i18n.changeLanguage(data.language);
    }
    setAnchorEl(null);
  };

  const menuItems = []
  for (const lng in languages) {
    const lngItem = languages[lng];
    menuItems.push(
      <MenuItem 
        key={lng}
        data-language={lng}
        onClick={handleLanguageMenuClose}>{lngItem.icon} {lngItem.name}</MenuItem>
    )
  }

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {t("Game Designer")}
      </Typography>
        <div>
        <IconButton
            aria-label="dark/light mode"
            color="inherit"
            onClick={() => setDarkMode(!state.prefersDarkMode)}
          >
            {icon}
          </IconButton>
          <IconButton
            aria-label="change language"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleLanguageMenuOpen}
            color="inherit"
          >
            {languages[i18n.language].icon}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleLanguageMenuClose}
          >
            {menuItems}
          </Menu>
        </div>
    </>
  );
}

export {SelectLanguageDarkMode}