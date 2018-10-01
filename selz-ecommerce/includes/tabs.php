<nav class="nav-tabs">
    <ul role="tablist">
        <li class="active">
            <a href="#<?php echo $this->slug; ?>-general" id="<?php echo $this->slug; ?>-tab-general" role="tab" aria-controls="<?php echo $this->slug; ?>-general<?php echo $id ?>" aria-selected="true">
                <?php _e( 'General', $this->lang ); ?>
            </a>
        </li>
        <li data-type="button,widget">
            <a href="#<?php echo $this->slug; ?>-product" id="<?php echo $this->slug; ?>-tab-product" role="tab" aria-controls="<?php echo $this->slug; ?>-product<?php echo $id ?>" aria-selected="false">
                <?php _e( 'Product', $this->lang ); ?>
            </a>
        </li>
        <li>
            <a href="#<?php echo $this->slug; ?>-colors" id="<?php echo $this->slug; ?>-tab-colors" role="tab" aria-controls="<?php echo $this->slug; ?>-colors<?php echo $id ?>" aria-selected="false">
                <?php _e( 'Colors', $this->lang ); ?>
            </a>
        </li>
    </ul>
</nav>