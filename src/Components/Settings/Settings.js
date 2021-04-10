import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Paper, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { updateAvatar, updateNickname, deleteAvatar, saveUserAvatar } from '../../redux/authReducer';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';
import SettingsItem from './SettingsItem';
import UpdateAvatar from './UpdataData/UpdateAvatar';
import UpdateNickname from './UpdataData/UpdateNickname';


const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
        maxWidth: 800,
    },
    titleBlock: {
        marginBottom: theme.spacing(3)
    },
    titleIconWrapper: {
        // display: 'flex',
        // justifyContent: 'center'
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    paper: {
        // display: 'flex',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    infoBlock: {
        paddingRight: theme.spacing(3)
    },
    avatarWrapper: {
        marginBottom: theme.spacing(2)
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2)
    },
    list: {
        flex: 1,
    },
    editBlock: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: 0
        }

        this.items = [
            { id: 1, icon: <FaceIcon />, title: "Изменить аватар" },
            { id: 2, icon: <EditIcon />, title: "Изменить никнейм" }
        ]
    }

    setSelectedItem = (id) => {
        this.setState({ currentItem: id });
    }

    renderCurrentForm = (id) => {
        switch (id) {
            case 1: return <>
                <UpdateAvatar 
                    updateAvatar={this.props.updateAvatar}
                    deleteAvatar={this.props.deleteAvatar}
                    saveUserAvatar={this.props.saveUserAvatar}
                    avatar={this.props.avatar}
                />
            </>;
            case 2: return <UpdateNickname 
                    updateNickname={this.props.updateNickname}
                    nickname={this.props.nickname}
                />;
            default: return <></>;
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <Container 
                fixed 
                className={classes.root}
            >
                <TitleTemplate 
                    icon={<SettingsIcon   
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Настройки"
                />
                <Paper className={classes.paper}>
                    <div className={classes.list}>
                        <List
                        >
                            {this.items.map(item => <SettingsItem 
                                isCurrent={this.state.currentItem === item.id ? true : false}
                                key={item.id} 
                                id={item.id}
                                icon={item.icon} 
                                title={item.title} 
                                selectItem={this.setSelectedItem}
                            />)}
                        </List>
                    </div>
                    <div className={classes.editBlock}>
                        {this.renderCurrentForm(this.state.currentItem)}
                    </div>
                </Paper>
            </Container>
        )
    }
}

Settings.propTypes = {
    nickname: PropTypes.string,
    avatar: PropTypes.string,
    updateAvatar: PropTypes.func,
    deleteAvatar: PropTypes.func,
    updateNickname: PropTypes.func,
    saveUserAvatar: PropTypes.func,
}

const mapStateToProps = (state) => ({
    avatar: state.auth.avatar,
    nickname: state.auth.nickname,
})

export default compose(
    withStyles(useStyles), 
    connect(mapStateToProps, {
        updateAvatar,
        updateNickname,
        deleteAvatar,
        saveUserAvatar
    }),
    withAuthRedirect
)(Settings);