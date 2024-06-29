export const FeedbackStatus = Object.freeze({
    PENDING: 0,
    RESOLVED: 1,
    CANCELED: 2,
    All:-1
});

export const FeedbackType = Object.freeze({
    WORD_MISTAKE: 0,
    APP_ISSUE: 1,
    GENERAL_FEEDBACK: 2,
    All:-1
  });
  
export const MistakeWordType = Object.freeze({
    WORD: 0,
    TRANSCRIPTION: 1,
    TRANSLATE: 2,
    AUDIO: 3,
    IMAGE: 4,
});