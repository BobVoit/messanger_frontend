import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import TitleTemplate from '../common/TitleTemplate/TitleTemplate';


const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
    titleIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
})

class Friends extends Component {



    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container fixed className={classes.root}>
                <TitleTemplate 
                    icon={<PeopleIcon
                        color="secondary"
                        className={classes.titleIcon}
                    />}
                    title="Друзья"
                />
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default compose(
    withStyles(useStyles),
    withAuthRedirect,
    connect(mapStateToProps, {

    })
)(Friends);