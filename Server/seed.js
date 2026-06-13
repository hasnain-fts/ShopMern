const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const Product = require('./models/Product');

const products = [
    // ==================== MEN PRODUCTS ====================
    // Product 1: Slub Printed Shirt - ECRU
    {
        name: "SLUB PRINTED SHIRT",
        description: "Casual slub printed shirt in ecru color. Perfect for everyday wear with a relaxed fit.",
        price: 5950,
        gender: "men",
        category: "shirts",
        stock: 25,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP063-ECRU-SLUB-PRINTED-SHIRT-b5b6a8_7.jpg?v=1781075044&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP063-ECRU-SLUB-PRINTED-SHIRT-babcb9_2.jpg?v=1781087869&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP063-ECRU-SLUB-PRINTED-SHIRT-b5b6a8_6_720x.jpg?v=1781075044"
        ]
    },
    // Product 2: Tropical Flowy Pants
    {
        name: "TROPICAL FLOWY PANTS",
        description: "Lightweight tropical print flowy pants in black. Perfect for summer days.",
        price: 9450,
        gender: "men",
        category: "pants",
        stock: 20,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT034-BLACK-TROPICAL-FLOWY-PANTS-000000_2.jpg?v=1781087040&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT034-BLACK-TROPICAL-FLOWY-PANTS-000000_1.jpg?v=1781087040&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT034-BLACK-TROPICAL-FLOWY-PANTS-000000_2_720x.jpg?v=1781087040"
        ]
    },
    // Product 3: Paisley Printed Shirt
    {
        name: "PAISLEY PRINTED SHIRT",
        description: "Navy paisley printed shirt with elegant design. Perfect for formal occasions.",
        price: 7450,
        gender: "men",
        category: "shirts",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP507-NAVY-PAISLEY-PRINTED-SHIRT-242537_7.jpg?v=1781093913&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP507-NAVY-PAISLEY-PRINTED-SHIRT-242537_3.jpg?v=1781089283&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP507-NAVY-PAISLEY-PRINTED-SHIRT-242537_4_720x.jpg?v=1781093913"
        ]
    },
    // Product 4: Essential Fit Trousers
    {
        name: "ESSENTIAL FIT TROUSERS",
        description: "Mouse color essential fit trousers. Classic fit for everyday office wear.",
        price: 11950,
        gender: "men",
        category: "pants",
        stock: 15,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT503-MOUSE-ESSENTIAL-FIT-TROUSERS-8e7355_2.jpg?v=1781093866&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT503-MOUSE-ESSENTIAL-FIT-TROUSERS-978a71_1.jpg?v=1781093866&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT503-MOUSE-ESSENTIAL-FIT-TROUSERS-8e7355_3_720x.jpg?v=1781093866"
        ]
    },
    // Product 5: Holiday Shirt
    {
        name: "HOLIDAY SHIRT",
        description: "Beige holiday shirt with relaxed fit. Perfect for vacation wear.",
        price: 10950,
        gender: "men",
        category: "shirts",
        stock: 12,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP516-BEIGE-HOLIDAY-SHIRT-b4acaa_6.jpg?v=1781093942&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP516-BEIGE-HOLIDAY-SHIRT-b4acaa_2.jpg?v=1781089300&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP516-BEIGE-HOLIDAY-SHIRT-b4acaa_2_720x.jpg?v=1781089300"
        ]
    },
    // Product 6: Nomad Leather Slides - Light Blue
    {
        name: "NOMAD LEATHER SLIDES",
        description: "Light blue nomad leather slides. Comfortable and stylish summer footwear.",
        price: 8450,
        gender: "men",
        category: "shoes",
        stock: 30,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL501-LIGHTBLUE-NOMAD-LEATHER-SLIDES-2c3d51_8.jpg?v=1781075909&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL501-LIGHTBLUE-NOMAD-LEATHER-SLIDES-2c3d51_7.jpg?v=1781075909&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL501-LIGHTBLUE-NOMAD-LEATHER-SLIDES-2c3d51_9_720x.jpg?v=1781075909"
        ]
    },
    // Product 7: Nomad Leather Slides - Sage
    {
        name: "NOMAD LEATHER SLIDES",
        description: "Sage green nomad leather slides. Premium quality leather with comfortable fit.",
        price: 8450,
        gender: "men",
        category: "shoes",
        stock: 28,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL501-SAGE-NOMAD-LEATHER-SLIDES-8a825e_8.jpg?v=1781075915&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL501-SAGE-NOMAD-LEATHER-SLIDES-8a825e_5.jpg?v=1781075914&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL501-SAGE-NOMAD-LEATHER-SLIDES-8a825e_6_720x.jpg?v=1781075914"
        ]
    },
    // Product 8: Moc Toe Suede Walkers
    {
        name: "MOC TOE SUEDE WALKERS",
        description: "Brown moc toe suede walkers. Classic design with premium suede material.",
        price: 10360,
        gender: "men",
        category: "shoes",
        stock: 14,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SH005-BROWN-MOC-TOE-SUEDE-WALKERS-97744c.jpg?v=1779713576&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SH005-BROWN-MOC-TOE-SUEDE-WALKERS-4c2f11_116.jpg?v=1775741697&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SH005-BROWN-MOC-TOE-SUEDE-WALKERS-4c2f11_111_720x.jpg?v=1775716567"
        ]
    },
    // Product 9: Light Everyday Slippers
    {
        name: "LIGHT EVERYDAY SLIPPERS",
        description: "Grey light everyday slippers. Perfect for indoor and casual outdoor wear.",
        price: 3555,
        gender: "men",
        category: "shoes",
        stock: 45,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL017-GREY-LIGHT-EVERYDAY-SLIPPERS-969b94_5.jpg?v=1779192805&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL017-GREY-LIGHT-EVERYDAY-SLIPPERS-969b94_4.jpg?v=1779192805&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26SL017-GREY-LIGHT-EVERYDAY-SLIPPERS-969b94_3_720x.jpg?v=1779192805"
        ]
    },
    // Product 10: Smart Leather Loafers
    {
        name: "SMART LEATHER LOAFERS",
        description: "Dark brown smart leather loafers. Elegant design for formal occasions.",
        price: 8760,
        gender: "men",
        category: "shoes",
        stock: 10,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MFS26LF004-DARK-BROWN-SMART-LEATHER-LOAFER-423c3c_100.jpg?v=1775716515&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26LF004-DARK-BROWN-SMART-LEATHER-LOAFER-211b1b_95.jpg?v=1775716515&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MFS26LF004-BLACK-SMART-LEATHER-LOAFERS-000000_109_720x.jpg?v=1775741571"
        ]
    },
    // Product 11: Dune Textured Safari
    {
        name: "DUNE TEXTURED SAFARI",
        description: "Off white dune textured safari shirt. Premium texture with relaxed fit.",
        price: 8450,
        gender: "men",
        category: "shirts",
        stock: 16,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP511-OFF_WHITE-DUNE-TEXTURED-SAFARI-c1b7b5_5.jpg?v=1781093923&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP511-OFFWHITE-DUNE-TEXTURED-SAFARI-c1b7b5_3.jpg?v=1781089292&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP511-OFF_WHITE-DUNE-TEXTURED-SAFARI-c1b7b5_3_720x.jpg?v=1781093923"
        ]
    },
    // Product 12: Embroidered Dobby Shirt
    {
        name: "EMBROIDERED DOBBY SHIRT",
        description: "Black embroidered dobby shirt with intricate pattern. Premium quality fabric.",
        price: 6450,
        gender: "men",
        category: "shirts",
        stock: 20,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP090-BLACK-EMBROIDERED-DOBBY-SHIRT-000000_3.jpg?v=1781075790&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP090-BLACK-EMBROIDERED-DOBBY-SHIRT-000000_2_e0c862e9-e5d3-48dc-8204-65561d0dd6f7.jpg?v=1781087934&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP090-BLACK-EMBROIDERED-DOBBY-SHIRT-000000_1_720x.jpg?v=1781075790"
        ]
    },
    // Product 13: Pique Polo Shirt
    {
        name: "PIQUE POLO SHIRT",
        description: "Black pique polo shirt. Classic design with comfortable pique fabric.",
        price: 3270,
        gender: "men",
        category: "shirts",
        stock: 35,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP221-BLACK-000000_2.jpg?v=1771682329&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP221-BLACK-PIQUE-POLO-SHIRT-000000_654.jpg?v=1771682329&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP221-BLACK-000000_1_720x.jpg?v=1771682329"
        ]
    },
    // Product 14: Baggy Pleated Pants
    {
        name: "BAGGY PLEATED PANTS",
        description: "Beige baggy pleated pants. Comfortable relaxed fit with pleated design.",
        price: 7155,
        gender: "men",
        category: "pants",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT008-BEIGE-BAGGY-PLEATED-PANTS-968162_2.jpg?v=1778678340&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT008-BEIGE-BAGGY-PLEATED-PANTS-968162_2_fc79c47a-d5f1-413a-b530-f0a1999bfa9b.jpg?v=1778735317&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT008-BEIGE-BAGGY-PLEATED-PANTS-968162_5_720x.jpg?v=1778678340"
        ]
    },
    // Product 15: Relaxed Cotton Pants
    {
        name: "RELAXED COTTON PANTS",
        description: "Beige relaxed cotton pants. Everyday comfort with pure cotton fabric.",
        price: 6360,
        gender: "men",
        category: "pants",
        stock: 22,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT013-BEIGE-RELAXED-COTTON-PANTS-8a6e47_5.jpg?v=1773728919&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT013-BEIGE-RELAXED-COTTON-PANTS-877567_3.jpg?v=1773732628&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26BT013-BEIGE-RELAXED-COTTON-PANTS-8a6e47_6_720x.jpg?v=1773732628"
        ]
    },
    // Product 16: Quarter Placket Shirt - Mouse Grey
    {
        name: "QUARTER PLACKET SHIRT",
        description: "Mouse grey quarter placket shirt. Modern design with unique button detail.",
        price: 4450,
        gender: "men",
        category: "shirts",
        stock: 24,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP065-MOUSEGREY-QUARTER-PLACKET-SHIRT-555146_6.jpg?v=1781075068&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP065-MOUSE-GREY-QUARTER-PLACKET-SHIRT-504c49_4.jpg?v=1781087901&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/preview_images/985d8e50e8614c63b05a1ec17ce0f55b.thumbnail.0000000000_720x.jpg?v=1781177731"
        ]
    },
    // Product 17: Pure Roast Classic Tee
    {
        name: "PURE ROAST CLASSIC TEE",
        description: "White pure roast classic tee. Premium cotton with perfect everyday fit.",
        price: 3950,
        gender: "men",
        category: "shirts",
        stock: 40,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP134-WHITE-PURE-ROAST-CLASSIC-TEE-FFFFFF_4.jpg?v=1781075826&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP134-WHITE-PURE-ROAST-CLASSIC-TEE-FFFFFF_1_0abe5d14-db60-4cc4-a2a5-1999dc5b3474.jpg?v=1781089199&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP134-WHITE-PURE-ROAST-CLASSIC-TEE-FFFFFF_2_720x.jpg?v=1781075826"
        ]
    },
    // Product 18: Basic Solid Tee
    {
        name: "BASIC SOLID TEE",
        description: "Black basic solid tee. Essential wardrobe staple in premium cotton.",
        price: 3450,
        gender: "men",
        category: "shirts",
        stock: 50,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP139-BLACK-BASIC-SOLID-TEE-000000_4.jpg?v=1781075865&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP139-BLACK-BASIC-SOLID-TEE-000000_3.jpg?v=1781075866&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP139-BLACK-BASIC-SOLID-TEE-000000_2_720x.jpg?v=1781075866"
        ]
    },
    // Product 19: Seamless Double-Layered Tee - Brown
    {
        name: "SEAMLESS DOUBLE-LAYERED TEE",
        description: "Brown seamless double-layered tee. Unique design with modern aesthetic.",
        price: 3950,
        gender: "men",
        category: "shirts",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP136-BROWN-SEAMLESS-DOUBLE-LAYERED-TEE-38251e_7.jpg?v=1781075843&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP136-BROWN-SEAMLESS-DOUBLELAYERED-TEE-8f8377_4.jpg?v=1781089247&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MAS26TP136-BROWN-SEAMLESS-DOUBLE-LAYERED-TEE-38251e_6_720x.jpg?v=1781075843"
        ]
    },

    // ==================== WOMEN PRODUCTS ====================
    // Product 20: Everyday Linen Blend Shirt
    {
        name: "EVERYDAY LINEN BLEND SHIRT",
        description: "Sky blue everyday linen blend shirt. Breathable and comfortable for daily wear.",
        price: 5950,
        gender: "women",
        category: "shirts",
        stock: 28,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP254-SKYBLUE-EVERYDAY-LINEN-BLEND-SHIRT-a8bac4_7.jpg?v=1781077071&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP254-SKYBLUE-EVERYDAY-LINEN-BLEND-SHIRT-a8bac4_9.jpg?v=1781077071&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP254-SKYBLUE-EVERYDAY-LINEN-BLEND-SHIRT-b2b9cc_3_720x.jpg?v=1781090030"
        ]
    },
    // Product 21: Island Love Tee
    {
        name: "ISLAND LOVE TEE",
        description: "Off white island love tee. Casual and stylish with a fun tropical vibe.",
        price: 3950,
        gender: "women",
        category: "shirts",
        stock: 35,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP550-OFF_WHITE-ISLAND-LOVE-TEE-e0e3e8_6.jpg?v=1781094187&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP550-OFFWHITE-ISLAND-LOVE-TEE-e0e3e8_5.jpg?v=1781090233&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP550-OFF_WHITE-ISLAND-LOVE-TEE-e0e3e8_11_720x.jpg?v=1781094187"
        ]
    },
    // Product 22: Asymmetric Crinkle Skirt
    {
        name: "ASYMMETRIC CRINKLE SKIRT",
        description: "Burgundy asymmetric crinkle skirt. Elegant design with unique texture.",
        price: 6950,
        gender: "women",
        category: "pants",
        stock: 15,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT103-BURGUNDY-ASYMMETRIC-CRINKLE-SKIRT-b8c6cf_14.jpg?v=1781075447&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT103-BURGUNDY-ASYMMETRIC-CRINKLE-SKIRT-621e2b_2.jpg?v=1781089782&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT103-BURGUNDY-ASYMMETRIC-CRINKLE-SKIRT-b8c6cf_15_720x.jpg?v=1781075447"
        ]
    },
    // Product 23: Garden Kaleidoscope Blouse
    {
        name: "GARDEN KALEIDOSCOPE BLOUSE",
        description: "Beige garden kaleidoscope blouse. Beautiful floral pattern with elegant fit.",
        price: 5450,
        gender: "women",
        category: "shirts",
        stock: 20,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP183-BEIGE-GARDEN-KALEIDOSCOPE-BLOUSE-7c5d41_2.jpg?v=1781093988&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP183-BEIGE-GARDEN-KALEIDOSCOPE-BLOUSE-8f6453_2.jpg?v=1781089984&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP183-BEIGE-GARDEN-KALEIDOSCOPE-BLOUSE-7c5d41_5_720x.jpg?v=1781093988"
        ]
    },
    // Product 24: Tailored Wide Pants
    {
        name: "TAILORED WIDE PANTS",
        description: "Ivory tailored wide pants. Professional yet comfortable fit for any occasion.",
        price: 6950,
        gender: "women",
        category: "pants",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT107-IVORY-TAILORED-WIDE-PANTS-cdc8c4_9.jpg?v=1781076349&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT107-IVORY-TAILORED-WIDE-PANTS-d9d4d1_3.jpg?v=1781086971&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT107-IVORY-TAILORED-WIDE-PANTS-cdc8c4_5_720x.jpg?v=1781076349"
        ]
    },
    // Product 25: Capri Woven Slides - Chocolate
    {
        name: "CAPRI WOVEN SLIDES",
        description: "Chocolate capri woven slides. Stylish and comfortable woven design.",
        price: 8450,
        gender: "women",
        category: "shoes",
        stock: 25,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SD503-CHOCOLATE-CAPRI-WOVEN-SLIDES-463933_9.jpg?v=1781077215&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SD503-CHOCOLATE-CAPRI-WOVEN-SLIDES-463933_10.jpg?v=1781077214&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SD503-CHOCOLATE-CAPRI-WOVEN-SLIDES-463933_7_720x.jpg?v=1781077214"
        ]
    },
    // Product 26: City Block Heels
    {
        name: "CITY BLOCK HEELS",
        description: "Tan city block heels. Perfect for office or evening wear with block heel comfort.",
        price: 6950,
        gender: "women",
        category: "shoes",
        stock: 12,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WFS26HL037-TAN-PLATFORMBLOCKHEELS-a06448-14.jpg?v=1780917169&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26HL037-TAN-PLATFORMBLOCKHEELS-a06448-13.jpg?v=1780917169&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26HL037-TAN-PLATFORMBLOCKHEELS-a06448-12_45861632-284f-4301-97ea-d9296b75cd21_720x.jpg?v=1780917169"
        ]
    },
    // Product 27: Street Sneakerina
    {
        name: "STREET SNEAKERINA",
        description: "Sand street sneakerina. Casual sneaker-style comfort with elegant design.",
        price: 8950,
        gender: "women",
        category: "shoes",
        stock: 20,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SK005-SAND-SUMMERSUEDESNEAKERINA-bcafa7-34.jpg?v=1780916266&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SK005-SAND-SUMMERSUEDESNEAKERINA-bcafa7-35.jpg?v=1780916266&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SK005-SAND-SUMMERSUEDESNEAKERINA-bcafa7-32_720x.jpg?v=1780916266"
        ]
    },
    // Product 28: Studio Flip Heels
    {
        name: "STUDIO FLIP HEELS",
        description: "Sand studio flip heels. Comfortable flip-style heels for casual elegance.",
        price: 5950,
        gender: "women",
        category: "shoes",
        stock: 22,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WFS26HL038-SAND-ROUNDTOEFLIPFLOPS-9e7d6e-18.jpg?v=1780916208&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26HL038-SAND-ROUND_TOE_FLIP_FLOPS-9e7d6e_-16.jpg?v=1780917022&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26HL038-SAND-ROUNDTOEFLIPFLOPS-9e7d6e-19_720x.jpg?v=1780916207"
        ]
    },
    // Product 29: Santorini Woven Slides
    {
        name: "SANTORINI WOVEN SLIDES",
        description: "Tan santorini woven slides. Mediterranean-inspired woven design.",
        price: 6950,
        gender: "women",
        category: "shoes",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SL506-TAN-SANTORINI-WOVEN-SLIDES-a5795e_5.jpg?v=1781077243&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SL506-TAN-SANTORINI-WOVEN-SLIDES-a5795e_6.jpg?v=1781077243&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SL506-TAN-SANTORINI-WOVEN-SLIDES-a5795e_9_720x.jpg?v=1781077244"
        ]
    },
    // Product 30: Banana Road Opener Tee
    {
        name: "BANANA ROAD OPENER TEE",
        description: "White banana road opener tee. Fun graphic tee with playful design.",
        price: 3950,
        gender: "women",
        category: "shirts",
        stock: 30,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP542-WHITE-BANANA-ROAD-OPENER-TEE-FFFFFF_8.jpg?v=1781094039&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP542-WHITE-BANANA-ROAD-OPENER-TEE-FFFFFF_3.jpg?v=1781090159&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP542-WHITE-BANANA-ROAD-OPENER-TEE-FFFFFF_7_720x.jpg?v=1781094039"
        ]
    },
    // Product 31: Capri Woven Slides - Off White
    {
        name: "CAPRI WOVEN SLIDES",
        description: "Off white capri woven slides. Elegant neutral slides for summer.",
        price: 8450,
        gender: "women",
        category: "shoes",
        stock: 16,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SD503-OFFWHITE-CAPRI-WOVEN-SLIDES-d7cebf_8.jpg?v=1781077199&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SD503-OFFWHITE-CAPRI-WOVEN-SLIDES-d7cebf_11.jpg?v=1781077198&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WFS26SD503-OFFWHITE-CAPRI-WOVEN-SLIDES-d7cebf_6_720x.jpg?v=1781077198"
        ]
    },
    // Product 32: Crab & Fern Tee
    {
        name: "CRAB & FERN TEE",
        description: "White crab & fern tee. Nature-inspired graphic tee for casual days.",
        price: 3950,
        gender: "women",
        category: "shirts",
        stock: 28,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP541-WHITE-CRAB-_-FERN-TEE-FFFFFF_8.jpg?v=1781094026&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP541-WHITE-CRAB-_-FERN-TEE-FFFFFF_4.jpg?v=1781090136&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP541-WHITE-CRAB-_-FERN-TEE-FFFFFF_4_555b5cba-7656-46c9-9a7f-fbef8058ce5a_720x.jpg?v=1781094026"
        ]
    },
    // Product 33: Summer Stamp Tee
    {
        name: "SUMMER STAMP TEE",
        description: "Off white summer stamp tee. Vintage-inspired summer graphic tee.",
        price: 3950,
        gender: "women",
        category: "shirts",
        stock: 32,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP549-OFF_WHITE-SUMMER-STAMP-TEE-e0e3e8_4.jpg?v=1781094089&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP549-OFFWHITE-SUMMER-STAMP-TEE-e0e3e8_3.jpg?v=1781090214&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP549-OFF_WHITE-SUMMER-STAMP-TEE-e0e3e8_9_720x.jpg?v=1781094089"
        ]
    },
    // Product 34: Baron Button Down Shirt
    {
        name: "BARON BUTTON DOWN SHIRT",
        description: "Brown baron button down shirt. Classic button-down with modern fit.",
        price: 7450,
        gender: "women",
        category: "shirts",
        stock: 14,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP061-BROWN-BARON-BUTTON-DOWN-SHIRT-7c6965_9.jpg?v=1781077001&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP061-BROWN-BARON-BUTTON-DOWN-SHIRT-3b3537_3.jpg?v=1781088035&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP061-BROWN-BARON-BUTTON-DOWN-SHIRT-7c6965_7_720x.jpg?v=1781077001"
        ]
    },
    // Product 35: V Collared Shirt - Oat White
    {
        name: "V COLLARED SHIRT",
        description: "Oat white v collared shirt. Elegant V-neck collar design for sophisticated look.",
        price: 7450,
        gender: "women",
        category: "shirts",
        stock: 12,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP037-OAT-WHITE-V-COLLARED-SHIRT-b4a38f_7.jpg?v=1781094417&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP037-OAT-WHITE-V-COLLARED-SHIRT-cdc5ba_2_90a4fd2a-479e-46d0-a6d0-d603a24777bd.jpg?v=1781176545&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/preview_images/89188d56e8564c2095f73c678814b8d9.thumbnail.0000000000_720x.jpg?v=1781177732"
        ]
    },
    // Product 36: V Collared Shirt - Black
    {
        name: "V COLLARED SHIRT",
        description: "Black v collared shirt. Classic black with elegant V-neck collar.",
        price: 7450,
        gender: "women",
        category: "shirts",
        stock: 16,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP037-BLACK-V-COLLARED-SHIRT-000000_3.jpg?v=1781076492&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP037-BLACK-V-COLLARED-SHIRT-000000_1_f1a66e45-d187-4c5e-93bd-93d1b72c24f2.jpg?v=1781087386&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP037-BLACK-V-COLLARED-SHIRT-000000_5_720x.jpg?v=1781076492"
        ]
    },
    // Product 37: Pleated Waist Tee - Black
    {
        name: "PLEATED WAIST TEE",
        description: "Black pleated waist tee. Flattering pleated waist design for elegant silhouette.",
        price: 5950,
        gender: "women",
        category: "shirts",
        stock: 22,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP038-BLACK-PLEATED-WAIST-TEE-000000_4.jpg?v=1781076584&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP038-BLACK-PLEATED-WAIST-TEE-000000_1_11ed1d6d-c6a0-4eab-9435-64c539f0702d.jpg?v=1781087470&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP038-BLACK-PLEATED-WAIST-TEE-000000_1_720x.jpg?v=1781076584"
        ]
    },
    // Product 38: Pleated Waist Tee - Olive
    {
        name: "PLEATED WAIST TEE",
        description: "Olive pleated waist tee. Earthy olive color with flattering pleated design.",
        price: 5950,
        gender: "women",
        category: "shirts",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP038-OLIVE-PLEATED-WAIST-TEE-2e2c1d_8_b1cc27b9-d5f9-4f58-bb5e-9b6e83807f95.jpg?v=1781094426&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP038-OLIVE-PLEATED-WAIST-TEE-89898b_5_5852b2b1-c1f7-423c-9fd1-2ccb980eebe2.jpg?v=1781094426&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26TP038-OLIVE-PLEATED-WAIST-TEE-2e2c1d_6_b4e32d71-99dd-4136-a7d5-e36e3210899e_720x.jpg?v=1781094426"
        ]
    },
    // Product 39: Buketan Long Pants
    {
        name: "BUKETAN LONG PANTS",
        description: "Blue buketan long pants. Comfortable long pants with unique style.",
        price: 7450,
        gender: "women",
        category: "pants",
        stock: 14,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT052-BLUE-BUKETAN-LONG-PANTS-33548a_6.jpg?v=1781075154&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT052-BLUE-BUKETAN-LONG-PANTS-36446b_2.jpg?v=1781155857&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT052-BLUE-BUKETAN-LONG-PANTS-33548a_4_720x.jpg?v=1781075154"
        ]
    },
    // Product 40: Tapered Slit Pants
    {
        name: "TAPERED SLIT PANTS",
        description: "Black tapered slit pants. Modern tapered fit with stylish slit detail.",
        price: 5950,
        gender: "women",
        category: "pants",
        stock: 20,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT031-BLACK-TAPERED-SLIT-PANTS-000000_2.jpg?v=1781076001&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT031-BLACK-TAPERED-SLIT-PANTS-000000_5.jpg?v=1781076001&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT031-BLACK-TAPERED-SLIT-PANTS-000000_1_be5a73a9-ff89-43cd-91bf-f68c9077dbc4_720x.jpg?v=1781089686"
        ]
    },
    // Product 41: Flowy Wide Pants
    {
        name: "FLOWY WIDE PANTS",
        description: "Wine flowy wide pants. Elegant wide-leg flowy pants for sophisticated look.",
        price: 7450,
        gender: "women",
        category: "pants",
        stock: 12,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT054-WINE-FLOWY-WIDE-PANTS-421212_5_d3369e09-a1d9-4f9b-b566-0d023e162f65.jpg?v=1781075240&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT054-WINE-FLOWY-WIDE-PANTS-41121c_2.jpg?v=1781089735&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT054-WINE-FLOWY-WIDE-PANTS-421212_9_95a7f7b5-9977-47a6-8fb7-652ac9734cff_720x.jpg?v=1781075240"
        ]
    },
    // Product 42: Garden Kaleidoscope Pants
    {
        name: "GARDEN KALEIDOSCOPE PANTS",
        description: "Beige garden kaleidoscope pants. Matching pants with floral kaleidoscope pattern.",
        price: 4950,
        gender: "women",
        category: "pants",
        stock: 16,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT183-BEIGE-GARDEN-KALEIDOSCOPE-PANTS-7c5d41_16.jpg?v=1781093965&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT183-BEIGE-GARDEN-KALEIDOSCOPE-PANTS-8f6453_2.jpg?v=1781087174&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WAS26BT183-BEIGE-GARDEN-KALEIDOSCOPE-PANTS-7c5d41_14_720x.jpg?v=1781093965"
        ]
    },
        // ==================== ACCESSORIES PRODUCTS ====================
    // Product 43: Nice Actually Perfume
    {
        name: "NICE, ACTUALLY",
        description: "Lama summer scent. A fresh and vibrant fragrance perfect for everyday wear.",
        price: 7155,
        gender: "unisex",
        category: "accessories",
        stock: 50,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG504-NICE-ACTUALLY-_3.jpg?v=1780319072&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG504-NICE-ACTUALLY-ab9049_3.jpg?v=1779726453&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG504-NICE-ACTUALLY-_3_720x.jpg?v=1780319072"
        ]
    },
    // Product 44: Saffron 17 Perfume
    {
        name: "SAFFRON 17",
        description: "Bold signature scent with rich saffron notes. Perfect for making a statement.",
        price: 6705,
        gender: "unisex",
        category: "accessories",
        stock: 45,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG007-SAFFRON-b3a189_2_1.jpg?v=1780318984&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG007-SAFFRON-17-_3.jpg?v=1780318498&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG007-SAFFRON-b3a189_2_1_720x.jpg?v=1780318984"
        ]
    },
    // Product 45: Moroccan Jasmine Perfume
    {
        name: "MOROCCAN JASMINE",
        description: "Best day to night floral perfume. Captivating jasmine notes for any occasion.",
        price: 7155,
        gender: "unisex",
        category: "accessories",
        stock: 48,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG503-MAROCCAN-JASMINE-_1.jpg?v=1780319056&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG503-MAROCCAN-JASMINE-_1_720x.jpg?v=1780319056"
        ]
    },
    // Product 46: Bungalow 41 Perfume
    {
        name: "BUNGALOW 41",
        description: "Summer citrus perfume. Refreshing and energizing citrus blend.",
        price: 6705,
        gender: "unisex",
        category: "accessories",
        stock: 52,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG005-BUNGALOW41-6f7571_2_7.jpg?v=1780318941&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26FG005-BUNGALOW41-6f7571_2_7_720x.jpg?v=1780318941"
        ]
    },
    // Product 47: City Shoulder Bag
    {
        name: "CITY SHOULDER BAG",
        description: "Chocolate city shoulder bag. Elegant and practical for daily use.",
        price: 5370,
        gender: "women",
        category: "accessories",
        stock: 25,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WCW25BG018-CHOCOLATE-CITY-SHOULDER-BAG-715349_417.jpg?v=1772008924&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WCW25BG018-CHOCOLATE-CITY-SHOULDER-BAG-715349_415.jpg?v=1772008964&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WCW25BG018-CHOCOLATE-CITY-SHOULDER-BAG-715349_417_720x.jpg?v=1772008924"
        ]
    },
    // Product 48: Garrette Large Tote - Beige
    {
        name: "GARRETTE LARGE TOTE",
        description: "Beige garrette large tote. Spacious and stylish for everyday essentials.",
        price: 10360,
        gender: "women",
        category: "accessories",
        stock: 18,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG011-BEIGE-GARRETTEESSENTIALTOTE-cebfa0_3.jpg?v=1778681897&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG011-BEIGE-GARRETTE-LARGE-TOTE-876d56_287.jpg?v=1778738436&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG011-BEIGE-GARRETTEESSENTIALTOTE-cebfa0_3_720x.jpg?v=1778681897"
        ]
    },
    // Product 49: Garrette Large Tote - Coffee
    {
        name: "GARRETTE LARGE TOTE",
        description: "Coffee garrette large tote. Rich brown tote perfect for work or travel.",
        price: 11655,
        gender: "women",
        category: "accessories",
        stock: 15,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG011-COFFEE-GARRETTEESSENTIALTOTE-a0845d_1.jpg?v=1778681887&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG011-COFFEE-GARRETTEESSENTIALTOTE-a0845d_1_720x.jpg?v=1778681887"
        ]
    },
    // Product 50: Canberra Crossbody
    {
        name: "CANBERRA CROSSBODY",
        description: "Brown canberra crossbody. Compact and versatile crossbody bag.",
        price: 9855,
        gender: "women",
        category: "accessories",
        stock: 22,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG004-BROWN-CANBERRACROSSBODY-381f0b_4.jpg?v=1778681773&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/WCS26BG004-BROWN-CANBERRACROSSBODY-381f0b_4_720x.jpg?v=1778681773"
        ]
    },
    // Product 51: Amalfi Tortoise Black Sunglasses
    {
        name: "AMALFI TORTOISE BLACK",
        description: "Tortoise black sunglasses. Classic design with modern appeal.",
        price: 10755,
        gender: "unisex",
        category: "accessories",
        stock: 30,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS005-TORTOISE-BLACK-AMALFI-TB-000000_46.jpg?v=1776953426&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS005-TORTOISE-BLACK-AMALFI-TB-000000_49.jpg?v=1776953425&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS005-TORTOISE-BLACK-AMALFI-TB-000000_46_720x.jpg?v=1776953426"
        ]
    },
    // Product 52: Sundowner Brown Sunglasses
    {
        name: "SUNDOWNER BROWN",
        description: "Tortoise brown sunglasses. Vintage-inspired frames for timeless style.",
        price: 10755,
        gender: "unisex",
        category: "accessories",
        stock: 28,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS003-TORTOISE-BROWN-SUNDOWN-STAR-TB-32201e_24_b5af0a64-0e44-4eaf-81af-16f2d8adae17.jpg?v=1776953386&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS003-TORTOISE-BROWN-SUNDOWN-STAR-TB-32201e_29.jpg?v=1776953386&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS003-TORTOISE-BROWN-SUNDOWN-STAR-TB-32201e_24_b5af0a64-0e44-4eaf-81af-16f2d8adae17_720x.jpg?v=1776953386"
        ]
    },
    // Product 53: Palermo Grey Sunglasses
    {
        name: "PALERMO GREY",
        description: "Grey palermo grey sunglasses. Sleek and modern eyewear.",
        price: 10755,
        gender: "unisex",
        category: "accessories",
        stock: 25,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS002-GREY-6d6f7b_15.jpg?v=1780292310&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS002-GREY-6d6f7b_15_720x.jpg?v=1780292310"
        ]
    },
    // Product 54: Havana Speckled Brown Sunglasses
    {
        name: "HAVANA SPECKLED BROWN",
        description: "Leopard brown havana speckled brown. Unique patterned frames.",
        price: 9855,
        gender: "unisex",
        category: "accessories",
        stock: 22,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS004-LEOPARD-BROWN-HAVANA-CLUB-BR-eb5522_26.jpg?v=1776953411&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/UCS26GS004-LEOPARD-BROWN-HAVANA-CLUB-BR-eb5522_26_720x.jpg?v=1776953411"
        ]
    },
    // Product 55: Leatherette Belts - Multi
    {
        name: "LEATHERETTE BELTS",
        description: "Multi leatherette belts. Set of versatile belts for any outfit.",
        price: 3105,
        gender: "unisex",
        category: "accessories",
        stock: 60,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/leatherette-belts-lama-retail-1_copy.jpg?v=1757483416&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/leatherette-belts-lama-retail-2_copy.jpg?v=1757483416&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/leatherette-belts-lama-retail-1_copy_720x.jpg?v=1757483416"
        ]
    },
    // Product 56: Slim Woven Belt - Black
    {
        name: "SLIM WOVEN BELT",
        description: "Black slim woven belt. Elegant woven design for casual and formal wear.",
        price: 2655,
        gender: "unisex",
        category: "accessories",
        stock: 55,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/products/slim-woven-belt-lama-retail_a1ffe23e-62f7-473d-a62b-822ee49ed118.jpg?v=1756959997&width=1080",
            "https://pk.lamaretail.com/cdn/shop/products/slim-woven-belt-lama-retail_a1ffe23e-62f7-473d-a62b-822ee49ed118_720x.jpg?v=1756959997"
        ]
    },
    // Product 57: Slim Woven Belt - Coffee
    {
        name: "SLIM WOVEN BELT",
        description: "Coffee slim woven belt. Rich brown woven belt for everyday style.",
        price: 2655,
        gender: "unisex",
        category: "accessories",
        stock: 50,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/products/STFMBL0004-SLIM-WOVEN-BELT-COFFEE.jpg?v=1775038809&width=1080",
            "https://pk.lamaretail.com/cdn/shop/products/STFMBL0004-SLIM-WOVEN-BELT-COFFEE_720x.jpg?v=1775038809"
        ]
    },
    // Product 58: Two Tone Belt
    {
        name: "TWO TONE BELT",
        description: "Black two tone belt. Unique contrast design for versatile styling.",
        price: 2655,
        gender: "unisex",
        category: "accessories",
        stock: 45,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/STFMBL0003-BLACK-TWO-TONE-BELT_8baff51f-d521-4393-a28d-dacefd9f7cfc.jpg?v=1756959904&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/STFMBL0003-BLACK-TWO-TONE-BELT_8baff51f-d521-4393-a28d-dacefd9f7cfc_720x.jpg?v=1756959904"
        ]
    },
    // Product 59: Classic Cap - Black
    {
        name: "CLASSIC CAP",
        description: "Black classic cap. Timeless design for everyday wear.",
        price: 1755,
        gender: "unisex",
        category: "accessories",
        stock: 75,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/classic-cap-lama-retail-1.jpg?v=1762889817&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/classic-cap-lama-retail-1_720x.jpg?v=1762889817"
        ]
    },
    // Product 60: Classic Cap - Pink
    {
        name: "CLASSIC CAP",
        description: "Pink classic cap. Soft pink cap for a casual chic look.",
        price: 1755,
        gender: "unisex",
        category: "accessories",
        stock: 70,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/classic-cap-lama-retail-1_7f6d0086-ea9c-44d6-94aa-1275f68ec6a6.webp?v=1762890145&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/classic-cap-lama-retail-1_7f6d0086-ea9c-44d6-94aa-1275f68ec6a6_720x.webp?v=1762890145"
        ]
    },
    // Product 61: Varsity Cotton Cap
    {
        name: "VARSITY COTTON CAP",
        description: "Red varsity cotton cap. Sporty and stylish cotton cap.",
        price: 3555,
        gender: "unisex",
        category: "accessories",
        stock: 40,
        imageURL: [
            "https://pk.lamaretail.com/cdn/shop/files/MCW25HG001-RED-VARSITY-COTTON-CAP-9c1d32_1.jpg?v=1762888517&width=1080",
            "https://pk.lamaretail.com/cdn/shop/files/MCW25HG001-RED-VARSITY-COTTON-CAP-9c1d32_2.jpg?v=1762888517&width=1000",
            "https://pk.lamaretail.com/cdn/shop/files/MCW25HG001-RED-VARSITY-COTTON-CAP-9c1d32_1_720x.jpg?v=1762888517"
        ]
    },    // ==================== KIDS PRODUCTS (Boys - Minnie Minors) ====================
    // Product 62: Polo T-Shirt Yellow
    {
        name: "POLO T-SHIRT",
        description: "Yellow polo t-shirt for boys. Perfect casual wear with comfortable fit.",
        price: 1603,
        gender: "kids",
        category: "shirts",
        stock: 40,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBPOLO-37_1.jpg?v=1770704282&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBPOLO-37_2.jpg?v=1770704282&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBPOLO-37_3.jpg?v=1770704282&width=1728"
        ]
    },
    // Product 63: Contrast Collar Polo T-Shirt Navy
    {
        name: "CONTRAST COLLAR POLO T-SHIRT",
        description: "Navy contrast collar polo t-shirt. Stylish design for young boys.",
        price: 1374,
        gender: "kids",
        category: "shirts",
        stock: 45,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBPOLO-36_1.jpg?v=1770031880&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBPOLO-36_2.jpg?v=1770031880&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBPOLO-36_3.jpg?v=1770031880&width=1728"
        ]
    },
    // Product 64: T-Shirt White Indigo
    {
        name: "T-SHIRT",
        description: "White and indigo t-shirt for boys. Comfortable cotton fabric.",
        price: 833,
        gender: "kids",
        category: "shirts",
        stock: 60,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBBR-23_1.jpg?v=1770025991&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBBR-23_2.jpg?v=1770025991&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBBR-23_3.jpg?v=1770025991&width=1728"
        ]
    },
    // Product 65: Play Station Controller Graphic T-Shirt
    {
        name: "PLAY STATION CONTROLLER GRAPHIC T-SHIRT",
        description: "Sky blue graphic t-shirt with play station controller design.",
        price: 1183,
        gender: "kids",
        category: "shirts",
        stock: 35,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-115_1.jpg?v=1770013551&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-115_2.jpg?v=1770013551&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-115_3.jpg?v=1770013551&width=1728"
        ]
    },
    // Product 66: Athletic T-Shirt Navy
    {
        name: "ATHLETIC T-SHIRT",
        description: "Navy athletic t-shirt for active boys. Sporty and comfortable.",
        price: 1113,
        gender: "kids",
        category: "shirts",
        stock: 50,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-154_1.jpg?v=1770027342&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-154_2.jpg?v=1770027342&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-154_3.jpg?v=1770027342&width=1728"
        ]
    },
    // Product 67: T-Shirt Maroon Navy
    {
        name: "T-SHIRT",
        description: "Maroon and navy t-shirt. Perfect combination for casual wear.",
        price: 833,
        gender: "kids",
        category: "shirts",
        stock: 55,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBBR-22_1.jpg?v=1769513512&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBBR-22_2.jpg?v=1769513512&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBBR-22_3.jpg?v=1769513512&width=1728"
        ]
    },
    // Product 68: T-Shirt Maroon
    {
        name: "T-SHIRT",
        description: "Maroon t-shirt for boys. Soft and breathable fabric.",
        price: 654,
        gender: "kids",
        category: "shirts",
        stock: 70,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-044_1.jpg?v=1769587489&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-044_2.jpg?v=1769587489&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-044_3.jpg?v=1769587489&width=1728"
        ]
    },
    // Product 69: T-Shirt White
    {
        name: "T-SHIRT",
        description: "White t-shirt for boys. Classic essential for every wardrobe.",
        price: 763,
        gender: "kids",
        category: "shirts",
        stock: 65,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-043_1.jpg?v=1769586212&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-043_2.jpg?v=1769586212&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-043_3.jpg?v=1769586212&width=1728"
        ]
    },
    // Product 70: T-Shirt Multi
    {
        name: "T-SHIRT",
        description: "Multi-color t-shirt for boys. Vibrant and fun design.",
        price: 833,
        gender: "kids",
        category: "shirts",
        stock: 50,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-050_1.jpg?v=1769581425&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-050_2.jpg?v=1769581425&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-050_3.jpg?v=1769581425&width=1728"
        ]
    },
    // Product 71: T-Shirt Black
    {
        name: "T-SHIRT",
        description: "Black t-shirt for boys. Versatile and easy to style.",
        price: 763,
        gender: "kids",
        category: "shirts",
        stock: 60,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-042_1.jpg?v=1769582695&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-042_2.jpg?v=1769582695&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBTB-042_3.jpg?v=1769582695&width=1728"
        ]
    },
    // Product 72: Athletic T-Shirt Pale Lilac
    {
        name: "ATHLETIC T-SHIRT",
        description: "Pale lilac athletic t-shirt. Perfect for sports and active play.",
        price: 1113,
        gender: "kids",
        category: "shirts",
        stock: 40,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/SW-GJT-078_1.jpg?v=1771311627&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-GJT-078_2.jpg?v=1771311627&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-GJT-078_3.jpg?v=1771311627&width=1728"
        ]
    },
    // Product 73: Athletic T-Shirt Light Grey
    {
        name: "ATHLETIC T-SHIRT",
        description: "Light grey athletic t-shirt. Comfortable fit for everyday wear.",
        price: 1113,
        gender: "kids",
        category: "shirts",
        stock: 45,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-141_1.jpg?v=1771919526&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-141_2.jpg?v=1771919526&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-141_3.jpg?v=1771919526&width=1728"
        ]
    },
    // Product 74: Athletic T-Shirt Mustard
    {
        name: "ATHLETIC T-SHIRT",
        description: "Mustard yellow athletic t-shirt. Bright and energetic design.",
        price: 1043,
        gender: "kids",
        category: "shirts",
        stock: 38,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-143_1.jpg?v=1771311457&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-143_2.jpg?v=1771311457&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/SW-BKT-143_3.jpg?v=1771311457&width=1728"
        ]
    },
    // Product 75: Graphic T-Shirt With Panel
    {
        name: "GRAPHIC T-SHIRT WITH PANEL",
        description: "Pale khaki graphic t-shirt with unique panel design.",
        price: 1183,
        gender: "kids",
        category: "shirts",
        stock: 32,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-106_1.jpg?v=1771309469&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-106_2.jpg?v=1771309469&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-106_3.jpg?v=1771309469&width=1728"
        ]
    },
    // Product 76: Dino Yarn-Dyed Graphic T-Shirt
    {
        name: "DINO YARN-DYED GRAPHIC T-SHIRT",
        description: "Multi-color dinosaur themed graphic t-shirt. Fun and playful.",
        price: 1074,
        gender: "kids",
        category: "shirts",
        stock: 30,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-107_1.jpg?v=1770705753&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-107_2.jpg?v=1770705753&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBKTJ-107_3.jpg?v=1770705753&width=1728"
        ]
    },
    // Product 77: Boys Woven Check Shirt
    {
        name: "BOYS WOVEN CHECK SHIRT",
        description: "Red check woven shirt for boys. Smart casual look.",
        price: 1295,
        gender: "kids",
        category: "shirts",
        stock: 28,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSWBS-30_1.jpg?v=1756465359&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSWBS-30_2.jpg?v=1756465359&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSWBS-30_3.jpg?v=1756465359&width=1728"
        ]
    },
    // Product 78: Boys Denim
    {
        name: "BOYS DENIM",
        description: "Dark blue denim pants for boys. Durable and stylish.",
        price: 2093,
        gender: "kids",
        category: "pants",
        stock: 35,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBD-41_1.jpg?v=1758616098&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBD-41_2.jpg?v=1758616098&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBD-41_3.jpg?v=1758616098&width=1728"
        ]
    },
    // Product 79: Boys Corduroy Shirt
    {
        name: "BOYS CORDUROY SHIRT",
        description: "Rust color corduroy shirt for boys. Warm and comfortable.",
        price: 1995,
        gender: "kids",
        category: "shirts",
        stock: 25,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSBCS-03_1.jpg?v=1760612302&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBCS-03_2.jpg?v=1760612302&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSBCS-03_3.jpg?v=1760612302&width=1728"
        ]
    },
    // Product 80: Boys Button Down Woven Shirt
    {
        name: "BOYS BUTTON DOWN WOVEN SHIRT",
        description: "Black and white check button down shirt. Formal and stylish.",
        price: 1295,
        gender: "kids",
        category: "shirts",
        stock: 30,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSWBS-32_1.jpg?v=1761133978&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSWBS-32_2.jpg?v=1761133978&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSWBS-32_3.jpg?v=1761133978&width=1728"
        ]
    },
    // Product 81: Zipper Hoodie Mustard
    {
        name: "ZIPPER HOODIE",
        description: "Mustard yellow zipper hoodie for boys. Cozy and trendy.",
        price: 1595,
        gender: "kids",
        category: "shirts",
        stock: 30,
        imageURL: [
            "https://www.minnieminors.com/cdn/shop/files/MSB-HOODZ-05_1.jpg?v=1762510685&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSB-HOODZ-05_2.jpg?v=1762510685&width=1728",
            "https://www.minnieminors.com/cdn/shop/files/MSB-HOODZ-05_3.jpg?v=1762510685&width=1728"
        ]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Product.deleteMany();
        console.log('Deleted existing products');
        await Product.insertMany(products);
        console.log(`${products.length} products inserted successfully!`);
        console.log('Products include:');
        console.log(`- Men: ${products.filter(p => p.gender === 'men').length} products`);
        console.log(`- Women: ${products.filter(p => p.gender === 'women').length} products`);
        process.exit();
    })
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });