function mapValidationMessages(messages) {
    return messages.map(message => ({
      message: message.msg,
      feild: message.path
    }));
}

module.exports = mapValidationMessages;