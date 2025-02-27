import { standalone_routes } from '@/components/shared';
import { useTranslations } from '@deriv-com/translations';
import { PlatformSwitcher as UIPlatformSwitcher, PlatformSwitcherItem } from '@deriv-com/ui';
import { platformsConfig } from '../header-config';
import './platform-switcher.scss';

const PlatformSwitcher = () => {
    const { localize } = useTranslations();

    return (
        <UIPlatformSwitcher
            bottomLinkLabel={localize('Dont have an account? Sign Up, then continue trading on dtraderhub')}
            buttonProps={{
                icon: platformsConfig[1].buttonIcon,
            }}
            bottomLinkProps={{
                href: standalone_routes.signup,
            }}
        >
            {platformsConfig.map(({ active, description, href, icon }) => (
                <PlatformSwitcherItem
                    active={active}
                    className='platform-switcher'
                    description={localize('{{description}}', { description })}
                    href={window.location.search ? `${href}/${window.location.search}` : href}
                    icon={icon}
                    key={description}
                />
            ))}
        </UIPlatformSwitcher>
    );
};

export default PlatformSwitcher;
