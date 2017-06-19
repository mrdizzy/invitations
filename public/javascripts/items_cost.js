var caz_items = {
        "glue_dots": {
          "quantity": 200,
          "price": 1,
        },
        "box_card": { // ebay craft creations
          quantity: 75,
          price: 8.99
        },
        "ribbon": {
          "quantity": 40,
          "price": 1.95
        },
        "pearlescent_300": {
          "quantity": 100,
          "price": 25.90,
          "supplier": "papercard.co.uk",
          "weight":300,
          "url":"https://www.papercard.co.uk/a4_curious_metallics_ice_silver_irridescent_card_300gsm"
        },
        "pearlescent_paper": {
          "quantity": 100,
          "price": 21.60,
          "supplier": "papercard.co.uk",
          "weight": 120,
          "url": "https://www.papercard.co.uk/a4_curious_metallics_ice_silver_irridescent_paper_120gsm"
        },
        "plain_400": {
          "quantity": 100,
          "price": 16.80
        },
        "plain_200": {
          "quantity": 30,
          "price": 1
        },
          "plain_paper": {
            "quantity":500,
            "price":13.90
          }
        ,
        "tissue_paper": {
          "quantity":500,
          "price": 7.95
        },
        "vellum": {
          "quantity": 500,
          "price": 25.70
        },
        "diamante-heart": {
          "quantity": 50,
          "price": 8.99
        },
        "diamante-circle": {
          "quantity": 50,
          "price": 16.60
        },
        "diamante-square": {
          "quantity": 50,
          "price": 16.60
        },
        "acrylic-rectangle": {
          "quantity": 100,
          "price": 1.95
        },
        "acrylic-heart": {
          "quantity": 50,
          "price": 2.95
        },
        "linen_300": {
          "quantity": 100,
          "price": 21.80
        },
        "kraft_300": {
          "quantity": 100,
          "price": 21.60
        },
        "laid_300": {
          "quantity": 100,
          "price": 15.26
        },
        "linen_paper": {
          "quantity": 100,
          "price": 9.68
        },
        "hammered_300": {
          "quantity": 100,
          "weight": 300,
          "price": 9.65,
          "supplier": "papercard.co.uk",
          "url": "https://www.papercard.co.uk/a4_white_hammer_effect_card"
        },
        "hammered_paper": {
          "quantity": 100,
          "price": 8.57,
          "supplier": "papercard.co.uk",
          "url": "https://www.papercard.co.uk/a4_white_hammer_effect_paper_100gsm"
        },
        "dragee": {
        "quantity": 400,
        "price": 9.79,
        "supplier": "ebay"
      }
}
  
      function CazCalculate(ary) {
        var cost = 0;
        
        ary.forEach(function(subary) {
          if(caz_items[subary[0]]) {
          cost = cost + ((caz_items[subary[0]].price / caz_items[subary[0]].quantity) * subary[1])
          }
        })
        return cost;
      }