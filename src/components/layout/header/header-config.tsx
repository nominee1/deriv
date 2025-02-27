import { ReactNode } from 'react';
import { standalone_routes } from '@/components/shared';
import {
    LegacyCashierIcon as CashierLogo,
    LegacyHomeNewIcon as TradershubLogo,
    LegacyReportsIcon as ReportsLogo,
    LegacyTelegramIcon,
} from '@deriv/quill-icons/Legacy';
import {
    DerivProductBrandLightDerivBotLogoWordmarkIcon as DerivBotLogo,
    DerivProductBrandLightDerivTraderLogoWordmarkIcon as DerivTraderLogo,
    PartnersProductBrandLightSmarttraderLogoWordmarkIcon as SmarttraderLogo,
} from '@deriv/quill-icons/Logo';
import { localize } from '@deriv-com/translations';
import { SocialTiktokBrandIcon, SocialYoutubeBlackIcon, StandaloneWhatsappIcon } from '@deriv/quill-icons';
import { MarketIcon } from '@/components/market/market-icon';

export type PlatformsConfig = {
    active: boolean;
    buttonIcon: ReactNode;
    description: string;
    href: string;
    icon: ReactNode;
    showInEU: boolean;
};

export type MenuItemsConfig = {
    as: 'a' | 'button';
    href: string;
    icon: ReactNode;
    label: string;
};

export type TAccount = {
    balance: string;
    currency: string;
    icon: React.ReactNode;
    isActive: boolean;
    isEu: boolean;
    isVirtual: boolean;
    loginid: string;
    token: string;
    type: string;
};

export const platformsConfig: PlatformsConfig[] = [
    // {
    //     active: false,
    //     buttonIcon: <DerivTraderLogo height={25} width={114.97} />,
    //     description: localize('A whole new trading experience on a powerful yet easy to use platform.'),
    //     href: standalone_routes.trade,
    //     icon: <DerivTraderLogo height={32} width={148} />,
    //     showInEU: true,
    // },
    {
        active: true,
        buttonIcon: <DerivBotLogo height={25} width={94} />,
        description: localize('Follow Us on Tiktok, be up to date with our latest trading videos'),
        href: standalone_routes.tiktok,
        icon: <SocialTiktokBrandIcon height={32} width={121} />,
        showInEU: false,
    },
    {
        active: true,
        buttonIcon: <DerivBotLogo height={25} width={94} />,
        description: localize('Join Our Official Telegram Channel'),
        href: standalone_routes.yoo,
        icon: <LegacyTelegramIcon height={32} width={121} />,
        showInEU: false,
    },
    {
        active: false,
        buttonIcon: <SocialYoutubeBlackIcon height={24} width={115} />,
        description: localize('Subscibe to our youtube for trading and analysistutorials.'),
        href: standalone_routes.youtube,
        icon: <SocialYoutubeBlackIcon height={32} width={153} />,
        showInEU: false,
    },
];

export const TRADERS_HUB_LINK_CONFIG = {
    // as: 'a',
    // href: standalone_routes.traders_hub,
    // icon: <TradershubLogo iconSize='xs' />,
    // label: "Trader's Hub",
};

export const MenuItems: MenuItemsConfig[] = [
    // {
    //     as: 'a',
    //     href: standalone_routes.reports,
    //     icon: <ReportsLogo iconSize='xs' />,
    //     label: localize('Reports'),
    // },
    // {
    //     as: 'a',
    //     href: standalone_routes.cashier,
    //     icon: <CashierLogo iconSize='xs' />,
    //     label: localize('Cashier'),
    // },
];
