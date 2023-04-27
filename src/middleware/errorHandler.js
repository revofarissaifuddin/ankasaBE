const express = require("express");

const handleErrors = (err, req, res,) => {
    return res.status(500).json({status: "error", message: err.message,
    });
};
module.exports = handleErrors;