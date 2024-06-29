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

export const tableHeaderData = [
  {
    title: "Word",
    dataIndex: "word",
    key: "word",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Translate",
    dataIndex: "translate",
    key: "translate",

  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
  },
];