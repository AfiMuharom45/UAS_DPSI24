const Transaction = require('../models/transactionModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateTransactionReport = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('book');

        // Create a document
        const doc = new PDFDocument();
        const reportsDir = path.join(__dirname, '../reports');
        
        // Ensure reports directory exists
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }

        const filePath = path.join(reportsDir, `Transaction_Report_${Date.now()}.pdf`);

        // Pipe the document to a file
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Add document title
        doc.fontSize(18).text('Transaction Report', { align: 'center' });
        doc.moveDown();

        // Add table header
        doc.fontSize(12);
        const tableTop = 100;
        const itemMargin = 30;

        doc.text('Book', 50, tableTop);
        doc.text('Member', 200, tableTop);
        doc.text('Borrow Date', 300, tableTop);
        doc.text('Return Date', 400, tableTop);

        const drawTableLine = (y) => {
            doc.moveTo(50, y)
               .lineTo(550, y)
               .stroke();
        }

        drawTableLine(tableTop + 20);

        let yPosition = tableTop + 30;

        // Add table rows
        transactions.forEach(transaction => {
            doc.text(transaction.book.title, 50, yPosition);
            doc.text(transaction.member, 200, yPosition);
            doc.text(transaction.borrowDate.toDateString(), 300, yPosition);
            doc.text(transaction.returnDate ? transaction.returnDate.toDateString() : 'Not Returned', 400, yPosition);
            drawTableLine(yPosition + itemMargin - 10);
            yPosition += itemMargin;
        });

        // Finalize the document
        doc.end();

        writeStream.on('finish', () => {
            res.sendFile(path.resolve(filePath));
        });

        writeStream.on('error', (err) => {
            res.status(500).send({
                message: "Could not generate the PDF file. " + err,
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
