export enum MOVED_PERMANENTLY_301 {
  movedPermanently = 'movedPermanently',
}

export enum SEE_OTHER_303 {
  seeOther = 'seeOther',
  mediaDownloadRedirect = 'mediaDownloadRedirect',
}

export enum NOT_MODIFIED_304 {
  notModified = 'notModified',
}

export enum TEMPORARY_REDIRECT_307 {
  temporaryRedirect = 'temporaryRedirect',
}

export enum BAD_REQUEST_400 {
  badRequest = 'badRequest',
  badBinaryDomainRequest = 'badBinaryDomainRequest',
  badContent = 'badContent',
  badLockedDomainRequest = 'badLockedDomainRequest',
  corsRequestWithXOrigin = 'corsRequestWithXOrigin',
  endpointConstraintMismatch = 'endpointConstraintMismatch',
  invalid = 'invalid',
  invalidAltValue = 'invalidAltValue',
  invalidHeader = 'invalidHeader',
  invalidParameter = 'invalidParameter',
  invalidQuery = 'invalidQuery',
  keyExpired = 'keyExpired',
  keyInvalid = 'keyInvalid',
  lockedDomainCreationFailure = 'lockedDomainCreationFailure',
  notDownload = 'notDownload',
  notUpload = 'notUpload',
  parseError = 'parseError',
  required = 'required',
  tooManyParts = 'tooManyParts',
  unknownApi = 'unknownApi',
  unsupportedMediaProtocol = 'unsupportedMediaProtocol',
  unsupportedOutputFormat = 'unsupportedOutputFormat',
  wrongUrlForUpload = 'wrongUrlForUpload',
}

export enum UNAUTHORIZED_401 {
  unauthorized = 'unauthorized',
  authError = 'authError',
  expired = 'expired',
  lockedDomainExpired = 'lockedDomainExpired',
  required = 'required',
}

export enum PAYMENT_REQUIRED_402 {
  forbidden = 'forbidden',
  accessNotConfigured = 'accessNotConfigured',
  accountDeleted = 'accountDeleted',
  accountDisabled = 'accountDisabled',
  accountUnverified = 'accountUnverified',
  concurrentLimitExceeded = 'concurrentLimitExceeded',
  dailyLimitExceeded = 'dailyLimitExceeded',
  dailyLimitExceededUnreg = 'dailyLimitExceededUnreg',
  downloadServiceForbidden = 'downloadServiceForbidden',
  insufficientAudience = 'insufficientAudience',
  insufficientAuthorizedParty = 'insufficientAuthorizedParty',
  insufficientPermissions = 'insufficientPermissions',
  limitExceeded = 'limitExceeded',
  lockedDomainForbidden = 'lockedDomainForbidden',
  quotaExceeded = 'quotaExceeded',
  rateLimitExceeded = 'rateLimitExceeded',
  rateLimitExceededUnreg = 'rateLimitExceededUnreg',
  responseTooLarge = 'responseTooLarge',
  servingLimitExceeded = 'servingLimitExceeded',
  sslRequired = 'sslRequired',
  unknownAuth = 'unknownAuth',
  userRateLimitExceeded = 'userRateLimitExceeded',
  userRateLimitExceededUnreg = 'userRateLimitExceededUnreg',
  variableTermExpiredDailyExceeded = 'variableTermExpiredDailyExceeded',
  variableTermLimitExceeded = 'variableTermLimitExceeded',
}

export enum NOT_FOUND_404 {
  notFound = 'notFound',
  unsupportedProtocol = 'unsupportedProtocol',
}

export enum METHOD_NOT_ALLOWED_405 {
  httpMethodNotAllowed = 'httpMethodNotAllowed',
}

export enum CONFLICT_409 {
  conflict = 'conflict',
  duplicate = 'duplicate',
}

export enum GONE_410 {
  deleted = 'deleted',
}

export enum PRECONDITION_FAILED_412 {
  conditionNotMet = 'conditionNotMet',
}

export enum REQUEST_ENTITY_TOO_LARGE_413 {
  backendRequestTooLarge = 'backendRequestTooLarge',
  batchSizeTooLarge = 'batchSizeTooLarge',
  uploadTooLarge = 'uploadTooLarge',
}

export enum REQUESTED_RANGE_NOT_SATISFIABLE_416 {
  requestedRangeNotSatisfiable = 'requestedRangeNotSatisfiable',
}

export enum EXPECTATION_FAILED_417 {
  expectationFailed = 'expectationFailed',
}

export enum PRECONDITION_REQUIRED_428 {
  preconditionRequired = 'preconditionRequired',
}

export enum TOO_MANY_REQUESTS_429 {
  rateLimitExceeded = 'rateLimitExceeded',
}

export enum INTERNAL_SERVER_ERROR_500 {
  internalError = 'internalError',
}

export enum NOT_IMPLEMENTED_501 {
  notImplemented = 'notImplemented',
  unsupportedMethod = 'unsupportedMethod',
}

export enum SERVICE_UNAVAILABLE_503 {
  backendError = 'backendError',
  backendNotConnected = 'backendNotConnected',
  notReady = 'notReady',
}

// https://developers.google.com/webmaster-tools/v1/errors
