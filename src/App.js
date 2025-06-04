import React, { useState, useRef, useEffect } from 'react';
import { Printer, Download } from 'lucide-react';
 
function App() {
  // State for customer details
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [billDate, setBillDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
  const [sellerName, setSellerName] = useState('Suneel Kumar'); // Default seller name

  // State for selected products and their quantities (productId: quantity)
  const [selectedProducts, setSelectedProducts] = useState({});

  // Comprehensive product data
  const allProducts = {
    'Milk': {
      'Buffalo Milk': [
        { id: 'buffaloMilk500ml', name: 'Buffalo Milk (500 ml)', price: 38 },
        { id: 'buffaloMilk1L', name: 'Buffalo Milk (1 litre)', price: 75 },
      ],
      'Cow Milk': [
        { id: 'cowMilk500ml', name: 'Cow Milk (500 ml)', price: 30 },
        { id: 'cowMilk1L', name: 'Cow Milk (1 litre)', price: 59 },
      ],
      'Toned Milk': [
        { id: 'tonedMilk500ml', name: 'Toned Milk (500 ml)', price: 29 },
        { id: 'tonedMilk1L', name: 'Toned Milk (1 litre)', price: 57 },
      ],
      'Full Cream Milk': [
        { id: 'fullCreamMilk500ml', name: 'Full Cream Milk (500 ml)', price: 35 },
        { id: 'fullCreamMilk1L', name: 'Full Cream Milk (1 litre)', price: 69 },
      ],
      'Double Toned Milk': [
        { id: 'doubleTonedMilk500ml', name: 'Double Toned Milk (500 ml)', price: 26 },
        { id: 'doubleTonedMilk1L', name: 'Double Toned Milk (1 litre)', price: 51 },
      ],
      'Live Lite Low Fat Milk': [
        { id: 'liveLiteLowFatMilk130ml', name: 'Live Lite Low Fat Milk (130 ml)', price: 10 },
      ],
      'Mother Dairy UHT Toned Milk': [
        { id: 'uhtTonedMilk1L', name: 'Mother Dairy UHT Toned Milk (1 litre)', price: 74 },
      ],
      'Pro Milk': [
        { id: 'proMilk500ml', name: 'Pro Milk (500 ml)', price: 35 },
        { id: 'proMilk1L', name: 'Pro Milk (1 litre)', price: 70 },
      ],
      'Ultra Milk': [
        { id: 'ultraMilk500ml', name: 'Ultra Milk (500 ml)', price: 37 },
      ],
      'Loose Toned Milk': [
        { id: 'looseTonedMilk500ml', name: 'Loose Toned Milk (500 ml)', price: 28 },
        { id: 'looseTonedMilk1L', name: 'Loose Toned Milk (1 litre)', price: 56 },
      ],
    },
    'Dairy Products': {
      'Curd': { // Now an object for sub-sub-categories
        'Pouch': [
          { id: 'classicDahiPouch200g', name: 'Classic Dahi (Pouch) (200 g)', price: 20 },
          { id: 'classicDahiPouch400g', name: 'Classic Dahi (Pouch) (400 g)', price: 35 },
          { id: 'classicDahiPouch1kg', name: 'Classic Dahi (Pouch) (1 kg)', price: 77 },
          { id: 'kadhiDahi1kg', name: 'Kadhi Dahi (Pouch) (1kg)', price: 60 },
          { id: 'lowFatDahi150g', name: 'Low Fat Dahi (Pouch) (150g)', price: 10 },
        ],
        'Cup': [
          { id: 'aamDahi80g', name: 'Aam Dahi (Cup) (80g)', price: 20 },
          { id: 'classicDahiCup400g', name: 'Classic Dahi (Cup) (400 g)', price: 50 },
          { id: 'classicDahiCup200g', name: 'Classic Dahi (Cup) (200 g)', price: 25 },
          { id: 'classicDahiCup80g', name: 'Classic Dahi (Cup) (80 g)', price: 10 },
          { id: 'nutifitProbioticDahi400g', name: 'Nutifit Probiotic Dahi (Cup) (400 g)', price: 60 },
          { id: 'nutifitProbioticDahi200g', name: 'Nutifit Probiotic Dahi (Cup) (200 g)', price: 30 },
          { id: 'ultimateDahi400g', name: 'Ultimate Dahi (Cup) (400 g)', price: 55 },
          { id: 'ultimateDahi200g', name: 'Ultimate Dahi (Cup) (200 g)', price: 28 },
          { id: 'nutifitProbioticCurdCup80g', name: 'Nutifit Probiotic Curd (Cup) (80g)', price: 10 },
        ],
        'Others': [
          { id: 'lowFatDahi5kg', name: 'Low Fat Dahi (Bucket) (5kg)', price: 385 },
        ],
      },
      'Dairy Whitener': [
        { id: 'dairyWhitener1kgPouch', name: 'Dairy Whitener (1kg Pouch)', price: 475 },
        { id: 'dairyWhitener20gm', name: 'Dairy Whitener (20 gm)', price: 10 },
        { id: 'dairyWhitener500g', name: 'Dairy Whitener (500g)', price: 250 },
      ],
      'Flavoured Yoghurt': [
        { id: 'blueberryYoghurt100g', name: 'Blueberry Yoghurt (100g)', price: 35 },
        { id: 'mangoYoghurt100g', name: 'Mango Yoghurt (100g)', price: 35 },
        { id: 'raspberryYoghurt100g', name: 'Raspberry Yoghurt (100g)', price: 35 },
        { id: 'greekYoghurtPlain100g', name: 'Greek Yoghurt Plain (100g)', price: 50 },
        { id: 'greekYoghurtMango100g', name: 'Greek Yoghurt Mango (100g)', price: 50 },
      ],
      'Mishti Doi': [
        { id: 'mishtiDoi400gm', name: 'Mishti Doi (400gm)', price: 75 },
        { id: 'mishtiDoi80gm', name: 'Mishti Doi (80gm)', price: 20 },
      ],
      'Butter': [
        { id: 'tableButter100g', name: 'Table Butter (100 g)', price: 60 },
        { id: 'pasteurizedTableButter500g', name: 'Pasteurized Table Butter (500 g)', price: 295 },
      ],
      'Cheese Products': [
        { id: 'cheeseSpread180g', name: 'Cheese Spread (180 g)', price: 110 },
        { id: 'garlicHerbsCheeseSpread200g', name: 'Garlic and Herbs Flavoured Cheese Spread (200 g)', price: 120 },
        { id: 'cheeseSlices480g', name: 'Cheese Slices (480 g)', price: 335 },
        { id: 'cheeseSlices200g', name: 'Cheese Slices (200 g)', price: 150 },
        { id: 'cheeseBlock200g', name: 'Cheese Block (200 g)', price: 140 },
        { id: 'cheeseCubes180g', name: 'Cheese Cubes (180 g)', price: 135 },
      ],
      'Paneer & Cream': [
        { id: 'freshPaneer200g', name: 'Fresh Paneer (200 g)', price: 95 },
        { id: 'freshPaneer400g', name: 'Fresh Paneer (400 g)', price: 180 },
        { id: 'malaiPaneer200g', name: 'Malai Paneer (200 g)', price: 100 },
        { id: 'uhtCream1L', name: 'UHT Cream (1 L)', price: 230 },
        { id: 'uhtCream200ml', name: 'UHT Cream (200ml)', price: 62 },
      ],
      'Custard': [
        { id: 'custard200ml', name: 'Custard (200ml)', price: 40 },
      ],
    },
    'Ice Cream': {
      'Bars': [
        { id: 'chocoBar65ml', name: 'Choco Bar (65 ml)', price: 20 },
        { id: 'miniChocoBar40ml', name: 'Mini Choco Bar (40 ml)', price: 10 },
        { id: 'chocoTreatBar75ml', name: 'Choco Treat Bar (75 ml)', price: 35 },
        { id: 'chocoSparkleBar75ml', name: 'Choco Sparkle Bar (75 ml)', price: 25 },
        { id: 'almondBar75ml', name: 'Almond Bar (75 ml)', price: 50 },
        { id: 'berryBlast65ml', name: 'Berry Blast (65 ml)', price: 25 },
        { id: 'chillzMangoBar60ml', name: 'Chillz Mango Bar (60 ml)', price: 20 },
        { id: 'chocoMochaBar75ml', name: 'Choco Mocha Bar (75 ml)', price: 35 },
        { id: 'chocoPremiumBar40ml', name: 'Choco Premium Bar (40 ml)', price: 15 },
        { id: 'chocoSparkleBar45ml', name: 'Choco Sparkle Bar (45 ml)', price: 10 },
        { id: 'chocolateBar75ml', name: 'Chocolate Bar (75 ml)', price: 50 },
        { id: 'colaLicLolleezIceCandy50ml', name: 'Cola Lic Lolleez Ice Candy (50 ml)', price: 10 },
        { id: 'doubleTroubleBar75ml', name: 'Double Trouble Bar (75 ml)', price: 60 },
        { id: 'ekDumaAm65ml', name: 'Ek Duma Am (65 ml)', price: 30 },
        { id: 'hazelnutCoffeeBar75ml', name: 'Hazelnut Coffee Bar (75 ml)', price: 40 },
        { id: 'lemonIceCandy50ml', name: 'Lemon Ice-Candy (50 ml)', price: 10 },
        { id: 'licLolleezMango50ml', name: 'Lic Lolleez Mango (50 ml)', price: 10 },
        { id: 'mangoIvoryBar75ml', name: 'Mango Ivory Bar (75 ml)', price: 30 },
        { id: 'orangeLicLolleez50ml', name: 'Orange Lic Lolleez (50 ml)', price: 10 },
        { id: 'raspberryMangoLicLolleezCandy50ml', name: 'Raspberry Mango Lic Lolleez Candy (50 ml)', price: 10 },
        { id: 'rocketBelgianChocolate60ml', name: 'Rocket Belgian Chocolate (60 ml)', price: 30 },
        { id: 'rocketVanilla60ml', name: 'Rocket Vanilla (60 ml)', price: 25 },
        { id: 'vanillaStrawberryBar75ml', name: 'Vanilla Strawberry Bar (75 ml)', price: 25 },
      ],
      'Cones': [
        { id: 'chillzButterscotchCone100ml', name: 'Chillz Butterscotch Cone (100 ml)', price: 35 },
        { id: 'chillzChocolateCone100ml', name: 'Chillz Chocolate Cone (100 ml)', price: 50 },
        { id: 'chillzChocoVanillaCone100ml', name: 'Chillz Choco Vanilla Cone (100 ml)', price: 30 },
        { id: 'chocoCoffeeCrunchCone130ml', name: 'Choco Coffee Crunch Cone (130 ml)', price: 60 },
        { id: 'discChoconadoCone100ml', name: 'Disc Choconado Cone (100 ml)', price: 55 },
        { id: 'discCookieCrunchCone100ml', name: 'Disc Cookie Crunch Cone (100 ml)', price: 50 },
        { id: 'blackForestCone100ml', name: 'Black Forest Cone (100 ml)', price: 40 },
        { id: 'chocoBlissCone100ml', name: 'Choco Bliss Cone (100 ml)', price: 50 },
        { id: 'chocoFudgeCone100ml', name: 'Choco Fudge Cone (100 ml)', price: 35 },
        { id: 'biscottiCrumbleCone100ml', name: 'Biscotti Crumble Cone (100 ml)', price: 50 },
        { id: 'bubblegumCone100ml', name: 'Bubblegum Cone (100 ml)', price: 35 },
        { id: 'chocoBrownieCone130ml', name: 'Choco Brownie Cone (130 ml)', price: 60 },
        { id: 'doubleMagicCone100ml', name: 'Double Magic Cone (100 ml)', price: 30 },
        { id: 'filterCoffeeCone130ml', name: 'Filter Coffee Cone (130 ml)', price: 70 },
        { id: 'miniChocoBliss50ml', name: 'Mini Choco Bliss (50 ml)', price: 20 },
        { id: 'rocketChocoVanillaCone40ml', name: 'Rocket Choco Vanilla Cone (40 ml)', price: 10 },
      ],
      'Cups': [
        { id: 'americanNuttyDelight115ml', name: 'American Nutty Delight (115ml)', price: 50 },
        { id: 'badamRabri115ml', name: 'Badam Rabri (115ml)', price: 50 },
        { id: 'banoffeePie550ml', name: 'Banoffee Pie (550 ml)', price: 150 },
        { id: 'butterscotch50ml', name: 'Butterscotch (50ml)', price: 10 },
        { id: 'vanilla50ml', name: 'Vanilla (50ml)', price: 10 },
        { id: 'strawberry50ml', name: 'Strawberry (50ml)', price: 10 },
        { id: 'chocoBrownieFudge500ml', name: 'Choco Brownie Fudge (500ml)', price: 150 },
        { id: 'chocoChip50ml', name: 'Choco Chip (50ml)', price: 20 },
        { id: 'chocolateGateau115ml', name: 'Chocolate Gateau (115ml)', price: 50 },
        { id: 'cookieCrumb115ml', name: 'Cookie Crumb (115ml)', price: 40 },
        { id: 'dietzKesarAlmond115ml', name: 'Dietz Kesar Almond (115ml)', price: 40 },
        { id: 'frenchVanilla90ml', name: 'French Vanilla (90ml)', price: 20 },
        { id: 'kajuKishmishCup50ml', name: 'Kaju Kishmish Cup (50ml)', price: 20 },
        { id: 'kesarPista60ml', name: 'Kesar Pista (60ml)', price: 35 },
        { id: 'pinaColada500gm', name: 'Pina Colada (500gm)', price: 150 },
        { id: 'shahiMevaMalai115ml', name: 'Shahi Meva Malai (115ml)', price: 40 },
        { id: 'strawberryCrush115ml', name: 'Strawberry Crush (115ml)', price: 40 },
        { id: 'sugarFreeVanilla115ml', name: 'Sugar Free Vanilla (115ml)', price: 35 },
        { id: 'sundayMagic125ml', name: 'Sunday Magic (125ml)', price: 40 },
        { id: 'tenderCoconut115ml', name: 'Tender Coconut (115ml)', price: 45 },
        { id: 'unicornTricolor500ml', name: 'Unicorn Tricolor (500ml)', price: 150 },
      ],
      'Kulfi': [
        { id: 'kesarKulfi60ml', name: 'Kesar Kulfi (60ml)', price: 30 },
        { id: 'mangoTillaKulfi60gm', name: 'Mango Tilla Kulfi (60gm)', price: 30 },
        { id: 'mawaBadamTillaKulfi55ml', name: 'Mawa Badam Tilla Kulfi (55ml)', price: 35 },
        { id: 'pistaKulfi60ml', name: 'Pista Kulfi (60ml)', price: 35 },
        { id: 'rabriKulfi60ml', name: 'Rabri Kulfi (60ml)', price: 30 },
        { id: 'rasmalaiTillaKulfi60ml', name: 'Rasmalai Tilla Kulfi (60ml)', price: 30 },
        { id: 'roseKulfi60ml', name: 'Rose Kulfi (60ml)', price: 25 },
        { id: 'roseTillaKulfi50ml', name: 'Rose Tilla Kulfi (50ml)', price: 40 },
        { id: 'royalRabdiKulfi60gm', name: 'Royal Rabdi Kulfi (60gm)', price: 30 },
        { id: 'shahiMalaiKulfi50ml', name: 'Shahi Malai Kulfi (50ml)', price: 20 },
        { id: 'shahiPaanKulfi50ml', name: 'Shahi Paan Kulfi (50ml)', price: 20 },
        { id: 'shahiPhirniKulfi50ml', name: 'Shahi Phirni Kulfi (50ml)', price: 25 },
        { id: 'shahiPistaKulfi50ml', name: 'Shahi Pista Kulfi (50ml)', price: 25 },
        { id: 'thandaiKulfi60ml', name: 'Thandai Kulfi (60ml)', price: 35 },
      ],
      'Specials': [
        { id: 'blackForestCake1000ml', name: 'Black Forest Cake (1000ml)', price: 520 },
        { id: 'cassata150ml', name: 'Cassata (150ml)', price: 70 },
        { id: 'chocolateTruffleCake500ml', name: 'Chocolate Truffle Cake (500ml)', price: 300 },
        { id: 'icecreamSandwich100ml', name: 'Ice Cream Sandwich (100ml)', price: 30 },
      ],
      'Tubs': [
        { id: 'afghanNuttyDelight750ml', name: 'Afghan Nutty Delight (750ml)', price: 220 },
        { id: 'badamPistaKajuTub750ml', name: 'Badam Pista Kaju Tub (750ml)', price: 250 },
        { id: 'badamRabri750ml', name: 'Badam Rabri (750ml)', price: 220 },
        { id: 'blueberryBlast1000ml', name: 'Blueberry Blast (1000ml)', price: 330 },
        { id: 'chocoAlmond1000ml', name: 'Choco Almond (1000ml)', price: 330 },
        { id: 'chocoFudgeTub750ml', name: 'Choco Fudge Tub (750ml)', price: 220 },
        { id: 'cookieCrumb1000ml', name: 'Cookie Crumb (1000ml)', price: 330 },
        { id: 'creamyCrunchyButterscotch750ml', name: 'Creamy Crunchy Butterscotch (750ml)', price: 200 },
        { id: 'dietzKesarAlmond500ml', name: 'Dietz Kesar Almond (500ml)', price: 175 },
        { id: 'dietzVanilla500ml', name: 'Dietz Vanilla (500ml)', price: 160 },
        { id: 'kesarPista750ml', name: 'Kesar Pista (750ml)', price: 220 },
        { id: 'kulfiFaloodaIcecream750ml', name: 'Kulfi Falooda Icecream (750ml)', price: 220 },
        { id: 'mangoMarvel1000ml', name: 'Mango Marvel (1000ml)', price: 330 },
        { id: 'mochaMagic750ml', name: 'Mocha Magic (750ml)', price: 220 },
        { id: 'pistaEKulfi1000ml', name: 'Pista-E-Kulfi (1000ml)', price: 330 },
        { id: 'premiumBiscoffCaramel500ml', name: 'Premium Biscoff Caramel (500ml)', price: 175 },
        { id: 'premiumCoffeeWalnut500ml', name: 'Premium Coffee Walnut (500ml)', price: 175 },
        { id: 'rajwadiRajbhog750ml', name: 'Rajwadi Rajbhog (750ml)', price: 220 },
        { id: 'shahiMewaMalai1000ml', name: 'Shahi Mewa Malai (1000ml)', price: 330 },
        { id: 'strawberryCrush1000ml', name: 'Strawberry Crush (1000ml)', price: 330 },
        { id: 'sundaeMagic750ml', name: 'Sundae Magic (750ml)', price: 200 },
        { id: 'vanillaGold750ml', name: 'Vanilla Gold (750ml)', price: 220 },
      ],
      'Party Packs': [
        { id: 'blackCurrentWonderPartyPack4L', name: 'Black Current Wonder Party Pack (4L)', price: 460 },
        { id: 'butterscotchPartyPack4L', name: 'Butterscotch Party Pack (4L)', price: 560 },
        { id: 'coffeePartyPack4L', name: 'Coffee Party Pack (4L)', price: 480 },
        { id: 'kajuKishmishPartyPack4L', name: 'Kaju Kishmish Party Pack (4L)', price: 615 },
        { id: 'kesarPistaPartyPack4L', name: 'Kesar Pista Party Pack (4L)', price: 870 },
        { id: 'mangoPartyPack4L', name: 'Mango Party Pack (4L)', price: 545 },
        { id: 'pineappleWonderPartyPack4L', name: 'Pineapple Wonder Party Pack (4L)', price: 460 },
        { id: 'strawberryPartyPack4L', name: 'Strawberry Party Pack (4L)', price: 460 },
        { id: 'strawberryPartyPackLowFat4L', name: 'Strawberry Party Pack (Low Fat) (4L)', price: 430 },
        { id: 'vanillaPartyPack4L', name: 'Vanilla Party Pack (4L)', price: 460 },
        { id: 'vanillaPartyPackLowFat4L', name: 'Vanilla Party Pack (Low Fat) (4L)', price: 430 },
      ],
      'Bricks': [
        { id: 'vanillaBrick700ml', name: 'Vanilla (700 ml)', price: 115 },
        { id: 'strawberryBrick1250ml', name: 'Strawberry (1250 ml)', price: 200 },
        { id: 'blackCurrentBrick650ml', name: 'Black Current (650 ml)', price: 150 },
        { id: 'chocoFudgeBrick700ml', name: 'Choco Fudge (700 ml)', price: 145 },
        { id: 'rajbhogBrick700ml', name: 'Rajbhog (700 ml)', price: 175 },
        { id: 'fruitAndNutBrick650ml', name: 'Fruit and Nut (650ml)', price: 160 },
        { id: 'chocolateBrick750ml', name: 'Chocolate (750ml)', price: 150 },
        { id: 'butterscotchBrick700ml', name: 'Butterscotch (700 ml)', price: 135 },
        { id: 'mawaBadamBrick700ml', name: 'Mawa Badam (700ml)', price: 175 },
        { id: 'americanNuttyBrick700ml', name: 'American Nutty (700 ml)', price: 150 },
        { id: 'chocochipsBrick700ml', name: 'Chocochips (700 ml)', price: 180 },
        { id: 'greenPistaBrick700ml', name: 'Green Pista (700 ml)', price: 115 },
        { id: 'kajuKishmishBrick700ml', name: 'Kaju Kishmish (700 ml)', price: 170 },
        { id: 'mangoBrick700ml', name: 'Mango (700 ml)', price: 135 },
        { id: 'rabriBrick700ml', name: 'Rabri (700 ml)', price: 140 },
        { id: 'shahiETazBrick700ml', name: 'Shahi E Taz (700ml)', price: 175 },
        { id: 'tutiFruityBrick700ml', name: 'Tuti Fruity (700 ml)', price: 135 },
        { id: 'frenchVanillaBrick700ml', name: 'French Vanilla (700ml)', price: 120 },
        { id: 'cookieAndCreamBrick700ml', name: 'Cookie and Cream (700ml)', price: 145 },
        { id: 'butterscotchBrick1500ml', name: 'Butterscotch (1500ml)', price: 275 },
        { id: 'chocoChipIcecreamBrick1250ml', name: 'Choco Chip Icecream (1250ml)', price: 360 },
        { id: 'twoInOneBrick700mlX2', name: 'Two in One (Combo Pack) (700 ml x2)', price: 220 },
      ],
    },
    'Bread & Bakery': {
      'Bread': [
        { id: 'burgerBun200g', name: 'Burger Bun (200g)', price: 40 },
        { id: 'fruitBun160g', name: 'Fruit Bun (160g)', price: 20 },
        { id: 'kulcha200g', name: 'Kulcha (200g)', price: 40 },
        { id: 'motherDairyWholeWheatBread400g', name: 'Mother Dairy Whole Wheat Bread (400g)', price: 60 },
        { id: 'motherDairyBrownBread400g', name: 'Mother Dairy Brown Bread (400g)', price: 55 },
        { id: 'motherDairyMilkFruitBread150g', name: 'Mother Dairy Milk Fruit Bread (150g)', price: 15 },
        { id: 'motherDairyWhiteBread130g', name: 'Mother Dairy White Bread (130g)', price: 10 },
        { id: 'multigrainBread400g', name: 'Multigrain Bread (400g)', price: 60 },
        { id: 'pav300g', name: 'Pav (300g)', price: 40 },
        { id: 'pizzaBase200g', name: 'Pizza Base (200g)', price: 45 },
        { id: 'sandwichBread700g', name: 'Sandwich Bread (700g)', price: 60 },
        { id: 'sandwichBread350g', name: 'Sandwich Bread (350g)', price: 30 },
      ],
      'Cookies': [
        { id: 'attaCookies150g', name: 'Atta Cookies (150g)', price: 60 },
        { id: 'coconutCookies150g', name: 'Coconut Cookies (150g)', price: 75 },
        { id: 'cookiesGiftPack650g', name: 'Cookies Gift Pack (650g)', price: 345 },
        { id: 'jeeraCookies150g', name: 'Jeera Cookies (150g)', price: 60 },
        { id: 'kajuPista200g', name: 'Kaju Pista (200g)', price: 110 },
      ],
      'Rusk': [
        { id: 'elaichiRusk250g', name: 'Elaichi Rusk (250g)', price: 45 },
        { id: 'milkRusk200g', name: 'Milk Rusk (200g)', price: 35 },
      ],
    },
    'Beverages': {
      'Chach': [
        { id: 'economyChach300ml', name: 'Economy Chach (300ml)', price: 10 },
        { id: 'probioticPlainChach450ml', name: 'Probiotic Plain Chach (450ml)', price: 20 },
        { id: 'probioticPlainChach330gm', name: 'Probiotic Plain Chach (330gm)', price: 10 },
        { id: 'plainProbioticChach480g', name: 'Plain Probiotic Chach (480g)', price: 15 },
        { id: 'tadkaChach270g', name: 'Tadka Chach (270g)', price: 10 },
        { id: 'tadkaChachBottle180ml', name: 'Tadka Chach (Bottle) (180ml)', price: 15 },
        { id: 'tadkaChach425ml', name: 'Tadka Chach (425ml)', price: 15 },
        { id: 'tetraMasalaChach180ml', name: 'Tetra Masala Chach (180ml)', price: 15 },
      ],
      'Flavoured Milk': [
        { id: 'coffeeCappuccinoTetra170ml', name: 'Coffee Cappuccino (Tetra) (170ml)', price: 30 },
        { id: 'coffeeLatteTetra170ml', name: 'Coffee Latte (Tetra) (170ml)', price: 30 },
        { id: 'coldCoffeePlasticBottle170ml', name: 'Cold Coffee (Plastic Bottle) (170 ml)', price: 30 },
        { id: 'flavouredBadamMilkPlasticBottle170ml', name: 'Flavoured Badam Milk (Plastic Bottle) (170ml)', price: 30 },
        { id: 'chocolateFlavoredMilkPouch200ml', name: 'Chocolate Flavored Milk (Pouch) (200 ml)', price: 20 },
        { id: 'chocolateFlavoredMilkGlassBottle180ml', name: 'Chocolate Flavored Milk (Glass Bottle) (180 ml)', price: 30 },
        { id: 'kesarElaichiFlavoredMilkPlasticBottle170ml', name: 'Kesar Elaichi Flavored Milk (Plastic Bottle) (170 ml)', price: 30 },
        { id: 'chocolateFlavoredMilkPlasticBottle170ml', name: 'Chocolate Flavored Milk (Plastic Bottle) (170 ml)', price: 30 },
        { id: 'coldCoffeeGlassBottle180ml', name: 'Cold Coffee (Glass Bottle) (180 ml)', price: 30 },
        { id: 'kesarElaichiGlassBottle180ml', name: 'Kesar Elaichi (Glass Bottle) (180ml)', price: 30 },
        { id: 'flavouredMilkKesarElaichiPouch170ml', name: 'Flavoured Milk Kesar Elaichi (Pouch) (170ml)', price: 20 },
        { id: 'haldiMilkGlassBottle180ml', name: 'Haldi Milk (Glass Bottle) (180ml)', price: 30 },
        { id: 'kesarElaichiFlavouredMilkPouch500ml', name: 'Kesar Elaichi Flavoured Milk (Pouch) (500ml)', price: 40 },
        { id: 'vanillaFlavouredMilkPouch500ml', name: 'Vanilla Flavoured Milk (Pouch) (500ml)', price: 40 },
      ],
      'Lassi': [
        { id: 'rabriLassiBottle180ml', name: 'Rabri Lassi (Bottle) (180ml)', price: 20 },
        { id: 'strawberryLassiBottle180ml', name: 'Strawberry Lassi (Bottle) (180ml)', price: 20 },
        { id: 'sweetLassiBottle180ml', name: 'Sweet Lassi (Bottle) (180ml)', price: 20 },
        { id: 'lassiSweetPouch300ml', name: 'Lassi Sweet (Pouch) (300ml)', price: 18 },
        { id: 'mangoLassiBottle180ml', name: 'Mango Lassi (Bottle) (180ml)', price: 20 },
        { id: 'sweetLassiPouch300ml', name: 'Sweet Lassi (Pouch) (300ml)', price: 10 },
        { id: 'sweetLassiTetraPack180ml', name: 'Sweet Lassi (Tetra Pack) (180ml)', price: 20 },
      ],
      'Milk Shake': [
        { id: 'chocolateMilkshakeTetra180ml', name: 'Chocolate Milkshake (Tetra) (180ml)', price: 30 },
        { id: 'mangoMilkshakeTetra180ml', name: 'Mango Milkshake (Tetra) (180ml)', price: 30 },
        { id: 'strawberryMilkshakeTetra180ml', name: 'Strawberry Milkshake (Tetra) (180ml)', price: 30 },
      ],
      'Nutrifit': [
        { id: 'nutrifitStrawberry80ml', name: 'Nutrifit Strawberry (80ml)', price: 12 },
        { id: 'nutifitMango80ml', name: 'Nutifit Mango (80ml)', price: 12 },
      ],
    },
    'Oil & Ghee': {
      'Cow Ghee': [
        { id: 'cowGheeJar1kg', name: 'Cow Ghee (Jar) (1kg)', price: 750 },
        { id: 'cowGheeJar200g', name: 'Cow Ghee (Jar) (200g)', price: 190 },
        { id: 'cowGheeJar500g', name: 'Cow Ghee (Jar) (500g)', price: 380 },
        { id: 'cowGheeCarton1L', name: 'Cow Ghee (Carton Pack) (1L)', price: 685 },
        { id: 'cowGheePolyPouch1L', name: 'Cow Ghee (Poly Pouch) (1L)', price: 685 },
        { id: 'cowGheeCarton500ml', name: 'Cow Ghee (Carton Pack) (500ml)', price: 350 },
        { id: 'cowGheePolyPouch500ml', name: 'Cow Ghee (Poly Pouch) (500ml)', price: 350 },
      ],
      'Buffalo Ghee': [
        { id: 'buffaloGheeTin15kg', name: 'Buffalo Ghee (Tin) (15kg)', price: 10750 },
        { id: 'buffaloGheeCarton1kg', name: 'Buffalo Ghee (Carton Pack) (1kg)', price: 675 },
        { id: 'buffaloGheeCarton500ml', name: 'Buffalo Ghee (Carton Pack) (500ml)', price: 345 },
      ],
      'Kacchi Ghani Mustard Oil': [
        { id: 'dharaKachiGhaniMustardOilPet1L', name: 'Dhara Kachi Ghani Mustard Oil (Pet bottle) (1L)', price: 220 },
        { id: 'dharaKachiGhaniMustardOilPouch1L', name: 'Dhara Kachi Ghani Mustard Oil (Pouch) (1L)', price: 170 },
        { id: 'dharaKachiGhaniMustardOilContainer5L', name: 'Dhara Kachi Ghani Mustard Oil (Container) (5L)', price: 1075 },
        { id: 'dharaKachiGhaniMustardOilBottle500ml', name: 'Dhara Kachi Ghani Mustard Oil (Bottle) (500ml)', price: 86 },
      ],
      'Refined Soyabean Oil': [
        { id: 'dharaLiteNFineSoyabeanOilBottle1L', name: 'Dhara Lite N Fine Refined Soyabean Oil (Bottle) (1L)', price: 150 },
        { id: 'dharaLiteNFineSoyabeanOilPouch1L', name: 'Dhara Lite N Fine Refined Soyabean Oil (Pouch) (1L)', price: 190 },
        { id: 'dharaLiteNFineSoyabeanOilContainer5L', name: 'Dhara Lite N Fine Refined Soyabean Oil (Container) (5L)', price: 725 },
        { id: 'dharaLiteNFineSoyabeanOilBottle500ml', name: 'Dhara Lite N Fine Refined Soyabean Oil (Bottle) (500ml)', price: 71 },
      ],
      'Refined Sunflower Oil': [
        { id: 'dharaVitaeSunflowerOilPouch1kg', name: 'Dhara Vitae Refined Sunflower Oil (Pouch) (1kg)', price: 195 },
        { id: 'dharaVitaeSunflowerOilPouch5L', name: 'Dhara Vitae Refined Sunflower Oil (Pouch) (5L)', price: 850 },
      ],
      'Refined Mustard Oil': [
        { id: 'dharaVitaeRefinedMustardOilTetra1L', name: 'Dhara Vitae Refined Mustard Oil (Tetra) (1L)', price: 225 },
      ],
    },
    'Frozen': { // An object for subcategories
      'Corn': [
        { id: 'safalFrozenSweetCorn200g', name: 'Safal Frozen Sweet Corn – 200 g', price: 45 },
        { id: 'safalFrozenSweetCorn400g', name: 'Safal Frozen Sweet Corn – 400 g', price: 90 },
        { id: 'safalFrozenSweetCorn500g', name: 'Safal Frozen Sweet Corn – 500 g', price: 100 },
        { id: 'safalFrozenSweetCornCombo400g', name: 'Safal Frozen Sweet Corn (combo pack 200 g+ 200g)', price: 90 },
        { id: 'safalFrozenSweetCornCombo1kg', name: 'Safal Frozen Sweet Corn (combo pack 500 g +500g)', price: 200 },
        { id: 'safalFrozenSweetCorn1kg', name: 'Safal Frozen Sweet Corn – 1 kg', price: 180 },
      ],
      'Frozen Snacks': [
        { id: 'safalAlooTikky400g', name: 'Safal Aloo Tikki – 400 g', price: 90 },
        { id: 'safalChillyGarlicNuggets400g', name: 'Safal Chilly Garlic Nuggets – 400 g', price: 110 },
        { id: 'safalCrispyVeggieBites400g', name: 'Safal Crispy Veggie Bites – 400 g', price: 160 },
        { id: 'safalVeggieSticks400g', name: 'Safal Veggie Sticks – 400 g', price: 160 },
        { id: 'safalJalapenoCheesePops300g', name: 'Safal Jalapeno Cheese Pops – 300 g', price: 200 },
        { id: 'safalPizzaPockets340g', name: 'Safal Pizza Pockets – 340 g', price: 180 },
        { id: 'safalFrenchFries1kg', name: 'Safal French Fries – 1kg', price: 230 },
        { id: 'safalFrenchFries400g', name: 'Safal French Fries – 400 g', price: 100 },
      ],
      'Mix Veg': [
        { id: 'safalMixVeg1kg', name: 'Safal Mix Veg – 1kg', price: 160 },
        { id: 'safalMixVeg200g', name: 'Safal Mix Veg – 200g', price: 40 },
        { id: 'safalMixVeg500g', name: 'Safal Mix Veg – 500g', price: 85 },
      ],
      'Peas': [
        { id: 'safalPeas1kg', name: 'Safal Peas – 1kg', price: 260 },
        { id: 'safalPeas200g', name: 'Safal Peas – 200g', price: 60 },
        { id: 'safalPeas500g', name: 'Safal Peas – 500g', price: 145 },
        { id: 'safalPeasCombo400g', name: 'Safal Peas (combo 200g +200g) – 400g', price: 110 },
        { id: 'safalPeas5kg', name: 'Safal Peas – 5kg', price: 800 },
      ],
      'Jack Fruit': [
        { id: 'frozenJackFruit300g', name: 'Frozen Jack Fruit – 300g', price: 60 },
      ],
      'Hara Bhara Kebab': [
        { id: 'safalHaraBharaKebab200g', name: 'Safal Hara Bhara Kebab – 200 g', price: 80 },
      ],
    },
    'Sweets': { // New Sweets category with subcategories
      'Gulab Jamun': [
        { id: 'gulabJamun1kg', name: 'Gulab Jamun – 1kg', price: 250 },
      ],
      'Kaju Katli': [
        { id: 'kajuKatli400g', name: 'Kaju Katli – 400g', price: 400 },
      ],
      'Orange Barfi': [],
      'Orange Mawa Barfi': [],
      'Rasgulla': [
        { id: 'rasgulla1kg', name: 'Rasgulla – 1kg', price: 250 },
      ],
      'Rasmalai': [
        { id: 'rasmalai500g', name: 'Rasmalai – 500g', price: 275 },
      ],
      'Milk Cake': [
        { id: 'milkCake400g', name: 'Milk Cake – 400g', price: 250 },
      ],
    },
    'Pickle': { // New Pickle category with subcategories
      'Pickle': [
        { id: 'greenChillyPickle400g', name: 'Green Chilly Pickle – 400g', price: 130 },
        { id: 'limePickle400g', name: 'Lime Pickle – 400g', price: 130 },
        { id: 'mangoPickle400g', name: 'Mango Pickle – 400g', price: 130 },
        { id: 'mixPickle400g', name: 'Mix Pickle – 400g', price: 130 },
      ],
    },
    'Puree & Jam': { // New Puree & Jam category with subcategories
      'Tomato Puree': [
        { id: 'tomatoPureeSlimPack200g', name: 'Tomato Puree (slim pack) – 200g', price: 27 },
      ],
      'Jam': [
        { id: 'mixedFruitJam500g', name: 'Mixed Fruit Jam – 500g', price: 150 },
      ],
    },
  };

  // State for current active category and sub-category, defaulting to the first available subcategory
  const [selectedCategory, setSelectedCategory] = useState('Milk');
  const [selectedIceCreamSubCategory, setSelectedIceCreamSubCategory] = useState(Object.keys(allProducts['Ice Cream'])[0]);
  const [selectedDairyProductSubCategory, setSelectedDairyProductSubCategory] = useState(Object.keys(allProducts['Dairy Products'])[0]);
  const [selectedMilkSubCategory, setSelectedMilkSubCategory] = useState(Object.keys(allProducts['Milk'])[0]);
  const [selectedBreadBakerySubCategory, setSelectedBreadBakerySubCategory] = useState(Object.keys(allProducts['Bread & Bakery'])[0]);
  const [selectedBeveragesSubCategory, setSelectedBeveragesSubCategory] = useState(Object.keys(allProducts['Beverages'])[0]);
  const [selectedCurdSubCategory, setSelectedCurdSubCategory] = useState(Object.keys(allProducts['Dairy Products']['Curd'])[0]);
  const [selectedOilGheeSubCategory, setSelectedOilGheeSubCategory] = useState(Object.keys(allProducts['Oil & Ghee'])[0]);
  const [selectedFrozenSubCategory, setSelectedFrozenSubCategory] = useState(Object.keys(allProducts['Frozen'])[0]);
  const [selectedSweetsSubCategory, setSelectedSweetsSubCategory] = useState(Object.keys(allProducts['Sweets'])[0]);
  const [selectedPickleSubCategory, setSelectedPickleSubCategory] = useState(Object.keys(allProducts['Pickle'])[0]);
  const [selectedPureeJamSubCategory, setSelectedPureeJamSubCategory] = useState(Object.keys(allProducts['Puree & Jam'])[0]);


  // State to track if PDF libraries are loaded
  const [pdfLibsLoaded, setPdfLibsLoaded] = useState(false);
  // State to store the base64 encoded logo for printing
  // Use a placeholder to avoid 'tainted canvas' issues
  const [logoBase64, setLogoBase64] = useState('https://placehold.co/150x50/4CAF50/FFFFFF?text=Mother+Dairy');


  // Load PDF libraries dynamically
  useEffect(() => {
    const loadScript = (src, id, callback) => {
      if (document.getElementById(id)) {
        callback();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.onload = callback;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.head.appendChild(script);
    };

    let scriptsLoadedCount = 0;
    const totalScripts = 2;

    const onScriptLoad = () => {
      scriptsLoadedCount++;
      if (scriptsLoadedCount === totalScripts) {
        setPdfLibsLoaded(true);
      }
    };

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'html2canvas-script', onScriptLoad);
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf-script', onScriptLoad);

    // Cleanup function to remove scripts if component unmounts
    return () => {
      const html2canvasScript = document.getElementById('html2canvas-script');
      const jspdfScript = document.getElementById('jspdf-script');
      if (html2canvasScript) document.head.removeChild(html2canvasScript);
      if (jspdfScript) document.head.removeChild(jspdfScript);
    };
  }, []);

  // Flatten all products into a single map for easy lookup by ID
  const flatProducts = {};
  Object.keys(allProducts).forEach(categoryKey => {
    if (typeof allProducts[categoryKey] === 'object' && !Array.isArray(allProducts[categoryKey])) {
      // It's a category with sub-categories
      Object.keys(allProducts[categoryKey]).forEach(subCategoryKey => {
        if (typeof allProducts[categoryKey][subCategoryKey] === 'object' && !Array.isArray(allProducts[categoryKey][subCategoryKey])) {
          // It's a sub-category with further nested sub-categories
          Object.keys(allProducts[categoryKey][subCategoryKey]).forEach(nestedSubCategoryKey => {
            allProducts[categoryKey][subCategoryKey][nestedSubCategoryKey].forEach(product => {
              flatProducts[product.id] = product;
            });
          });
        } else {
          // It's a regular sub-category array
          allProducts[categoryKey][subCategoryKey].forEach(product => {
            flatProducts[product.id] = product;
          });
        }
      });
    } else {
      // It's a simple category
      // This case should ideally not be hit if all top-level categories have sub-objects
      allProducts[categoryKey].forEach(product => {
        flatProducts[product.id] = product;
      });
    }
  });

  // Get products to display based on selected category and sub-category
  const getProductsToDisplay = () => {
    if (selectedCategory === 'Ice Cream') {
      return allProducts['Ice Cream'][selectedIceCreamSubCategory] || [];
    } else if (selectedCategory === 'Dairy Products') {
      if (selectedDairyProductSubCategory === 'Curd') {
        return allProducts['Dairy Products']['Curd'][selectedCurdSubCategory] || [];
      }
      return allProducts['Dairy Products'][selectedDairyProductSubCategory] || [];
    } else if (selectedCategory === 'Milk') {
      return allProducts['Milk'][selectedMilkSubCategory] || [];
    } else if (selectedCategory === 'Bread & Bakery') {
      return allProducts['Bread & Bakery'][selectedBreadBakerySubCategory] || [];
    } else if (selectedCategory === 'Beverages') {
      return allProducts['Beverages'][selectedBeveragesSubCategory] || [];
    } else if (selectedCategory === 'Oil & Ghee') {
      return allProducts['Oil & Ghee'][selectedOilGheeSubCategory] || [];
    } else if (selectedCategory === 'Frozen') {
      return allProducts['Frozen'][selectedFrozenSubCategory] || [];
    } else if (selectedCategory === 'Sweets') {
      return allProducts['Sweets'][selectedSweetsSubCategory] || [];
    } else if (selectedCategory === 'Pickle') {
      return allProducts['Pickle'][selectedPickleSubCategory] || [];
    } else if (selectedCategory === 'Puree & Jam') {
      return allProducts['Puree & Jam'][selectedPureeJamSubCategory] || [];
    }
    return []; // Should not reach here if categories are always valid
  };

  const productsToDisplay = getProductsToDisplay();

  // Ref for the bill content to be printed/exported
  const billRef = useRef(null);

  // Calculate bill totals
  const calculateTotals = () => {
    let subtotal = 0;
    const items = [];

    // Iterate through selectedProducts state, using flatProducts for price lookup
    Object.keys(selectedProducts).forEach(productId => {
      const quantity = selectedProducts[productId];
      const product = flatProducts[productId];

      if (quantity > 0 && product) {
        const itemTotal = quantity * product.price;
        subtotal += itemTotal;
        items.push({
          name: product.name,
          quantity: quantity,
          price: product.price,
          total: itemTotal,
        });
      }
    });

    const grandTotal = subtotal; // No GST

    return { items, subtotal, grandTotal };
  };

  const { items, subtotal, grandTotal } = calculateTotals();

  // Handle quantity change for a product
  const handleQuantityChange = (productId, event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: isNaN(value) || value < 0 ? 0 : value,
    }));
  };

  // Handle print bill
  const handlePrintBill = () => {
    if (billRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><title>Mother Dairy Bill</title>');
      printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        @media print {
          body {
            -webkit-print-color-adjust: exact; /* For WebKit browsers to print background colors/images */
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif; /* Ensure font consistency */
            display: flex;
            justify-content: center;
            align-items: flex-start; /* Align to top */
            min-height: 100vh; /* Ensure it takes full viewport height */
          }
          .bill-container {
            width: 100%;
            max-width: 80mm; /* Standard receipt paper width */
            box-shadow: none;
            border: none;
            padding: 10mm; /* Add some padding for print margins */
            box-sizing: border-box;
          }
          /* Table styling for print */
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed; /* Ensures columns are fixed width */
          }
          th, td {
            padding: 4px 2px; /* Reduce padding for print */
            font-size: 0.75rem; /* Smaller font size for print */
            word-wrap: break-word; /* Prevents long words from overflowing */
          }
          th:nth-child(1), td:nth-child(1) { width: 50%; text-align: left; } /* Product Name */
          th:nth-child(2), td:nth-child(2) { width: 15%; text-align: center; } /* Qty */
          th:nth-child(3), td:nth-child(3) { width: 20%; text-align: right; } /* Price */
          th:nth-child(4), td:nth-child(4) { width: 15%; text-align: right; } /* Total */

          .logo-img-print {
            max-width: 80px; /* Adjust logo size for print */
            height: auto;
            margin-bottom: 10px; /* Spacing below logo */
          }
          .text-2xl { font-size: 1.25rem; } /* Adjust heading sizes for print */
          .text-sm { font-size: 0.7rem; }
          .text-md { font-size: 0.8rem; }
          .text-lg { font-size: 0.9rem; }
          .text-xl { font-size: 1rem; }
          .font-bold { font-weight: 700; }
          .font-semibold { font-weight: 600; }
          .font-medium { font-weight: 500; }

          /* Ensure no page breaks inside critical elements */
          .bill-container, .border-t, .border-b, table, tbody, tr {
            page-break-inside: avoid;
          }
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      // Construct the bill content for printing, using the Base64 logo
      const billContentHtml = `
        <div class="bill-container">
          <div class="flex flex-col items-center mb-6">
            <img src="${logoBase64}" alt="Mother Dairy Logo" class="mb-4 rounded-md logo-img-print"/>
            <h2 class="text-2xl font-bold text-green-800">Mother Dairy</h2>
            <p class="text-sm text-gray-600">Booth No: 810</p>
            <p class="text-sm text-gray-600">Quality Dairy Products</p>
          </div>

          <div class="border-t border-b border-gray-300 py-4 mb-6">
            <p class="text-md font-medium text-gray-700 mb-1">
              Customer Name: ${customerName || 'N/A'}
            </p>
            <p class="text-md font-medium text-gray-700 mb-1">
              Contact No.: ${customerContact || 'N/A'}
            </p>
            <p class="text-md font-medium text-gray-700 mb-1">
              Date: ${billDate}
            </p>
            <p className="text-md font-medium text-gray-700">
              Seller Name: ${sellerName || 'N/A'}
            </p>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Bill Details:</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white rounded-lg overflow-hidden">
                <thead class="bg-green-100">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-green-700">Product</th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-green-700">Qty</th>
                    <th className="py-2 px-4 text-right text-sm font-semibold text-green-700">Price (₹)</th>
                    <th className="py-2 px-4 text-right text-sm font-semibold text-green-700">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.length > 0 ? (
                    items.map(item => `
                      <tr class="border-b border-gray-200 last:border-b-0">
                        <td class="py-2 px-4 text-left text-gray-800">${item.name}</td>
                        <td class="py-2 px-4 text-center text-gray-800">${item.quantity}</td>
                        <td class="py-2 px-4 text-right text-gray-800">${item.price.toFixed(2)}</td>
                        <td class="py-2 px-4 text-right text-gray-800">${item.total.toFixed(2)}</td>
                      </tr>
                    `).join('')
                  ) : (
                    `<tr><td colspan="4" class="py-4 text-center text-gray-500">No items selected.</td></tr>`
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex flex-col items-end text-right border-t border-gray-300 pt-4">
            <p class="text-md font-medium text-gray-700 mb-1">Subtotal: ₹${subtotal.toFixed(2)}</p>
            <p class="text-xl font-bold text-green-800 mt-2">Grand Total: ₹${grandTotal.toFixed(2)}</p>
          </div>

          <div class="text-center mt-8 text-gray-600 text-sm">
            <p>Thank you for your purchase!</p>
            <p>Visit us again soon!</p>
          </div>
        </div>
      `;
      printWindow.document.write(billContentHtml);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  // Handle export bill as PDF
  const handleExportPdf = async () => {
    if (!pdfLibsLoaded) {
      console.error("PDF libraries are not yet loaded. Please wait a moment and try again.");
      return;
    }
    if (billRef.current && window.html2canvas && window.jspdf) {
      const input = billRef.current;
      // Capture the full scrollable height and width of the content
      const canvas = await window.html2canvas(input, {
        scale: 2, // Keep scale for better quality
        useCORS: true, // Important for images loaded from different origins (like the logo)
        windowWidth: input.scrollWidth, // Capture full scrollable width
        windowHeight: input.scrollHeight // Capture full scrollable height
      });

      const imgData = canvas.toDataURL('image/png');

      // Define standard A4 dimensions in pixels (approx. 96 DPI)
      const a4WidthPx = 794; // A4 width at 96 DPI
      const a4HeightPx = 1123; // A4 height at 96 DPI

      const pdf = new window.jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [a4WidthPx, a4HeightPx] // Set PDF format to A4 dimensions
      });

      // Calculate the dimensions to fit the image on the A4 page while maintaining aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const aspectRatio = imgWidth / imgHeight;

      let finalImgWidth = a4WidthPx;
      let finalImgHeight = a4WidthPx / aspectRatio;

      // If the scaled height is greater than A4 height, scale down by height
      if (finalImgHeight > a4HeightPx) {
        finalImgHeight = a4HeightPx;
        finalImgWidth = a4HeightPx * aspectRatio;
      }

      // Add image to PDF, centered on the page
      const xOffset = (a4WidthPx - finalImgWidth) / 2;
      const yOffset = (a4HeightPx - finalImgHeight) / 2; // Center vertically as well

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
      pdf.save(`Mother_Dairy_Bill_${customerName || 'Customer'}_${billDate}.pdf`);
    } else {
      console.error("html2canvas or jspdf not available. Check if scripts loaded correctly.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4 font-inter text-gray-800 flex flex-col items-center">
      {/* Tailwind CSS is loaded globally, no need for script tag here */}
      {/* PDF libraries are now loaded dynamically in useEffect */}

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-6">
          MOTHER DAIRY 810 BILL
        </h1>

        {/* Customer & Seller Details Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="customerName" className="text-sm font-medium text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              id="customerName"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="customerContact" className="text-sm font-medium text-gray-600 mb-1">Contact No.</label>
            <input
              type="text"
              id="customerContact"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent"
              value={customerContact}
              onChange={(e) => setCustomerContact(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="billDate" className="text-sm font-medium text-gray-600 mb-1">Date</label>
            <input
              type="date"
              id="billDate"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent"
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:col-span-1">
            <label htmlFor="sellerName" className="text-sm font-medium text-gray-600 mb-1">Seller Name</label>
            <input
              type="text"
              id="sellerName"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              placeholder="Enter seller name"
            />
          </div>
        </div>

        {/* Product Category Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Select Category</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(allProducts).map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  // Reset sub-categories to their first available option when changing main category
                  if (allProducts[category]['Buffalo Milk']) setSelectedMilkSubCategory(Object.keys(allProducts['Milk'])[0]);
                  if (allProducts[category]['Curd']) setSelectedDairyProductSubCategory(Object.keys(allProducts['Dairy Products'])[0]);
                  if (allProducts[category]['Curd'] && allProducts[category]['Curd']['Pouch']) setSelectedCurdSubCategory(Object.keys(allProducts['Dairy Products']['Curd'])[0]);
                  if (allProducts[category]['Bars']) setSelectedIceCreamSubCategory(Object.keys(allProducts['Ice Cream'])[0]);
                  if (allProducts[category]['Bread']) setSelectedBreadBakerySubCategory(Object.keys(allProducts['Bread & Bakery'])[0]);
                  if (allProducts[category]['Chach']) setSelectedBeveragesSubCategory(Object.keys(allProducts['Beverages'])[0]);
                  if (allProducts[category]['Cow Ghee']) setSelectedOilGheeSubCategory(Object.keys(allProducts['Oil & Ghee'])[0]);
                  if (allProducts[category]['Corn']) setSelectedFrozenSubCategory(Object.keys(allProducts['Frozen'])[0]);
                  if (allProducts[category]['Gulab Jamun']) setSelectedSweetsSubCategory(Object.keys(allProducts['Sweets'])[0]);
                  if (allProducts[category]['Pickle']) setSelectedPickleSubCategory(Object.keys(allProducts['Pickle'])[0]);
                  if (allProducts[category]['Tomato Puree']) setSelectedPureeJamSubCategory(Object.keys(allProducts['Puree & Jam'])[0]);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Milk Sub-Category Selection */}
          {selectedCategory === 'Milk' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Milk Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Milk']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedMilkSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedMilkSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dairy Products Sub-Category Selection */}
          {selectedCategory === 'Dairy Products' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Dairy Product Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Dairy Products']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => {
                      setSelectedDairyProductSubCategory(subCategory);
                      // Reset curd sub-sub-category to its first option when changing dairy product sub-category
                      if (allProducts['Dairy Products'][subCategory]['Pouch']) {
                        setSelectedCurdSubCategory(Object.keys(allProducts['Dairy Products'][subCategory])[0]);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedDairyProductSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>

              {/* Curd Sub-Sub-Category Selection (only if Curd is selected) */}
              {selectedDairyProductSubCategory === 'Curd' && (
                <div className="mt-4 ml-4"> {/* Added ml-4 for indentation */}
                  <h4 className="text-md font-semibold text-green-400 mb-2">Select Curd Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(allProducts['Dairy Products']['Curd']).map(subSubCategory => (
                      <button
                        key={subSubCategory}
                        onClick={() => setSelectedCurdSubCategory(subSubCategory)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                          selectedCurdSubCategory === subSubCategory
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {subSubCategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Ice Cream Sub-Category Selection */}
          {selectedCategory === 'Ice Cream' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Ice Cream Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Ice Cream']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedIceCreamSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedIceCreamSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bread & Bakery Sub-Category Selection */}
          {selectedCategory === 'Bread & Bakery' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Bread & Bakery Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Bread & Bakery']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedBreadBakerySubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedBreadBakerySubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Beverages Sub-Category Selection */}
          {selectedCategory === 'Beverages' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Beverage Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Beverages']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedBeveragesSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedBeveragesSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Oil & Ghee Sub-Category Selection */}
          {selectedCategory === 'Oil & Ghee' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Oil & Ghee Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Oil & Ghee']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedOilGheeSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedOilGheeSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Frozen Sub-Category Selection */}
          {selectedCategory === 'Frozen' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Frozen Item Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Frozen']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedFrozenSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedFrozenSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweets Sub-Category Selection */}
          {selectedCategory === 'Sweets' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Sweet Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Sweets']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedSweetsSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedSweetsSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pickle Sub-Category Selection */}
          {selectedCategory === 'Pickle' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Pickle Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Pickle']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedPickleSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedPickleSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Puree & Jam Sub-Category Selection */}
          {selectedCategory === 'Puree & Jam' && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-500 mb-3">Select Puree & Jam Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(allProducts['Puree & Jam']).map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedPureeJamSubCategory(subCategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedPureeJamSubCategory === subCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Selection List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Select Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map(product => (
                <div key={product.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <span className="font-medium text-gray-700">{product.name} (₹{product.price})</span>
                  <input
                    type="number"
                    min="0"
                    className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-green-400"
                    value={selectedProducts[product.id] || ''}
                    onChange={(e) => handleQuantityChange(product.id, e)}
                    placeholder="Qty"
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products available in this category.</p>
            )}
          </div>
        </div>

        {/* Bill Display Section */}
        <div ref={billRef} className="bg-white border-2 border-green-300 rounded-xl p-6 md:p-8 shadow-inner">
          <div className="flex flex-col items-center mb-6">
            {/* Mother Dairy Logo - Uses the uploaded path for main display */}
            <img
              src="uploaded:image_ca72d7.png-5b0aad01-f828-44da-a7e7-bf7826e4fc31"
              alt="Mother Dairy Logo"
              className="mb-4 rounded-md logo-img"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x50/4CAF50/FFFFFF?text=Mother+Dairy"; }}
            />
            <h2 className="text-2xl font-bold text-green-800">Mother Dairy</h2>
            <p className="text-sm text-gray-600">Booth No: 810</p>
            <p className="text-sm text-gray-600">Quality Dairy Products</p>
          </div>

          <div className="border-t border-b border-gray-300 py-4 mb-6">
            <p className="text-md font-medium text-gray-700 mb-1">
              Customer Name: {customerName || 'N/A'}
            </p>
            <p className="text-md font-medium text-gray-700 mb-1">
              Contact No.: {customerContact || 'N/A'}
            </p>
            <p className="text-md font-medium text-gray-700 mb-1">
              Date: {billDate}
            </p>
            <p className="text-md font-medium text-gray-700">
              Seller Name: {sellerName || 'N/A'}
            </p>
          </div>

          {/* Itemized List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Bill Details:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-green-100">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-green-700">Product</th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-green-700">Qty</th>
                    <th className="py-2 px-4 text-right text-sm font-semibold text-green-700">Price (₹)</th>
                    <th className="py-2 px-4 text-right text-sm font-semibold text-green-700">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-b-0">
                        <td className="py-2 px-4 text-left text-gray-800">{item.name}</td>
                        <td className="py-2 px-4 text-center text-gray-800">{item.quantity}</td>
                        <td className="py-2 px-4 text-right text-gray-800">{item.price.toFixed(2)}</td>
                        <td className="py-2 px-4 text-right text-gray-800">{item.total.toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 text-center text-gray-500">No items selected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end text-right border-t border-gray-300 pt-4">
            <p className="text-md font-medium text-gray-700 mb-1">Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p className="text-xl font-bold text-green-800 mt-2">Grand Total: ₹{grandTotal.toFixed(2)}</p>
          </div>

          <div className="text-center mt-8 text-gray-600 text-sm">
            <p>Thank you for your purchase!</p>
            <p>Visit us again soon!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handlePrintBill}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <Printer className="w-5 h-5 mr-2" /> Print Bill
          </button>
          <button
            onClick={handleExportPdf}
            className={`flex items-center px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform ${
              pdfLibsLoaded
                ? 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 hover:scale-105'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            disabled={!pdfLibsLoaded}
          >
            <Download className="w-5 h-5 mr-2" /> Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
