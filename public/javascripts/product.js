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
      "quantity": 20,
      "price": 1.49
    },
    initialize: function() {
        this.on("change", this.calculatePrice)
    },
    calculatePrice: function() {
      var price = this.get("price"),
          quantity = this.get("quantity"),
          texture = this.get("texture"),
          embellishment = this.get("embellishment"),
          format = this.get("format"),
          envelopestyle = this.get("envelopestyle"),
          total;

      var quantities =  [20,25,30,35,40,45,50,55,60,65,70,75, 80,90,100,110,120,130,140,150,160,170];

 var prices = {};
           if(format == "foldout") {
            price = price + 0.49
          }
            if(envelopestyle == "boxplain") {
              price = price + 0.50
            } else if(envelopestyle == "matching") {
              price = price + 0.35
            } else if (envelopestyle =="boxmatching") {
                price = price + 0.85
            }

            if(texture == "linen") {
                price = price + 0.15
            } else if (texture == "hammered") {

                  price = price + 0.15
            } else if (texture == "pearlescent") {

                  price = price + 0.35
            }



            if(embellishment == "ribbon") {
                price = price + 0.35
            } else if (texture == "pearl") {

                  price = price + 1.11
            } else if (texture == "wrap") {

                  price = price + 0.25
            }

            for (var i = 0, len = quantities.length; i < len; i++) {

            var qty = quantities[i]
            var total = (price * qty)
             total =  total.toFixed(2);
        //split_total = total.toString().split(".")

        //  this.set("pounds", split_total[0]).set("pence", split_total[1]).set("total", total)
          prices[qty] = total;
          }
          this.set("prices", prices)
          console.log(prices)

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
        this.render();
    },
    events: {
        "click .choice": "chosen",
        "click .checkbox_choice": "checkboxChosen",
        "click .quantity_box": "chooseQuantity"
    },
    renderPrices: function() {
      var current_prices = this.model.get("prices")


var quantities =  [20,25,30,35,40,45,50,55,60,65,70,75, 80,90,100,110,120,130,140,150,160,170];
      for (var i = 0, len = quantities.length; i < len; i++) {
        $('#grand_total_' + quantities[i]).text("£" + current_prices[quantities[i]])
      }},
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
        var $checkbox = $(":checkbox[name='" + id + "']")

        $checkbox.prop("checked", !$checkbox.is(":checked"))
    },

    render: function() {}
})

var sv = new StepView({
    model: product
})