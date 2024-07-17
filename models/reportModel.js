const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportType: {
        type: String,
        required: true
    },
    generatedDate: {
        type: Date,
        default: Date.now
    },
    data: {
        type: mongoose.Schema.Types.Mixed
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
