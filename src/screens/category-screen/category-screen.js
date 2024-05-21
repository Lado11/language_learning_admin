import { useNavigate } from "react-router-dom";
import {
  CustomCardItem,
  CustomPagination,
  CustomSelect,
} from "../../components";
import { CustomAddNew } from "../../components/custom-add-new/custom-add-new";
import { countryData } from "../../data/custom-data-table";
import "./category-screen.css";

export const CategoryScreen = () => {
  const navigate = useNavigate();

  const navigateUpdate = () => {
    navigate("/category-update");
  };

  return (
    <div className="nativeLanguageScreenMainDiv">
      <CustomAddNew
        title="Add New Category"
        onClick={() => {
          navigate("/category-create");
        }}
      />
      <p className="category-title">Category</p>
      <div className="select-row">
        <CustomSelect title={"Learning Language"} />
        <div className="select-middle">
          <CustomSelect title={"Neative Language"} />
        </div>
        <CustomSelect title={"Category Name"} />
      </div>
      <p className="category-table-title">Category</p>
      <div className="category-item-pagination">
        <div className="custom-card-item">
          {countryData.map((countryItem,index) => {
            return (
              <div className="pointer" key={index+1}>
                <CustomCardItem
                  icon={countryItem.icon}
                  title={countryItem.title}
                  onClick={navigateUpdate}
                />
              </div>
            );
          })}
        </div>
        <div className="category-pagination">
          <CustomPagination />
        </div>
      </div>
    </div>
  );
};
