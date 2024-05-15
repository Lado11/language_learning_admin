import userCardIcon from "../assets/images/userCardIcon.svg";
import cardCanceledIcon from "../assets/images/cardCanceledIcon.svg";
import addressCardSolid from "../assets/images/addressCardSolid.svg";
import graphIcon from "../assets/images/graphIcon.svg";
import { Colors } from "../assets/colors/colors";

export const customCardTileData = [
  {
    icon: userCardIcon,
    title: "SUBSCRIPTION",
    count: 125,
    backgroundColor: Colors.LIGHT_GREEN,
  },
  {
    icon: cardCanceledIcon,
    title: "CANCELED",
    count: 25,
    backgroundColor: Colors.LIGHT_ORANGE,
  },
  {
    icon: addressCardSolid,
    title: "REGISTERED",
    count: 25,
    backgroundColor: Colors.LIGHT_BLUE_SECOND,
  },
  {
    icon: graphIcon,
    title: "ACTIVE_USER",
    count: 35,
    backgroundColor: Colors.LIGHT_PURPLE,
  },
];
