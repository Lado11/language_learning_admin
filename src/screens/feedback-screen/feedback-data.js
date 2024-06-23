
import { FeedbackStatus, FeedbackType} from "./feadback-typing"

// Table Header Data
export const columnsFeedback = [
    {
      id: "Feedback",
      title: "Feedback",
    },
    {
      title: "Status",
      id: "Status",
      key: "Status",
    },
    {
      title: "Update Date",
      id: "Update Date",
      key: "Update Date",
    },
    {
      title: "Create Date",
      id: "Create Date",
      key: "Create Date",
    },
];

//Radio Data
export const statusFeadback = [
    {
      _id: 1,
      key: FeedbackStatus.PENDING,
      title: "Pending"
    },
    {
      _id: 2,
      key: FeedbackStatus.RESOLVED,
      title: "Resolved"
    },
    {
      _id: 3,
      key: FeedbackStatus.CANCELED,
      title: "Canceled"
    },
    {
      _id: 4,
      key: FeedbackStatus.All,
      title: "All"
    },
]

export const typeFeadback = [
    {
      _id: 1,
      key: FeedbackType.WORD_MISTAKE,
      title: "Word Mistake"
    },
    {
      _id: 2,
      key:  FeedbackType.APP_ISSUE,
      title: "App Issue"
    },
    {
      _id: 3,
      key:  FeedbackType.GENERAL_FEEDBACK,
      title: "General Feedback"
    },
    {
      _id: 4,
      key:  FeedbackType.All,
      title: "All"
    },
]