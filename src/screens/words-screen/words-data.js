import { WordsLevel, WordsStatus } from "./words-typing";

export const WordsStatusData = [
    {
        _id: 1,
        key: WordsStatus.ACTIVE,
        title: "Active"
      },
      {
        _id: 2,
        key: WordsStatus.INACTIVE,
        title: "In active"
      },
]
export const WordsLevelData = [
    {
      _id: 1,
      key: WordsLevel.BEGINNER,
      title: "Beginner"
    },
    {
      _id: 2,
      key: WordsLevel.INTERMIDATE,
      title: "Intermediate"
    },
    {
      _id: 3,
      key: WordsLevel.ADVANCED,
      title: "Advanced"
    },
    {
      _id: 4,
      key: WordsLevel.All,
      title: "All"
    },
    ]