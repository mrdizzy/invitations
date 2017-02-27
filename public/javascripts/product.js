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
        this.on("change", this.calculatePrice)
    },
    calculatePrice: function() {
        console.log("calculating price")
        var price = this.get("price"),
            quantity = this.get("quantity"),
            texture = this.get("texture"),
            embellishment = this.get("embellishment"),
            format = this.get("format"),
            envelopestyle = this.get("envelopestyle"),
            extras = this.get("extras"),
            guestaddressing = this.get("guestaddressing"),
            total;

        var quantities = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];
        
        var prices = {};
        if (format == "foldout") {
            price = price + 0.49
        }

        //ENVELOPE STYLE
        if (envelopestyle == "boxplain") {
            price = price + 0.64
        }
        else if (envelopestyle == "matching") {
            price = price + 0.45
        }
        else if (envelopestyle == "boxmatching") {
            price = price + 0.98
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
            price = price + 0.45
        }

        // EMBELLISHMENT
        if (embellishment == "ribbon") {
            price = price + 0.40
        }
        else if (embellishment == "pearl") {
            price = price + 1.49
        }
        else if (embellishment == "wrap") {
            price = price + 0.25
        }
        extras.forEach(function(extra) { 
          if(extra == "rsvps") {
              console.log("yes")
              price = price + 0.25;
          }
          if(extra == "info") {
              price = price + 0.35;
          }
          if(extra == "map") {
              map = true;
          }
            
        })
        
        guestaddressing.forEach(function(guest) { 
          if(guest == "addressesprinted") {
              price = price + 0.10;
          } 
          if(guest == "namesprinted") {
              price = price + 0.07;
          }
            
        })
        var discounts = [0, 2, 4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50]
        for (var i = 0, len = quantities.length; i < len; i++) {

            var qty = quantities[i]
            var total = (price * qty)
            if (map) { total = total + 30 }
            total = total - ((discounts[i]/100) * total)
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
        //  this.listenTo(this.guests, 'change', this._renderQuickGuests)
        this.listenTo(this.model, "change:prices", this.renderPrices)
        this.model.calculatePrice();
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
        this.model.set(group,names).trigger("change")
    },
    render: function() {}
})

var sv = new StepView({
    model: product
})
