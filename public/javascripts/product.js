$(function() {
    var Product = Backbone.Model.extend({
        ////////////////////////////////////////////////////////////////
        urlRoot: '/products',
        idAttribute: "_id",
        defaults: {
            "embellishment": false,
            "format": "flat",
            "texture": "plain",
            "envelopestyle": "plain",
            "personalisation": [],
            "prices": {},
            "extras": [],
            "guestaddressing": [],
            "quantity": 20,
            "price": 1.49
        },
        initialize: function() {
            this.on("change", this.calculateCost)
        },
        calculateCost: function() {
            var quantity = this.get("quantity"),
                texture = this.get("texture"),
                embellishment = this.get("embellishment"),
                format = this.get("format"),
                envelopestyle = this.get("envelopestyle"),
                extras = this.get("extras"),
                total;

            var cost_of_tissue_paper = CazCalculate([
                ["tissue_paper", 0.25]
            ])

            var invitation_size = 0.25
            
            if (format == "foldout") {
                invitation_size = 0.5
            }

                var invitation_card = "plain_400"
            if (texture != "plain") {
                invitation_card = texture + "_" + 300;
            }
            
            var cost_per_invitation = CazCalculate([
                    [invitation_card, invitation_size]
                ])
            if (format == "foldout") {
                var cost_per_invitation = CazCalculate([
                    [invitation_card, invitation_size],
                    ["vellum", 0.5]
                ])
            }
          

            // Envelope
            if ((envelopestyle == "plain") || (envelopestyle == "matching")) {
                var envelope_texture = texture + "_" + "paper"
            }
            else if ((envelopestyle == "boxplain") || (envelopestyle == "boxmatching")) {
                if (texture == "plain") {
                    var envelope_texture = "plain_400"
                }
                else {
                    var envelope_texture = texture + "_" + "300"
                }
            }
            var cost_per_envelope = CazCalculate([
                [envelope_texture, 1]
            ])



            // Embellishments
            if (embellishment) {
                if (embellishment == "wrap") {
                    var wrap_texture = texture + "_" + "paper";
                    var cost_per_embellishment = CazCalculate([
                        [wrap_texture, 0.20]
                    ]);

                }
                else {

                    var cost_per_embellishment = CazCalculate([
                        [embellishment, 1]
                    ])

                }
            }
            else {
                var cost_per_embellishment = 0;
            }
            var cost_of_extras = 0;
            extras.forEach(function(extra) {
                if (extra == "rsvps") {
                    cost_of_extras = cost_of_extras + CazCalculate([
                        [invitation_card, 0.125]
                    ]) + cost_of_tissue_paper;
                }

                if (extra == "info") {
                    cost_of_extras = cost_of_extras + CazCalculate([
                        [invitation_card, 0.25]
                    ]) + cost_of_tissue_paper
                }
            })
            var total_cost_each = cost_per_envelope + cost_per_invitation + cost_per_embellishment + cost_of_extras;
        
            var price = this.get("price"),
                guestaddressing = this.get("guestaddressing"),
                total;

            var quantities = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];

            var prices = {};
            if (format == "foldout") {
                price = price + 0.59
            }

            //ENVELOPE STYLE
            if (envelopestyle == "boxplain") {
                price = price + 0.67
            }
            else if (envelopestyle == "matching") {
                price = price + 0.89
            }
            else if (envelopestyle == "boxmatching") {
                price = price + 1.36
            }
            var map;

            // CARD TEXTURE
            if (texture == "linen") {
                price = price + 0.24
            }
            else if (texture == "hammered") {
                price = price + 0.24
            }
            else if (texture == "pearlescent") {
                price = price + 0.44
            }
            else if (texture == "kraft") {
                price = price + 0.44
            }
            else if (texture == "laid") {
                price = price + 0.24
            }

            // EMBELLISHMENT
            if (embellishment == "ribbon") {
                price = price + 0.32
            }
            else if (embellishment == "pearl") {
                price = price + 1.79
            }
            else if (embellishment == "wrap") {
                price = price + 0.17
            }
            else if (embellishment == "acrylic-heart") {
                price = price + 0.57
            } else if (embellishment == "acrylic-rectangle") {
                
                price = price + 0.49
            } else if (embellishment == "diamante-heart") {
                price = price + 1.29
            } else if (embellishment == "diamante-circle") {
                price = price + 1.47
            } else if (embellishment == "diamante-square") {
                price = price + 1.47
            }
            
            extras.forEach(function(extra) {
                if (extra == "rsvps") {
                    price = price + 0.37;
                }
                if (extra == "info") {
                    price = price + 0.49;
                }
                if (extra == "map") {
                    map = true;
                }
                if (extra == "rounded") {
                    price = price + 0.25
                }

            })

            guestaddressing.forEach(function(guest) {
                if (guest == "addressesprinted") {
                    price = price + 0.18;
                }
                if (guest == "namesprinted") {
                    price = price + 0.16;
                }

            })
            var discounts = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
            for (var i = 0, len = quantities.length; i < len; i++) {

                var qty = quantities[i]
                var total = (price * qty)
                if (map) {
                    total = total + 30
                }
                total = total - ((discounts[i] / 100) * total)
                total = total.toFixed(2);
                //split_total = total.toString().split(".")

                //  this.set("pounds", split_total[0]).set("pence", split_total[1]).set("total", total)
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
            this.model.calculateCost();
            this.renderPrices();
        },
        events: {
            "click .choice": "chosen",
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
            var ary = id.split("_");
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
            var $element = $(e.currentTarget);
            var id = $(e.currentTarget).attr('id')
            var box = id.split("_")[0]
            var group = id.split("_")[1]
            var checkBox = $("input[value='" + box + "']");

            $element.toggleClass("selected_choice")
            checkBox.prop("checked", !checkBox.prop("checked"));
            var names = []
            $("input[name='" + group + "']:checked").each(function() {
                names.push($(this).val());
            });
            this.model.set(group, names).trigger("change")
        },
        render: function() {}
    })

    var sv = new StepView({
        model: product
    })
})