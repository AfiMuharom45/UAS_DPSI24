const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel');

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('book');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('book');
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTransaction = async (req, res) => {
    const { book, member, borrowDate, returnDate } = req.body;

    try {
        const newTransaction = new Transaction({
            book,
            member,
            borrowDate,
            returnDate
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    const { book, member, borrowDate, returnDate } = req.body;

    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.book = book;
        transaction.member = member;
        transaction.borrowDate = borrowDate;
        transaction.returnDate = returnDate;

        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.remove();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
