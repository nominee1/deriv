import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Text from '@/components/shared_ui/text';
import { useStore } from '@/hooks/useStore';
import { LabelPairedChevronDownMdFillIcon } from '@deriv/quill-icons/LabelPaired';
import { localize } from '@deriv-com/translations';
import { useDevice } from '@deriv-com/ui';
import { rudderStackSendOpenEvent } from '../../../analytics/rudderstack-common-events';
import ToolbarButton from '../toolbar/toolbar-button';
import SearchBox from './search-box';
import { ToolboxItems } from './toolbox-items';

const Toolbox = observer(() => {
    const { isDesktop } = useDevice();
    const { toolbox, flyout, quick_strategy } = useStore();
    const {
        hasSubCategory,
        is_search_loading,
        onMount,
        onSearch,
        onSearchBlur,
        onSearchClear,
        onSearchKeyUp,
        onToolboxItemClick,
        onToolboxItemExpand,
        onUnmount,
        sub_category_index,
        toolbox_dom,
    } = toolbox;

    const { setFormVisibility } = quick_strategy;
    const { setVisibility, selected_category } = flyout;

    const toolbox_ref = React.useRef(ToolboxItems());
    const [is_open, setOpen] = React.useState(true);

    React.useEffect(() => {
        onMount(toolbox_ref);
        return () => onUnmount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuickStrategyOpen = () => {
        setFormVisibility(true);
        // send to rs if quick strategy is opened from bot builder (desktop)
        rudderStackSendOpenEvent({
            subpage_name: 'bot_builder',
            subform_source: 'bot_builder',
            subform_name: 'quick_strategy',
        });
    };

    if (isDesktop) {
        return (
            <div className='db-toolbox' data-testid='dashboard__toolbox'>
                <ToolbarButton
                    popover_message={localize('Click here to start trading with denara AI strategies.')}
                    button_id='db-toolbar__get-started-button'
                    button_classname='toolbar__btn toolbar__btn--icon toolbar__btn--start'
                    buttonOnClick={handleQuickStrategyOpen}
                    button_text={localize('Denara Bots & $trategies')} // Denara Bots & Strategies
                />
                <div id='gtm-toolbox' className='db-toolbox__content'>
                    <div className='db-toolbox__header'>
                        <div
                            className='db-toolbox__title'
                            data-testid='db-toolbox__title'
                            onClick={() => {
                                setOpen(!is_open);
                                setVisibility(false);
                            }}
                        >
                            {localize('Blocks menu')}
                            <span
                                className={classNames('db-toolbox__title__chevron', {
                                    'db-toolbox__title__chevron--active': is_open,
                                })}
                            >
                                <LabelPairedChevronDownMdFillIcon fill='var(--text-general)' />
                            </span>
                        </div>
                    </div>
                    <div
                        className={classNames('db-toolbox__content-wrapper', { active: is_open })}
                        data-testid='db-toolbox__content-wrapper'
                    >
                        <SearchBox
                            is_search_loading={is_search_loading}
                            onSearch={onSearch}
                            onSearchBlur={onSearchBlur}
                            onSearchClear={onSearchClear}
                            onSearchKeyUp={onSearchKeyUp}
                        />
                        <div className='db-toolbox__category-menu'>
                            {toolbox_dom &&
                                Array.from(toolbox_dom.childNodes as HTMLElement[]).map((category, index) => {
                                    if (category.tagName.toUpperCase() === 'CATEGORY') {
                                        const has_sub_category = hasSubCategory(category.children);
                                        const is_sub_category_open = sub_category_index.includes(index);
                                        return (
                                            <div
                                                key={`db-toolbox__row--${category.getAttribute('id')}`}
                                                className={classNames('db-toolbox__row', {
                                                    'db-toolbox__row--active':
                                                        selected_category?.getAttribute('id') === category?.id,
                                                })}
                                            >
                                                <div
                                                    className='db-toolbox__item'
                                                    onClick={() => {
                                                        // eslint-disable-next-line no-unused-expressions
                                                        has_sub_category
                                                            ? onToolboxItemExpand(index)
                                                            : onToolboxItemClick(category);
                                                    }}
                                                >
                                                    <div className='db-toolbox__category-text'>
                                                        <div className='db-toolbox__label'>
                                                            {localize(category.getAttribute('name') as string)}
                                                        </div>
                                                        {has_sub_category && (
                                                            <div
                                                                className={classNames('db-toolbox__category-arrow', {
                                                                    'db-toolbox__category-arrow--active':
                                                                        is_sub_category_open,
                                                                })}
                                                            >
                                                                <LabelPairedChevronDownMdFillIcon fill='var(--text-general)' />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {has_sub_category &&
                                                    is_sub_category_open &&
                                                    (Array.from(category.childNodes) as HTMLElement[]).map(
                                                        subCategory => {
                                                            return (
                                                                <div
                                                                    key={`db-toolbox__sub-category-row--${subCategory.getAttribute(
                                                                        'id'
                                                                    )}`}
                                                                    className={classNames(
                                                                        'db-toolbox__sub-category-row',
                                                                        {
                                                                            'db-toolbox__sub-category-row--active':
                                                                                selected_category?.getAttribute(
                                                                                    'id'
                                                                                ) === subCategory?.id,
                                                                        }
                                                                    )}
                                                                    onClick={() => {
                                                                        onToolboxItemClick(subCategory);
                                                                    }}
                                                                >
                                                                    <Text size='xxs'>
                                                                        {subCategory.getAttribute('name') as string}
                                                                    </Text>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
});

export default Toolbox;
