import { Link } from 'react-router-dom';

import { NAVBAR_BUTTONS } from '../../utils-static/static';

import '../../styles/navbar.scss';
import { AppBar, Toolbar, Button, Container, ButtonGroup } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar className='navbar' position='static' elevation={0}>
            <Container>
                <Toolbar className='navbar__toolbar'>
                    <ButtonGroup
                        className='navbar__btn-grp'
                        color='secondary'
                        size='large'
                        aria-label='large secondary button group'
                    >
                        {NAVBAR_BUTTONS.map((button) => (
                            <Button className='navbar__btn' key={button.id}>
                                <Link className='navbar__link' to={button.link}>
                                    {button.text}
                                </Link>
                            </Button>
                        ))}
                    </ButtonGroup>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
