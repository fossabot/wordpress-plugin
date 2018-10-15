($ => {
    const noop = () => {};

    class Request {
        constructor(request, callback = noop, fail = noop) {
            this.request = request;
            this.timestamp = Date.now();
            this.callback = callback;
            this.fail = fail;
        }

        send() {
            $.ajax(this.request)
                .then((...args) => this.callback(this, ...args))
                .fail((...args) => this.fail(this, ...args));
        }
    }

    class Page {
        constructor(page, start, end) {
            this.number = page;
            this.start = start;
            this.end = end;
        }
    }

    class ProductList {
        constructor($element, namespace, options) {
            this.config = $.extend(
                true,
                {
                    limit: 50,
                    classNames: {
                        landscape: 'is-landscape',
                        portrait: 'is-portrait',
                        square: 'is-square',
                        loading: 'is-loading',
                    },
                },
                options,
            );

            this.$element = $element;
            this.namespace = namespace;
            this.$list = $element.find('.product-list');
            this.$search = $element.find('[type="search"]');
            this.$pager = $element.find('.product-pager');
            this.$previous = this.$pager.find('[data-page="previous"]');
            this.$next = this.$pager.find('[data-page="next"]');
            this.searchTimer = null;
            this.inputName = $element.data('input-name');
            this.selected = $element.data('selected');
            this.defaultImage = $element.data('default-image');
            this.request = null;

            // Pagination
            this.resetPager();

            // Searching
            this.query = null;

            // Browsing
            this.last = null;

            this.listeners();
        }

        get searching() {
            return Boolean($.type(this.query) === 'string' && this.query.length);
        }

        listeners() {
            this.$search.on('input', event => {
                window.clearTimeout(this.searchTimer);

                this.searchTimer = window.setTimeout(() => {
                    this.query = $(event.target).val();

                    this.resetPager();

                    this.fetch();
                }, 500);
            });

            this.$list.on('input', ':radio', () => {
                this.selected = this.$list.find(':checked').val();
            });

            this.$previous.on('click', () => this.previous());

            this.$next.on('click', () => this.next());
        }

        loadImages() {
            const getClassName = $image => {
                const image = $image.get(0);
                const width = image.naturalWidth;
                const height = image.naturalHeight;

                if (!width || !height) {
                    return '';
                }

                if (width > height) {
                    return this.config.classNames.landscape;
                }

                if (height > width) {
                    return this.config.classNames.portrait;
                }

                if (height === width) {
                    return this.config.classNames.square;
                }

                return '';
            };

            const show = $image => $image.addClass(getClassName($image)).removeClass(this.config.classNames.loading);

            this.$list.find('img').each((index, element) => {
                const $image = $(element);

                if ($image.is(':loaded')) {
                    show($image);
                } else {
                    $image.on('load error', () => show($image));
                }
            });
        }

        map(products) {
            // Handle no results
            if (!products || !products.length) {
                const message = this.searching ? 'No matches found' : 'No products found';
                return `<li class="padding-6 text-center color-light">${message}</li>`;
            }

            // Map products to list items
            return products
                .map(product => {
                    let image = '';

                    if (product.featured_image) {
                        image = product.featured_image.small;
                    } else {
                        image = this.defaultImage;
                    }

                    const className = 'media-ratio-1-1 media-placeholder product-image';
                    const { loading } = this.config.classNames;

                    const name = this.inputName;
                    const value = product.short_url;
                    const checked = this.selected === value ? 'checked' : '';

                    return `
                        <li>
                            <label class="product-list-item">
                                <input type="radio" name="${name}" value="${value}" required ${checked}>
                                <span class="${className}" role="presentation">
                                    <img src='${image}' alt='' class="${loading}">
                                </span>
                                <span class="product-info">
                                    ${product.title}
                                </span>
                            </button>
                        </li>
                    `;
                })
                .join('');
        }

        render() {
            this.$list.html(this.map(this.products));

            // Fade in images
            this.loadImages();

            // Setup pager
            this.$pager.attr('hidden', !this.hasMore && this.page.number === 1);
            this.$next.attr('disabled', !this.hasMore);
            this.$previous.attr('disabled', this.page.number === 1);

            this.$list.trigger('updated.products');
        }

        previous() {
            const previous = this.pages[this.page.number - 1];

            if (!previous) {
                return;
            }

            this.start = previous.start;
            this.page = previous;

            this.fetch();
        }

        next() {
            this.start = this.page.end;
            this.page = new Page(this.page.number + 1);

            this.fetch();
        }

        resetPager() {
            this.start = null;
            this.page = new Page(1);
            this.pages = {};
            this.hasMore = false;
        }

        fetch() {
            const { ajaxurl } = window;

            if ($.type(ajaxurl) !== 'string' || !ajaxurl.length) {
                return;
            }

            // Set the loading state
            this.$list.html(`
                <li class="padding-6 text-center">
                    <span class="loader" aria-hidden="true"></span>
                    <p class="margin-0 margin-top-2 color-light">Loading&hellip;</p>
                <li>
            `);

            // Hide pager while loading
            this.$pager.attr('hidden', true);

            // We don't know if there's more results yet so assume no...
            /* this.$next.attr('disabled', true);

            // No previous if we're on page 1
            if (this.page.number === 1) {
                this.$previous.attr('disabled', true);
            } */

            // Initiate a new request
            this.request = new Request(
                {
                    url: ajaxurl,
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        action: `${this.namespace}_${this.searching ? 'search' : 'get'}_products`,
                        starting_after: this.page.number !== 1 ? this.start : null,
                        page: this.page.number,
                        q: this.query,
                    },
                },
                (request, response) => {
                    // If there was no response
                    if (!response) {
                        return;
                    }

                    // Only re-render for the most recent request
                    if (request.timestamp !== this.request.timestamp) {
                        return;
                    }

                    this.products = response.data;
                    this.hasMore = response.has_more;

                    if (this.products && this.products.length) {
                        this.page.start = this.products[0].id;
                        this.page.end = this.products[this.products.length - 1].id;
                    }

                    // Add to registry
                    this.pages[this.page.number] = this.page;

                    this.render();
                },
                () => {
                    this.$list.html(
                        '<li class="padding-6 text-center color-light">Failed to load products. Please try again.</li>',
                    );
                },
            );

            this.request.send();
        }
    }

    window.PluginProductList = ProductList;
})(jQuery);