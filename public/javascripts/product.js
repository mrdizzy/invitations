var Product = Backbone.Model.extend({
  ////////////////////////////////////////////////////////////////
  urlRoot: '/products',
  idAttribute: "_id",
  defaults: {

    price: 0.10,
    weight: 200,
  },
  initialize: function() {
    this.guests = this.get("guests")
    this.on("change:weight", this.calculatePrice)
    this.on("change:font", this.saveProduct)
    this.on("change:weight", this.saveProduct)
    this.on("change:colours", this.saveProduct)
    this.on("adjustBaseline", this._adjustBaseline)
    this.on("adjustFontSize", this._adjustFontSize)
    this.on("change:discount", this.calculatePrice)
    this.listenTo(this.guests, "change", this.saveGuests)
    this.listenTo(this.guests, "add", this.saveGuests)
    this.listenTo(this.guests, "add", this.calculatePrice)
    this.listenTo(this.guests, "remove", this.calculatePrice)
    this.listenTo(this.guests, "reset", this.calculatePrice)
    this.listenTo(this.guests, "addMultiple", this.calculatePrice)
    this.listenTo(this.guests, "removeMultiple", this.calculatePrice)
  },

  calculatePrice: function() {
    if(this.get("discount") == "CLAUDIA") {
    this.set("pounds",0).set("pence", "01").set("total", 0.01)
    } else {
    var price,
      quantity = this.quantity(),
      total;
    if (quantity > 7 && quantity < 17) {
      price = 0.50
    }
    else if (quantity > 15 && quantity < 25) {
      price = 0.40
    }
    else if (quantity > 23 && quantity < 33) {
      price = 0.35
    }
    else if (quantity > 31 && quantity < 41) {
      price = 0.34
    }
    else if (quantity > 39 && quantity < 49) {
      price = 0.33
    }
    else if (quantity > 47 && quantity < 57) {
      price = 0.32
    }
    else if (quantity > 55 && quantity < 65) {
      price = 0.31
    }
    else if (quantity > 63 && quantity < 73) {
      price = 0.30
    }
    else if (quantity > 71 && quantity < 81) {
      price = 0.29
    }
    else if (quantity > 79 && quantity < 89) {
      price = 0.28
    }
    else if (quantity > 87 && quantity < 97) {
      price = 0.27
    }
    else if (quantity > 95) {
      price = 0.26
    }
    if (this.get("weight") == 300) {
      price = price + 0.05;
    }
    if (quantity < 8) {
      total = 0.50 * 8
    }
    else {
      total = price * quantity;
    }
    total = total.toFixed(2);
    split_total = total.toString().split(".")

    this.set("pounds", split_total[0]).set("pence", split_total[1]).set("total", total)
    }
  },
  makePurchase: function() {
    var discount = this.get("discount");
    if(discount == "CLAUDIA") {
      this.set("total", "0.01")
    }
    $.form('/payments', {
  "object": JSON.stringify(this.toJSON()),
  "L_PAYMENTREQUEST_0_AMT0": this.get("total"),
  "PAYMENTREQUEST_0_AMT":this.get("total"),
  "L_PAYMENTREQUEST_0_QTY0": 1,
  "L_PAYMENTREQUEST_0_NAME0": this.get("name"),
  "L_PAYMENTREQUEST_0_DESC0": this.quantity() + " Place cards"
}).submit();
  // if (this.quantity() > 7) {
  //   $.form('/payments', {
  //     "object": JSON.stringify(this.toJSON()),
  //     "L_PAYMENTREQUEST_0_AMT0": (this.get("total") / this.quantity()).toFixed(2),
  //     "PAYMENTREQUEST_0_AMT":(this.get("total") * 1).toFixed(2),
  //     "L_PAYMENTREQUEST_0_QTY0": this.quantity(),
  //     "L_PAYMENTREQUEST_0_NAME0": this.get("name"),
  //     "L_PAYMENTREQUEST_0_DESC0": "Place cards"
  //   }).submit();
  // }
  // else {
  //   var price_each = (this.get("total") / 8).toFixed(2);
  //   var qty = this.quantity();
  //   var place_cards_total = price_each * this.quantity();
  //   var minimum_charge = this.get("total") - place_cards_total;
  //   $.form('/payments', {
  //     "object": JSON.stringify(this.toJSON()),
  //     "L_PAYMENTREQUEST_0_AMT0": price_each,
  //     "PAYMENTREQUEST_0_AMT": (this.get("total") * 1).toFixed(2),
  //     "L_PAYMENTREQUEST_0_QTY0": this.quantity(),
  //     "L_PAYMENTREQUEST_0_NAME0": this.get("name"),
  //     "L_PAYMENTREQUEST_0_DESC0": "Place cards",
  //     "L_PAYMENTREQUEST_0_AMT1": minimum_charge,
  //     "L_PAYMENTREQUEST_0_QTY1": 1,
  //     "L_PAYMENTREQUEST_0_NAME1": "Charge",
  //     "L_PAYMENTREQUEST_0_DESC1": "Minimum handling charge"
  //   }).submit();
  // }
  },
});
