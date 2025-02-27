import { DerivLogo, useDevice } from '@deriv-com/ui';
import './app-logo.scss';

export const AppLogo = () => {
    const { isDesktop } = useDevice();

    if (!isDesktop) return null;
    return (
        <a
            className='app-header__logo'
            href='/'
            onClick={e => {
                e.preventDefault();
                window.location.reload();
            }}
        >
            <DerivLogo variant='wallets' />
            <span className='app-header__logo-text'>DENARA</span>
        </a>
    );
};
