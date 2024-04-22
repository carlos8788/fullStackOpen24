import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} id={props.buttonId} variant='contained' color='success'>{props.buttonLabel}</Button>
            </div>
            <Box sx={{ '& > :not(style)': { m: 0, p: 1 }, maxWidth: 500 }}>
                <Box style={showWhenVisible} sx={{}}>
                    {props.children}
                    <Button onClick={toggleVisibility} variant='contained' color='warning' sx={{ maxWidth: 484, mt:2 , minWidth:386}} fullWidth>cancel</Button>
                </Box>
            </Box>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Togglable