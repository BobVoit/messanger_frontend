import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Paper, Avatar, Typography, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';


const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
        width: 800,
    },
    titleBlock: {
        marginBottom: theme.spacing(3)
    },
    titleIconWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    titleIcon: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    paper: {
        display: 'flex',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    infoBlock: {
        
    },
    avatarWrapper: {
        marginBottom: theme.spacing(2)
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
})

class Settings extends Component {
    render() {
        const { classes, avatar, nickname } = this.props;
        return (
            <Container fixed className={classes.root}>
                <TitleTemplate 
                    icon={<SettingsIcon   
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Настройки"
                />
                <Paper className={classes.paper}>
                    <div className={classes.infoBlock}>
                        <div className={classes.avatarWrapper}>
                            <Avatar
                                className={classes.avatar}
                                src={avatar ? avatar : null}
                            />
                        </div>
                        <Typography 
                            variant="h5"
                            align="center"
                        >{nickname}</Typography>
                    </div>
                    <div>
                        <List>
                            {/* Сделать список пунктов, в каждом из которых будет изменение данных */}
                        </List>
                    </div>
                </Paper>
            </Container>
        )
    }
}

Settings.propTypes = {
    nickname: PropTypes.string,
    avatar: PropTypes.string
}

const mapStateToProps = (state) => ({
    avatar: state.auth.avatar,
    nickname: state.auth.nickname
})

export default compose(
    withStyles(useStyles), 
    connect(mapStateToProps, {

    }),
    withAuthRedirect
)(Settings);