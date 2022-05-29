const messages: { [key: string]: string } = {
    "auth/email-already-exists": "E-mail already exists",
    "auth/email-already-in-use": "Email is already in use!",
    "auth/invalid-email": "Invalid email",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Wrong password",
    "auth/user-disabled": "User disabled",
    "auth/too-many-requests": "Too many requests!",
    "auth/missing-email": "Please provide an email!",
    "auth/internal-error": "Something went wrong",
    "auth/phone-number-already-exists": "Phone number already exists",
    "auth/user-registered": "Your account has been created",
    "auth/operation-not-allowed": "Signing in is currently disabled.",
    "auth/user-authenticated": "Logged in successfully",
    // firestore
    cancelled: "Cancelled",
    unknown: "something went wrong",
    "invalid-argument": "Invalid argument",
    "deadline-exceeded": "Deadline exceeded",
    "not-found": "Not found",
    "already-exists": "Already exists",
    "permission-denied": "Permission denied",
    "resource-exhausted": "Resource exhausted",
    "failed-precondition": "Failed precondition",
    aborted: "Aborted",
    "out-of-range": "Out of range",
    unimplemented: "Unimplemented",
    internal: "Internal",
    unavailable: "Unavailable",
    "data-loss": "Data loss",
    unauthenticated: "Unauthenticated",
    "all-fields-required": "please provide all the required fields",
};

export default messages;
