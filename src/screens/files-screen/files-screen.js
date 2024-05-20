import { Colors } from "../../assets/colors";
import { CustomCardTile } from "../../components/custom-card-tile/custom-card-tile";
import { customFilesData } from "../../data/custom-files-data";
import { customFilesDirectoryData } from "../../data/custom-files-directory";
import "./files-screen.css";
import { useTranslation } from "react-i18next";

export const FilesScreen = () => {
  const { t } = useTranslation();

  return (
    <div
      className="filesScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <p className="filesTitle">Files</p>
      <div className="filesItemDiv">
        {customFilesData.map((item) => {
          return (
            <CustomCardTile
              icon={item.icon}
              title={t(`${item.title}`)}
              count={item.count}
              backgroundColor={item.backgroundColor}
            />
          );
        })}
      </div>
      <div>
        {customFilesDirectoryData.map((item) => {
          return (
            <div className="filesDirection">
              <img src={item.icon} />
              <p className="filesDirectionTitle">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
