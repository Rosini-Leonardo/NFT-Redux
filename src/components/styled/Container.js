import styled from "styled-components";
import{
    space,
    layout,
    background,
    position,
    border,
    compose,
    variant,
} from 'styled-system';

const Container = styled("div")(
    variant({ 
        prop:"size", // change the size 
        
        variants:{ // define styled variants
            fullWidth:{ maxWidth:"100%", width:"100%" },
            xl:{ maxWidth:"1140px", width:"calc(100% - 48px)" },
            md:{ maxWidth:"768px", width:"calc(100% - 24px)" },
            sm:{ maxWidth:"568px", width:"calc(100% - 12px)" },
            xs:{ maxWidth:"440px", width:"calc(100% - 6px)" }
        }
    }),
    
    compose(
        space,
        layout,
        background,
        border,
        position,
    )
);

// Set default property to Container
Container.defaultProps = {
    size:'xl',
    ml:'auto',
    mr:'auto'
};


export default Container;