import { TextField } from "@material-ui/core"


export const Input = ({ className, placeholder, value, onChange, name, type }) => {
    return (
        <TextField
            fullWidth 
            multiline 
            variant="outlined" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className={className}
            type={type ? type : "text"}
        />
    )
}