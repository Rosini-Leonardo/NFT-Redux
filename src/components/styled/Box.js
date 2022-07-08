import styled from "styled-components";
import {
    space,
    color,
    typography,
    flexbox,
    border,
    grid,
    background,
    layout,
    shadow,
    position,
    compose,
} from 'styled-system';

// Custom Box component
const Box = styled('div')( 
    compose(
        space,
        color,
        typography,
        flexbox,
        border,
        grid,
        background,
        layout,
        shadow,
        position,
    )
);

export default Box;