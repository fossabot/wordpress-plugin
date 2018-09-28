($ => {
    const formatProducts = product => {
        if (!product.id && !product.title) {
            return 'Searching your products...';
        }

        return `
        <div class="select2-result-product clearfix">
            <div class="select2-result-product__image"><img src='${product.img}'></div>
            <div class="select2-result-product__meta">
                <div class='select2-result-product__title'>${product.title}</div>
                ${product.price && `<div class='select2-result-product__price'>${product.price}</div>`}
            </div>
        </div>
        `;
    };

    const formatProductSelection = product => product.title || product.text;

    $(() => {
        $(document.body).on('updated.modal', event => {
            const { selzvars } = window;
            const $container = $(event.target);

            $container.find('#link').select2({
                ajax: {
                    url: selzvars.ajax_url, // AJAX URL is predefined in WordPress admin
                    dataType: 'json',
                    delay: 250, // delay in ms while typing when to perform a AJAX search
                    data(params) {
                        return {
                            q: params.term, // search query
                            action: 'selz_get_products', // AJAX action for admin-ajax.php
                            nonce: selzvars.nonce,
                            page: params.page || 1,
                        };
                    },
                    processResults(response, params) {
                        params.page = params.page || 1;
                        const options = [];

                        if (response.data) {
                            $.each(response.data, (index, product) => {
                                const image = product.featured_image !== null ? product.featured_image.small : '';

                                options.push({
                                    id: product.short_url,
                                    title: product.title,
                                    img: image,
                                    price: product.price,
                                });
                            });
                        }

                        return {
                            results: options,
                            pagination: {
                                more: response.has_more,
                            },
                        };
                    },
                    cache: true,
                },
                placeholder: 'Select a product',
                minimumInputLength: 3, // the minimum of symbols to input before perform a search
                escapeMarkup(markup) {
                    return markup;
                }, // let our custom formatter work
                templateResult: formatProducts,
                templateSelection: formatProductSelection,
            });
        });
    });
})(jQuery);
