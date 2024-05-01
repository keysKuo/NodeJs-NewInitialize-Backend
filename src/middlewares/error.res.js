"use strict";

const StatusCode = {
	FORBIDDEN: 403,
	CONFLICT: 409,
};

const ReasonStatusCode = {
	FORBIDDEN: `Bad request error`,
	CONFLICT: `Conflict error`,
};

class ErrorResponse extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}

class ConflictRequestError extends ErrorResponse {
	constructor(
		message = ReasonStatusCode.CONFLICT,
		code = StatusCode.CONFLICT
	) {
		super(message, code);
	}
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.FORBIDDEN,
        code = StatusCode.FORBIDDEN
    ) {
        super(message, code);
    }
}

module.exports = {
    BadRequestError, ConflictRequestError
}