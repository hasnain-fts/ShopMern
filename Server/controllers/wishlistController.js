const Wishlist = require('../models/Wishlist');

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.userId });
        res.json(wishlist || { userId: req.params.userId, items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId, name, price, imageURL, category } = req.body;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [] });
        }

        const alreadyExists = wishlist.items.some(
            item => item.productId.toString() === productId
        );

        if (alreadyExists) {
            return res.json({ message: 'Already in wishlist', wishlist });
        }

        wishlist.items.push({ productId, name, price, imageURL, category });
        await wishlist.save();

        res.json({ message: 'Added to wishlist', wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter(
            item => item.productId.toString() !== productId
        );

        await wishlist.save();
        res.json({ message: 'Removed from wishlist', wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };