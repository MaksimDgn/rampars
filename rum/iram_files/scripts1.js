window.dataLayer = window.dataLayer || [];

var pixel_id = '';

jQuery( document ).ready(function() {
	jQuery('#scrollup img').mouseover( function(){
		jQuery( this ).animate({opacity: 0.65},100);
	}).mouseout( function(){
		jQuery( this ).animate({opacity: 1},100);
	}).click( function(){
		$('body,html').animate({ scrollTop: 0 }, 800);
		return false;
	});

	jQuery(window).scroll(function(){
		if ( jQuery(document).scrollTop() > 600 ) {
			jQuery('#scrollup').fadeIn('fast');
		} else {
			jQuery('#scrollup').fadeOut('fast');
		}
	});
});

	var delievery_value = 0.00;
	var all_cost_value = 0.00;
	var data_tocreate = '';
	var delievery_var = '';
	var delievery_var_minsk = 0.00;
	var delievery_var_belarus = 0.00;
	var delievery_var_vozim = 0.00;
	var postsum = 0.00;
	var clientsum = 0.00;
	var log = new Array();

	function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands

		var i, j, kw, kd, km;

		// input sanitation & defaults
		if( isNaN(decimals = Math.abs(decimals)) ){
			decimals = 2;
		}
		if( dec_point == undefined ){
			dec_point = ",";
		}
		if( thousands_sep == undefined ){
			thousands_sep = ".";
		}

		i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

		if( (j = i.length) > 3 ){
			j = j % 3;
		} else{
			j = 0;
		}

		km = (j ? i.substr(0, j) + thousands_sep : "");
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
		kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


		return km + kw + kd;
	}


function reload_values( sku ){
	var get_value_qty = parseInt($('#qty-'+sku).val());
	var min_to_dev = 0.00;

	if(get_value_qty < 1)
	{
		get_value_qty = 1;
	}

	form_data = 'sku='+sku+'&qty='+get_value_qty;

	$.ajax({
		url : '/cart/reloadset',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		beforeSend: function(){
			preLoader();
		},
		success: function(response){
			if ( response.count == undefined ){
				showMessage('Ошибка выполнения запроса', 'error');
			} else {
				if(get_value_qty < 1){
					$('#qty-'+sku).val('1');
				}
				else{
					if(response.cost_more_than_one == 0)
					{
						min_to_dev = 6.5;
					}
					else if (response.cost_more_than_one == 1)
					{
						min_to_dev = 3;
					}
					else
					{
						min_to_dev = 0;
					}

					reload_delievery(delievery_var_belarus, delievery_var_vozim, min_to_dev);
					$('#qty-'+sku).val(get_value_qty);
					$('#all-cost_with-dev').text(number_format(delievery_value + parseFloat(response.allcost), 2, ',', '') + ' руб.');
					$('span#cart_size').text(response.count);
					$('#cost-qty-'+sku).text(number_format(parseFloat(response.item), 2, ',', '') + ' руб.');
					$('#all-cost').text(number_format(parseFloat(response.allcost), 2, ',', '') + ' руб.');

				}
			}
		},
		error: function(){
			showMessage('Ошибка выполнения запроса', 'error');
		}
	});

	reload_all_cost();
}

function addToCart( sku, name, image ){
	var input_count = $('#qty');
	var qty = input_count.val();
	if( qty !== undefined ){
		qty = parseInt( qty );
		qty = isNaN( qty ) ? undefined : qty;
	}

	if( qty == undefined ){
		form_data = 'sku='+sku;
	} else {
		form_data = 'sku='+sku+'&qty='+qty;
	}

	$.ajax({
		url : '/cart/set',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		beforeSend: function(){
			preLoader(name, image);
		},
		success: function(response){
			var tt= window.setTimeout(function(){
			if ( response.count == undefined ){
				showMessage('Ошибка выполнения запроса', 'error');
			} else {
				if( response.count !== 0 ){
					$('span#cart_size').text(response.count);
				}
				showMessage('Товар добавлен<br><a href="/cart">Перейти в корзину</a>', 'success');
			}
			}, 1200)
		},
		error: function(){
			showMessage('Ошибка выполнения запроса', 'error');
		}
	});
}

