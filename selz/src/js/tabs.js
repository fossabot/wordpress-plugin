($ => {
    class Tabs {
        constructor() {
            this.selectors = {
                container: '.js-tab-container',
                tab: '[role="tab"]',
                panel: '[role="tabpanel"]',
            };
        }

        show($tab) {
            const $container = $tab.parents(this.selectors.container);
            const $tabpanel = $(`#${$tab.attr('aria-controls')}`);

            // Deselect all the tabs
            $(this.selectors.tab, $container).attr('aria-selected', 'false');

            // Select this tab
            $tab.attr('aria-selected', 'true');

            // Hide all the panels
            $(this.selectors.panel, $container).attr('aria-hidden', 'true');

            // Show our panel
            $tabpanel.attr('aria-hidden', 'false');
        }

        handleClick(event) {
            // Prevent default
            event.preventDefault();

            // Show the tab
            this.show($(event.target));
        }

        handleKey(event) {
            if (![37, 39].includes(event.which)) {
                return;
            }

            const $current = $(event.target);
            const isSelected = $current.attr('aria-selected') === 'true';

            // If focused element is selected
            if (isSelected) {
                const $item = $current.parent('li')[event.which === 39 ? 'next' : 'prev']('li');
                const $target = $item.find(this.selectors.tab);

                if ($target) {
                    // Shift focus
                    $target.focus();

                    // Show the tab
                    this.show($target);
                }
            }
        }

        build() {
            const selector = `${this.selectors.container} ${this.selectors.tab}`;

            $(document.body)
                .on('click', selector, event => {
                    this.handleClick(event);
                })
                .on('keydown', selector, event => {
                    this.handleKey(event);
                });
        }
    }

    $(() => {
        const tabs = new Tabs();

        tabs.build();
    });
})(jQuery);
