import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Container, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { saveUserAvatar, updateAboutText } from '../../redux/authReducer';
import { getProfile, toggleCurrentAcount, setProfile } from '../../redux/usersReducer';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';
import ProfileInfo from './ProfileInfo';
import Preloader from '../common/Preloader/Preloader';

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
})

class Profile extends Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            const { id, nickname, avatar, status, aboutText } = this.props;
            this.props.setProfile({ id, nickname, avatar, status, aboutText });
            if (!this.props.id) {
                this.props.history.push("/signin");
            }
        } else {
            this.props.getProfile(userId);
        }
    }

    componentWillUnmount() {
        this.props.setProfile(null);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.profile) {
            if (this.props.match.params.userId != prevProps.match.params.userId) {
                this.props.setProfile(null);
                let userId = this.props.match.params.userId;
                if (!userId) {
                    const { id, nickname, avatar, status, aboutText } = this.props;
                    this.props.setProfile({ id, nickname, avatar, status, aboutText });
                    if (!this.props.id) {
                        this.props.history.push("/signin");
                    }
                } else {
                    this.props.getProfile(userId);
                }
            }
        }
    }

    render() {
        const { classes, saveUserAvatar, updateAboutText, profile, aboutText} = this.props;
        if (!profile) {
            return <Preloader />
        }

        const textAboutUser = localStorage.getItem('userId') == profile.id ? aboutText : profile.aboutText;

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
                    nickname={profile.nickname}
                    avatar={profile.avatar}
                    aboutText={textAboutUser}
                    saveUserAvatar={saveUserAvatar}
                    updateAboutText={updateAboutText}
                    id={profile.id}
                />
            </Container>
        )
    }
}

Profile.propTypes = {
    nickname: PropTypes.string,
    aboutText: PropTypes.string,
    avatar: PropTypes.string,
    saveUserAvatar: PropTypes.func,
    updateAboutText: PropTypes.func,
    id: PropTypes.number,
    getProfile: PropTypes.func,
    status: PropTypes.string,
    profile: PropTypes.shape({
            id: PropTypes.number,
            nickname: PropTypes.string,
            avatar: PropTypes.string,
            status: PropTypes.string,
            aboutText: PropTypes.string
    }),
    toggleCurrentAcount: PropTypes.func,
    profileIsDownload: PropTypes.bool
}

const mapStateToProps = (state) => ({
    nickname: state.auth.nickname,
    aboutText: state.auth.aboutText,
    avatar: state.auth.avatar,
    id: state.auth.id,
    profile: state.users.profile,
    status: state.auth.status,
    isYourCurrentProfile: state.users.isYourCurrentProfile,
    profileIsDownload: state.users.profileIsDownload
})



export default compose(
    withStyles(useStyles), 
    connect(mapStateToProps, {
        saveUserAvatar,
        updateAboutText,
        getProfile,
        toggleCurrentAcount,
        setProfile
    }), 
    withRouter,
    withAuthRedirect,
)(Profile);