function addToCartMany( sku1, sku2, sku3, name, image ){
		form_data = 'sku1='+sku1+'&sku2='+sku2+'&sku3='+sku3;

	$.ajax({
		url : '/cart/setmany',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		beforeSend: function(){
			preLoader(name, image);
		},
		success: function(response){
			if ( response.count == undefined ){
				showMessage('Ошибка выполнения запроса', 'error');
			} else {
				if( response.count !== 0 ){
					$('span#cart_size').text(response.count);

				}
				showMessage('Товар добавлен<br><a href="/cart">Перейти в корзину</a>', 'success');
			}
		},
		error: function(){
			showMessage('Ошибка выполнения запроса', 'error');
		}
	});
}

function delete_item_from_cart(sku, metrika_name, metrika_price){
	form_data = 'sku='+sku;
	var get_value_qty = parseInt($('#qty-'+sku).val());
	var voz_to_dev = 0.00;
	var bel_to_dev = 0.00;
	var min_to_dev = 0.00;

	$.ajax({
		url : '/cart/deleteitemfromcart',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		beforeSend: function(){
			preLoader();
		},
		success: function(response){
			if ( response.count == undefined ){
				showMessage('Ошибка выполнения запроса', 'error');
			} else {
					if(response.allcost == '0'){
						location.reload();
					}
					else{
						if(get_value_qty == 1){
							var foo = jQuery('#item-'+sku);
							foo.detach();
							jQuery('#sep-'+sku).detach();
						}
						else
						{
							$('#qty-'+sku).val(get_value_qty - 1);
						}

						if((response.deleted_comp == '1') && (response.comp_in_cart == '0'))
						{
							voz_to_dev = 15.00;


							postsum = Math.round((parseFloat(response.allcost)+3.25+1*0.51+(1*0.51)/2+parseFloat(response.allcost)*0.036+1.7)*100)/100;

							if (postsum < 100) {
								clientsum = Math.round((postsum+postsum*0.03) * 100) / 100;
							} else {
								clientsum = Math.round((postsum+postsum*0.01) * 100) / 100;
							}

							bel_to_dev = clientsum - parseFloat(response.allcost);
							if(bel_to_dev > 15.00)
								bel_to_dev = 15.00;


							if(response.cost_more_than_one == 0)
							{
								min_to_dev = 5;
							}
							else if (response.cost_more_than_one == 1)
							{
								min_to_dev = 1;
							}
							else
							{
								min_to_dev = 0;
							}

						}
						else
						{
							voz_to_dev = delievery_var_vozim;
							bel_to_dev = delievery_var_belarus;

							if(response.comp_in_cart == '0')
							{
								if(response.cost_more_than_one == 0)
								{
									min_to_dev = 6.5;
								}
								else if (response.cost_more_than_one == 1)
								{
									min_to_dev = 3;
								}
								else
								{
									min_to_dev = 0;
								}
							}
						}


						reload_delievery(bel_to_dev, voz_to_dev, min_to_dev);

						$('#all-cost_with-dev').text(number_format(delievery_value + parseFloat(response.allcost), 2, ',', '') + ' руб.');
						$('#all-cost').text(number_format(parseFloat(response.allcost), 2, ',', '') + ' руб.');
						all_cost_value = parseFloat(response.allcost);
						$('span#cart_size').text(response.count);
						$('#cost-qty-'+sku).text(number_format(parseFloat(response.item), 2, ',', '') + ' руб.');

					}


					dataLayer.push({
					    "ecommerce": {
					        "remove": {
					            "products": [
					                {
					                    "id": "\"" + sku + "\"",
					                    "name" : "\"" + metrika_name + "\"",
					                    "price": + metrika_price,
					                    "quantity": 1
					                }
					            ]
					        }
					    }
					});


			}

		},
		error: function(){
			showMessage('Ошибка выполнения запроса', 'error');
		}
	});

	reload_all_cost();
}

function preLoader(name, image) {
	var progress_box = $('#progress');
	var message_box = $('#progress .progress-msg');
	var image_done = '<img src="'+image+'">';

	message_box.removeClass('error_box');
	progress_box.show();

	var img = '<img src="/images/frontend/ajax-loader.gif"/>';
	message_box.html(img)
    $('#progress .name').html(name)
    $('#progress .image').html(image_done)

			   .css('left', $(window).width()/2 - message_box.width()/2)
			   .css('top', $(window).height()/2 - message_box.height()/2);
}



