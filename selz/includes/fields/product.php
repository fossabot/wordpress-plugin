<div class="search-form product-search">
    <label for="search" class="sr-only">Query</label>
    <span class="search-control">
        <?php echo file_get_contents(plugins_url( '../../dist/img/svg/zoom.svg?v=' . selz()->version, __FILE__ )); ?>
        <input type="search" id="<?php echo $this-slug; ?>-search-products" name="search" class="input-control input-control--search input-control--small" placeholder="<?php _e( 'Search', $this->lang ); ?>">
    </span>
</div>

<ul class="product-list">
    <!-- Populated via JS -->
</ul>

<div class="product-pager" hidden>
    <button type="button" class="btn-faux-link product-pager__control" data-page="previous" disabled>
        <span>
            <?php echo file_get_contents(plugins_url( '../../dist/img/svg/arrow-left.svg?v=' . selz()->version, __FILE__ )); ?>
            <?php _e( 'Previous', $this->lang ); ?>
        </span>
    </button>
    <button type="button" class="btn-faux-link product-pager__control" data-page="next" disabled>
        <span>
            <?php _e( 'Next', $this->lang ); ?>
            <?php echo file_get_contents(plugins_url( '../../dist/img/svg/arrow-right.svg?v=' . selz()->version, __FILE__ )); ?>
        </span>
    </button>
</div>