import userCardIcon from "../assets/images/userCardIcon.svg";
import cardCanceledIcon from "../assets/images/cardCanceledIcon.svg";
import addressCardSolid from "../assets/images/addressCardSolid.svg";
import graphIcon from "../assets/images/graphIcon.svg";
import { Colors } from "../assets/colors/colors";

export const customCardTileData = [
  {
    icon: userCardIcon,
    title: "SUBSCRIPTION",
    count: "",
    backgroundColor: Colors.LIGHT_GREEN,
  },
  {
    icon: cardCanceledIcon,
    title: "CANCELED",
    count: "",
    backgroundColor: Colors.LIGHT_ORANGE,
  },
  {
    icon: addressCardSolid,
    title: "REGISTERED",
    count: "",
    backgroundColor: Colors.LIGHT_BLUE_SECOND,
  },
  {
    icon: graphIcon,
    title: "ACTIVE_USER",
    count: "",
    backgroundColor: Colors.LIGHT_PURPLE,
  },
];
