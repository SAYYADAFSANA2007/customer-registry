const Category = require('../models/Category')

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const category = await Category.create({ name, description })
    res.status(201).json({ message: 'Category created', category })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createCategory, getCategories }