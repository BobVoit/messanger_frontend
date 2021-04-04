import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { saveUserAvatar } from '../../redux/authReducer';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';

import ProfileInfo from './ProfileInfo';

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
    titleIcon: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
})

class Profile extends Component {
    render() {
        const { classes, nickname, aboutText, saveUserAvatar, avatar } = this.props;
        return (
            <Container fixed className={classes.root}>
                <TitleTemplate 
                    icon={<PersonIcon 
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Профиль"
                />
                <ProfileInfo 
                    nickname={nickname}
                    avatar={avatar}
                    aboutText={aboutText}
                    saveUserAvatar={saveUserAvatar}
                />
            </Container>
        )
    }
}

Profile.propTypes = {
    nickname: PropTypes.string,
    aboutText: PropTypes.string,
    avatar: PropTypes.string,
    saveUserAvatar: PropTypes.func
}

const mapStateToProps = (state) => ({
    nickname: state.auth.nickname,
    aboutText: state.auth.aboutText,
    avatar: state.auth.avatar
})

export default compose(withStyles(useStyles), connect(mapStateToProps, {
    saveUserAvatar
}), withAuthRedirect)(Profile);