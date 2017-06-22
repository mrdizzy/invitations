$(function() {
    var Product = Backbone.Model.extend({
        ////////////////////////////////////////////////////////////////
        urlRoot: '/products',
        idAttribute: "_id",
        defaults: {
            "card_format": "A6_Flat",
            "card_texture": "Plain_lightweight",
            "envelope_style": "Plain",
            "personalisation": [],
            "prices": {},
            "extras": [],
            "guest_personalisation": [],
            "quantity": 20,
            "price": 1.49
        },
        initialize: function() {
            this.on("change", this.calculatePrice)
        },
        calculatePrice: function() {
            var prices = {};
          var options = Object.keys(caz_options)
          var price = this.get("price")
          var that = this;
          var direction_map=0;
          options.forEach(function(option) {
                   var choice = that.get(option);
            if((option == "guest_personalisation") || (option == "extras")) {
              if(choice) {
                choice.forEach(function(achoice) {
                  if (achoice == "Direction_map") {
                    direction_map = 25
                  } else {
                  cost = caz_options[option][achoice]["cost"]
                  price= price + cost
                  }
                })
              }
            }
            else {
                   if(choice) {
                     var cost = caz_options[option][choice]["cost"];
                     price = price + cost;
                   }
            }
          })
          
           var quantities = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];

            var discounts = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
            for (var i = 0, len = quantities.length; i < len; i++) {

                var qty = quantities[i]
                var total = (price * qty)
              // if (map) {
              //     total = total + 30
              // }
                total = total - ((discounts[i] / 100) * total) + direction_map
                total = total.toFixed(2);
                prices[qty] = total;
            }
            this.set("prices", prices)
        },
        makePurchase: function() {
            var discount = this.get("discount");

            $.form('/payments', {
                "object": JSON.stringify(this.toJSON()),
                "L_PAYMENTREQUEST_0_AMT0": this.get("total"),
                "PAYMENTREQUEST_0_AMT": this.get("total"),
                "L_PAYMENTREQUEST_0_QTY0": 1,
                "L_PAYMENTREQUEST_0_NAME0": this.get("name"),
                "L_PAYMENTREQUEST_0_DESC0": this.quantity() + " Place cards"
            }).submit();
        }
    });

    var product = new Product();
    // STEP VIEW
    //////////////////////////////////////////////////////////////////////////////
    var StepView = Backbone.View.extend({
        el: '#steps',
        initialize: function() {
            this.listenTo(this.model, "change:prices", this.renderPrices)
            this.model.calculatePrice();
            this.renderPrices();
        },
        events: {
            "click .radio_choice": "chosen",
            "click .checkbox_choice": "checkboxChosen",
            "click .quantity_box": "chooseQuantity",
        },
        renderPrices: function() {
            var current_prices = this.model.get("prices")

            var quantities = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];
            for (var i = 0, len = quantities.length; i < len; i++) {
                $('#grand_total_' + quantities[i]).text("£" + current_prices[quantities[i]])
            }
        },
        chooseQuantity: function(e) {
            var $element = $(e.currentTarget);
            var id = $(e.currentTarget).attr('id')
            var ary = id.split("_");
            var quantity = ary[1];
            $('.quantity_box').removeClass("selected_choice")
            $element.addClass("selected_choice")
            this.model.set("quantity", quantity)
        },
        chosen: function(e) {
            var $element = $(e.currentTarget);
            var id = $(e.currentTarget).attr('id')
            var ary = id.split("-");
            var option = ary[0];
            var choice = ary[1];
            $('.' + 'choice_' + option).removeClass("selected_choice")
            $element.addClass("selected_choice")
            $("input:radio[name='" + option + "']").each(function(i) {
                this.checked = false;
                $(":radio[value='" + choice + "']").prop("checked", true)
            });
            this.model.set(option, choice)
        },
        checkboxChosen: function(e) {
            if(!$(e.currentTarget).attr("disabled")) {
            var $element = $(e.currentTarget);
            var id = $(e.currentTarget).attr('id')
            var option = id.split("-")[0]
            var choice = id.split("-")[1]
            var checkBox = $("input[value='" + choice + "']");

            $element.toggleClass("selected_choice")
            checkBox.prop("checked", !checkBox.prop("checked"));
            var names = []
            $("input[name='" + option + "']:checked").each(function() {
                names.push($(this).val());
            });
            this.model.set(option, names).trigger("change")
            }
        },
        render: function() {}
    })

    var sv = new StepView({
        model: product
    })
})