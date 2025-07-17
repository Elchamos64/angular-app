const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

async function initializeSequenceGenerator() {
  try {
    const sequence = await Sequence.findOne().exec();

    if (!sequence) {
      throw new Error("No sequence document found.");
    }

    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;

    console.log("Sequence initialized successfully.");

  } catch (err) {
    console.error("Error initializing sequence generator:", err);
  }
}

const SequenceGenerator = {
  async nextId(collectionType) {
    if (sequenceId === null) {
      console.error("Sequence not initialized. Call initializeSequenceGenerator first.");
      return null;
    }

    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        maxDocumentId++;
        updateObject = { maxDocumentId };
        nextId = maxDocumentId;
        break;
      case 'messages':
        maxMessageId++;
        updateObject = { maxMessageId };
        nextId = maxMessageId;
        break;
      case 'contacts':
        maxContactId++;
        updateObject = { maxContactId };
        nextId = maxContactId;
        break;
      default:
        return -1;
    }

    try {
      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }).exec();
      return nextId;
    } catch (err) {
      console.error("Error updating sequence:", err);
      return null;
    }
  }
};

module.exports = {
  SequenceGenerator,
  initializeSequenceGenerator
};
