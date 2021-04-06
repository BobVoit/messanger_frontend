import React, { Component } from 'react';
import { Typography, OutlinedInput } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    aboutText: {
        textIndent: theme.spacing(2),
        cursor: 'pointer',
        userSelect: 'none',
    },
    emptyAboutText: {
        fontSize: 12,    
    }
})

class TextAboutUser extends Component {
    state = {
        editMode: false,
        aboutText: this.props.aboutText
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateAboutText(this.state.aboutText);
    }

    onAboutTextChange = (e) => {
        this.setState({ aboutText: e.currentTarget.value})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.aboutText !== this.props.aboutText) {  
            this.setState({aboutText: this.props.aboutText});
        }
    }
    
    render() {
        const { aboutText, classes } = this.props;
        return (
            <div>
                <Typography variant="subtitle2">Обо мне:</Typography>
                { !this.state.editMode && this.state.aboutText &&
                    <Typography
                        paragraph
                        component="p"
                        variant="body2"
                        className={classes.aboutText}
                        onDoubleClick={this.activateEditMode}
                    >
                        {aboutText}
                    </Typography>
                }
                { !this.state.editMode && !this.state.aboutText && 
                    <Typography
                        paragraph
                        component="p"
                        variant="body2"
                        className={classes.emptyAboutText + " " + classes.aboutText}
                        onDoubleClick={this.activateEditMode}
                    >
                        Установите информацию о себе
                    </Typography>
                }
                { this.state.editMode && 
                    <OutlinedInput 
                        onChange={this.onAboutTextChange}
                        autoFocus={true} 
                        onBlur={ this.deactivateEditMode }
                        value={this.state.aboutText}
                        fullWidth
                        multiline
                    />
                }
            </div>
        )
    }
}



export default withStyles(useStyles)(TextAboutUser);