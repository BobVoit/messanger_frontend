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
import { getProfile, toggleCurrentAcount } from '../../redux/usersReducer';
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
        console.log(userId);
        if (!userId) {
            this.props.toggleCurrentAcount(true);
            if (!this.props.id) {
                this.props.history.push("/signin");
            }
        } else {
            this.props.toggleCurrentAcount(false);
            this.props.getProfile(userId);
        }
    }

    render() {
        const { classes, nickname, aboutText, saveUserAvatar,
            avatar, updateAboutText, id, status, profile, isYourCurrentProfile } = this.props;
        console.log(profile);
        console.log('isYourCurrentProfile', isYourCurrentProfile);  
        let person = null;
        if (isYourCurrentProfile) {
            person = {
                id, nickname, avatar, status, aboutText  
            }
        } else {
            person = {
                id: profile.id,
                nickname: profile.nickname,
                avatar: profile.avatar,
                aboutText: profile.aboutText,
                status: profile.status
            }
        }

        return (
            <Container fixed className={classes.root}>
                {/* {!profileIsDownload ? (
                    <> */}
                        <TitleTemplate 
                            icon={<PersonIcon 
                                color="secondary"
                                className={classes.titleIcon}
                            />}
                            title="Профиль"
                        />
                        <ProfileInfo 
                            nickname={person.nickname}
                            avatar={person.avatar}
                            aboutText={person.aboutText}
                            saveUserAvatar={saveUserAvatar}
                            updateAboutText={updateAboutText}
                            id={person.id}
                        />
                    {/* </>
                ) : (
                    <Preloader />
                )} */}
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
        toggleCurrentAcount
    }), 
    withRouter,
    withAuthRedirect,
)(Profile);