function showMessage( message, status ){
	var message_box = $('#progress .progress-msg');
	message_box.removeClass('error_box');

	message_box.html( message );
	if( status == 'error' ){
		message_box.addClass('error_box');
		setTimeout( "$('#progress').hide()", 2000);
	} else {
		setTimeout( "$('#progress').hide()", 1000);
	}
}

function setLocation( url ){
	location.href = url;
}

function create_order(data_tocreate){
		$.ajax({
		url: "/checkout",
		data: data_tocreate + 'key=js',
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			if(response.ok=='Y')
			{
				$('span#cart_size').text('0');
				$('#id_order_cur').text(response.id_order);

				$('#fullname_order_cur').text(response.name);
				$('#phones_order_cur').text(response.phones);
				if(response.email != '')
				{
					$('#email_visible').css('display','block');
					$('#email_order_cur').text(response.email);
				}
				$('#full-cart-viewer').css('display','none');
				$('#cart-success-viewer').css('display','block');

				dataLayer.push({
				   "ecommerce": {
					   "purchase": {
							"actionField": {
								"id" : response.id_order,
								"revenue":  response.revenue,
								"goal_id" : "22216120"
							},
						   "products": response.products
					   }
				   }
			   });

			   // admitad_retag

			    window.ad_order = response.id_order;    // required
			    window.ad_amount = response.total_cart_cost;
			    window.ad_products = response.admitad_cart;

			    window._retag = window._retag || [];
			    window._retag.push({code: "9ce8887cfb", level: 4});
			    (function () {
			        var id = "admitad-retag";
			        if (document.getElementById(id)) {return;}
			        var s = document.createElement("script");
			        s.async = true; s.id = id;
			        var r = (new Date).getDate();
			        s.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//cdn.lenmit.com/static/js/retag.js?r="+r;
			        var a = document.getElementsByTagName("script")[0]
			        a.parentNode.insertBefore(s, a);
			    })();

			   // end admitad_retag

			   // ram tracker

			   // end ram tracker
			}
			else
			{
				alert('Not Responding');
			}
		}
	});
}

function delete_item_from_cart_21_11_2018(sku, metrika_name, metrika_price){
	form_data = 'sku='+sku;
	var get_value_qty = parseInt($('#qty-'+sku).val());
	var voz_to_dev = 0.00;
	var bel_to_dev = 0.00;
	var min_to_dev = 0.00;

	$.ajax({
		url : '/cart/deleteitemfromcart',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		beforeSend: function(){
			preLoader();
		},
		success: function(response){
			if ( response.count == undefined ){
				showMessage('Ошибка выполнения запроса', 'error');
			} else {
					if(response.allcost == '0'){
						location.reload();
					}
					else{
						if(get_value_qty == 1){
							var foo = jQuery('#item-'+sku);
							foo.detach();
							jQuery('#sep-'+sku).detach();
						}
						else
						{
							$('#qty-'+sku).val(get_value_qty - 1);
						}

						if((response.deleted_comp == '1') && (response.comp_in_cart == '0'))
						{
							voz_to_dev = 15.00;


							postsum = Math.round((parseFloat(response.allcost)+3.25+1*0.51+(1*0.51)/2+parseFloat(response.allcost)*0.036+1.7)*100)/100;

							if (postsum < 100) {
								clientsum = Math.round((postsum+postsum*0.03) * 100) / 100;
							} else {
								clientsum = Math.round((postsum+postsum*0.01) * 100) / 100;
							}

							bel_to_dev = clientsum - parseFloat(response.allcost);
							if(bel_to_dev > 15.00)
								bel_to_dev = 15.00;


							if(response.cost_more_than_one == 0)
							{
								min_to_dev = 5;
							}
							else if (response.cost_more_than_one == 1)
							{
								min_to_dev = 1;
							}
							else
							{
								min_to_dev = 0;
							}
						}
						else
						{
							voz_to_dev = delievery_var_vozim;
							bel_to_dev = delievery_var_belarus;
							if(response.comp_in_cart == '0')
							{
								if(response.cost_more_than_one == 0)
								{
									min_to_dev = 6.5;
								}
								else if (response.cost_more_than_one == 1)
								{
									min_to_dev = 3;
								}
								else
								{
									min_to_dev = 0;
								}
							}
						}


						reload_delievery(bel_to_dev, voz_to_dev, min_to_dev);

						$('#all-cost_with-dev').html(number_format(delievery_value + parseFloat(response.allcost), 2, ',', '') + ' руб.');
						$('#all-cost').html(number_format(parseFloat(response.allcost), 2, ',', '') + ' руб.');
						all_cost_value = parseFloat(response.allcost);
						$('span#cart_size').text(response.count);

						var products_array = response.items;
                        var discount_text;
                        var all_discounted;

						for (var products_key in products_array)
						{
							var products_value = products_array [products_key];
							discount_text = "";
                            all_discounted = "";

							if ( products_value.discounted  || products_value.discounted_bel )
							{
								all_discounted = parseFloat(products_value.discounted) * response.rate + parseFloat(products_value.discounted_bel);

								discount_text = number_format( ( parseFloat(products_value.cost) * response.rate + parseFloat(products_value.cost_bel) ), 2, ',', '') + ' руб.' + '<span class=cart_discount>скидка ' + number_format( all_discounted, 2, ',', '') + ' руб.</span>';
								$('#cost-qty-'+products_value.sku).html( discount_text );
							}
							else
							{
								$('#cost-qty-'+products_value.sku).text( number_format( ( parseFloat(products_value.cost) * response.rate + parseFloat(products_value.cost_bel) ), 2, ',', '') + ' руб.');
							}


						}



					}


					dataLayer.push({
					    "ecommerce": {
					        "remove": {
					            "products": [
					                {
					                    "id": "\"" + sku + "\"",
					                    "name" : "\"" + metrika_name + "\"",
					                    "price": + metrika_price,
					                    "quantity": 1
					                }
					            ]
					        }
					    }
					});


			}

		},
		error: function(){
			showMessage('Ошибка выполнения запроса', 'error');
		}
	});

	reload_all_cost();
}


