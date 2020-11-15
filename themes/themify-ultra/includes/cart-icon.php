<?php if ( themify_is_woocommerce_active() && themify_theme_show_area( 'cart_icon' ) ) :?>
	<div class="cart-icon">
		<div class="cart-wrap">
			<a id="cart-icon" href="<?php echo themify_show_slide_cart()?'#slide-cart':wc_get_cart_url(); ?>">
				<i class="icon-shopping-cart">
					<?php echo themify_get_icon('shopping-cart','fa'); ?>
				</i>
				<span></span>
			</a>
		<!-- /.cart-wrap -->
		</div>
	</div>
<?php endif;
