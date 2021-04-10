import React, { useState } from 'react';

import { Avatar, Box, Container, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import DisplayImageWindow from '../DialogWindows/DisplayImageWindow';
import TextAboutUser from './TextAboutUser';

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 600,
        display: 'flex',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        boxShadow: theme.shadows[20]
    },
    avatarWrapper: {
        paddingRight: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        cursor: 'pointer'
    },
    divider: {
        marginTop: theme.spacing(-3),
        marginBottom: theme.spacing(-3),
    },
    infoWrapper: {
        flex: 1,
        paddingLeft: theme.spacing(2),
    },
}))

const ProfileInfo = ({ nickname, aboutText, avatar, saveUserAvatar, updateAboutText }) => {
    const classes = useStyles();
    const [openAvatarWindow, setOpenAvatarWindow] = useState(false);

    const onAvatarSelected = (e) => {
      if (e.target.files.length) {
        saveUserAvatar(e.target.files[0]);
      }
    }
    
    const openAvatar = () => {
      setOpenAvatarWindow(true);
    }

    const closeAvatar = () => {
      setOpenAvatarWindow(false);
    }
    

    return (
      <Paper className={classes.paper}>
        <div className={classes.avatarWrapper}>
          <Avatar 
            onClick={avatar ? openAvatar : null} 
            className={classes.avatar} 
            src={avatar ? avatar : null}
          >
            {!avatar && (
              <IconButton
                component="label"
              >
                <AddAPhotoIcon />
                <input 
                  type="file" 
                  hidden 
                  onChange={onAvatarSelected}
                />
              </IconButton>
            )}
          </Avatar>
        </div>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <div className={classes.infoWrapper}>
          <Typography variant="h5" gutterBottom>
            {nickname}
          </Typography>
          <Divider />
          <TextAboutUser 
            aboutText={aboutText}
            updateAboutText={updateAboutText}
          />
        </div>


        <DisplayImageWindow 
          open={openAvatarWindow}
          handleClose={closeAvatar}
          nickname={nickname}
          avatar={avatar}
        />

      </Paper>
    );
}

export default ProfileInfo;