function reload_values_21_11_2018( sku ){
	var get_value_qty = parseInt($('#qty-'+sku).val());
	var min_to_dev = 0.00;

	if(get_value_qty < 1)
	{
		get_value_qty = 1;
	}

	form_data = 'sku='+sku+'&qty='+get_value_qty;

	$.ajax({
		url : '/cart/reloadset',
		type: 'POST',
		dataType: 'json',
		data: form_data,
		beforeSend: function(){
			preLoader();
		},
		success: function(response){
			if ( response.count == undefined ){
				showMessage('Ошибка выполнения запроса', 'error');
			}
			else
			{
				if(get_value_qty < 1)
				{
					$('#qty-'+sku).val('1');
				}
				else
				{
					if(response.cost_more_than_one == 0)
					{
						min_to_dev = 6.5;
					}
					else if (response.cost_more_than_one == 1)
					{
						min_to_dev = 3;
					}
					else
					{
						min_to_dev = 0;
					}
				}

				reload_delievery(delievery_var_belarus, delievery_var_vozim, min_to_dev);
				$('#qty-'+sku).val(get_value_qty);
				all_cost_value = parseFloat(response.allcost);
				$('#all-cost_with-dev').html(number_format(delievery_value + parseFloat(response.allcost), 2, ',', '') + ' руб.');
				$('span#cart_size').text(response.count);
				$('#all-cost').html(number_format(parseFloat(response.allcost), 2, ',', '') + ' руб.');

				var products_array = response.items;
                   var discount_text;
                   var all_discounted;



				for (var products_key in products_array)
				{
					var products_value = products_array [products_key];
					discount_text = "";
     					all_discounted = "";

					if ( products_value.discounted  || products_value.discounted_bel )
					{
						all_discounted = parseFloat(products_value.discounted) * response.rate + parseFloat(products_value.discounted_bel);

						discount_text = number_format( ( parseFloat(products_value.cost) * response.rate + parseFloat(products_value.cost_bel) ), 2, ',', '') + ' руб.' + '<span class=cart_discount>скидка ' + number_format( all_discounted, 2, ',', '') + ' руб.</span>';
						$('#cost-qty-'+products_value.sku).html( discount_text );
					}
					else
					{
						$('#cost-qty-'+products_value.sku).text( number_format( ( parseFloat(products_value.cost) * response.rate + parseFloat(products_value.cost_bel) ), 2, ',', '') + ' руб.');
					}


				}



			}
		},
		error: function(){
			showMessage('Ошибка выполнения запроса', 'error');
		}
	});

	reload_all_cost();
}

