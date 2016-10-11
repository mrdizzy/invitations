var Product = Backbone.Model.extend({
    ////////////////////////////////////////////////////////////////
    urlRoot: '/products',
    idAttribute: "_id",

    initialize: function() {
        this.listenTo(this.model, "change", this.calculatePrice)
    },

    calculatePrice: function() {
        var price,
            quantity = this.quantity(),
            total;

        total = total.toFixed(2);
        split_total = total.toString().split(".")

        this.set("pounds", split_total[0]).set("pence", split_total[1]).set("total", total)

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
        this.listenTo(this.guests, 'change', this._renderQuickGuests)
        this.render();
    },
    events: {
        "click .choice": "chosen"
    },
    chosen: function(e) {
      var $element = $(e.currentTarget);
      var id = $(e.currentTarget).attr('id')
      var ary = id.split("_");
      var option = ary[0];
      var choice = ary[1];
      $('.'+ 'choice_' + option).removeClass("selected_choice")
      $element.addClass("selected_choice")
      $("input:radio[name='" + option + "']").each(function(i) {
       this.checked = false;
       $(":radio[value='" + choice + "']").prop("checked", true)
});
    },
    radioPressed: function(e) {
      console.log($(e.currentTarget).attr('name'));
    },
    // When the guests entry textarea is selected we add a class to the root element to enable us to detect that it
    // has been focused and therefore make adjustments to the layout for mobile devices that do not have enough
    // screen space when the onscreen keyboard appears


    render: function() {
    }
})

var sv = new StepView({
    model: product
})
