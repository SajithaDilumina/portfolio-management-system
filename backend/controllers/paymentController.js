const Payment = require('../models/Payment');
const Reservation = require('../models/Reservation');
// POST method to add a payment
const addPayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        const savedPayment = await newPayment.save();  // Ensure payment is saved and get the saved document with ID

        // Check if reservationId is provided in the request
        if (req.body.reservationId) {
            const reservation = await Reservation.findByIdAndUpdate(
                req.body.reservationId, 
                { $set: { Payment: savedPayment._id } },  // Update the reservation with the new payment ID
                { new: true }  // Return the updated reservation document
            );

            if (!reservation) {
                // If no reservation is found with the given ID, handle as an error
                throw new Error('Reservation not found');
            }
        }

        res.status(201).send({ message: "Payment added successfully!", payment: savedPayment, reservationUpdated: !!req.body.reservationId });
    } catch (error) {
        res.status(400).send({ message: "Failed to add payment", error: error.message });
    }
};


// GET method to retrieve all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('reservationId ServiceProviderId');
        res.status(200).send(payments);
    } catch (error) {
        res.status(500).send({ message: "Failed to get payments", error: error.message });
    }
};

// PATCH method to update payment details
const updatePayment = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedPayment) {
            return res.status(404).send({ message: "Payment not found" });
        }
        res.status(200).send({ message: "Payment updated successfully", payment: updatedPayment });
    } catch (error) {
        res.status(400).send({ message: "Failed to update payment", error: error.message });
    }
};

// DELETE method to remove a payment
const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).send({ message: "Payment not found" });
        }
        res.status(200).send({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(400).send({ message: "Failed to delete payment", error: error.message });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).send({ message: "Payment not found" });
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send({ message: "Failed to get payment details", error: error.message });
    }
};

const generatePaymentReport = async (req, res) => {
    const userId = req.params.userId; // Get the user ID from the request parameters
    try {
        // Fetch payment records for the specified user
        const payments = await Payment.find({ UserId: userId });
        let totalDiscount = 0;
        let totalAmountPaid = 0;

        payments.forEach(payment => {
            const amountPaid = parseFloat(payment.amount);
            const postAmount = parseFloat(payment.postAmount);
            const discount = postAmount - amountPaid;

            totalDiscount += discount; // Sum up all discounts
            totalAmountPaid += amountPaid; // Sum up all amounts paid
        });

        res.json({
            totalDiscount: totalDiscount.toFixed(2),
            totalAmountPaid: totalAmountPaid.toFixed(2),
            count: payments.length,
            payments:payments
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving payment data for user ID: " + userId,
            error: error.message
        });
    }
};
const getPaymentsByUserId = async (req, res) => {
    const { userId } = req.params;  // Extracting userId from request parameters

    try {
        // Querying the database for all payments related to the userId
        const payments = await Payment.find({ UserId: userId }).populate('reservationId ServiceProviderId');

        if (!payments.length) {
            return res.status(404).send({ message: "No payments found for this user." });
        }

        res.status(200).send(payments);
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve payments", error: error.message });
    }
};

const getAdminReportData = async (req, res) => {
    try {
        // Assuming the user details are referenced under 'UserId' and that the user model is correctly setup
        const payments = await Payment.find({})
                                      .populate('reservationId  UserId');

        if (payments.length === 0) {
            return res.status(404).send({ message: "No payments found." });
        }

        // Aggregate payments data by user, including user details in the output
        const userPayments = payments.reduce((acc, payment) => {
            const userId = payment.UserId._id.toString();  // Use _id to get a string representation
            if (!acc[userId]) {
                acc[userId] = {
                    user: payment.UserId, // Include user details
                    totalAmountPaid: 0,
                    totalDiscount: 0,
                    payments: []
                };
            }
            const amountPaid = parseFloat(payment.amount);
            const postAmount = parseFloat(payment.postAmount);
            const discount = postAmount - amountPaid;

            acc[userId].payments.push({
                ...payment._doc,  // Spread the payment document
                discount: discount.toFixed(2)  // Include calculated discount
            });
            acc[userId].totalAmountPaid += amountPaid;
            acc[userId].totalDiscount += discount;

            return acc;
        }, {});

        res.status(200).json(userPayments);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving payment data",
            error: error.message
        });
    }
}


module.exports = {
    addPayment,
    getAllPayments,
    updatePayment,
    deletePayment,
    getPaymentById,
    generatePaymentReport,
    getPaymentsByUserId,
    getAdminReportData
    
};
