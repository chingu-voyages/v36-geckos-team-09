import { Link } from 'react-router-dom';

import '../../styles/navbar.scss';

import { AppBar, Toolbar, Button, Container, ButtonGroup } from '@mui/material';

import { NAVBAR_BUTTONS } from '../../static';

const Navbar = () => {
    return (
        <AppBar className='navbar' position='static'>
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
