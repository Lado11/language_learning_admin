import { useNavigate } from "react-router-dom";
import {
  CustomCardItem,
  CustomNoData,
  CustomPagination,
  CustomSelect,
} from "../../components";
import { CustomAddNew } from "../../components/custom-add-new/custom-add-new";
import "./category-screen.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetThunk, getCategoryGetData, getCategoryGetLoading } from "../../store/slices/category/get-category";
import { useEffect } from "react";
import { CustomSpin } from "../../components/custom-spin/custom-spin";

export const CategoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryLoading = useSelector(getCategoryGetLoading);
  const categoryData = useSelector(getCategoryGetData)?.data?.list;
  const data = {
    skip: 0,
    limit: 12,
  };
  const pageLength = 12;


  useEffect(() => {
    dispatch(categoryGetThunk(data));
  }, [])

  const categoryUpdate = (id) => {

    console.log(id,"d");
    localStorage.setItem("categoryId",id,)
    navigate(`/category/${id}`);
  };

  return (
    <div className="nativeLanguageScreenMainDiv">
      <div>
      <CustomAddNew
        title="Add New Category"
        onClick={() => {
          navigate("/category-create");
        }}
      />
      <p className="category-title">Category</p>
      {/* <div className="select-row">
        <CustomSelect title={"Learning Language"} />
        <div className="select-middle">
          <CustomSelect title={"Neative Language"} />
        </div>
        <CustomSelect title={"Category Name"} />
      </div> */}
      {/* <p className="category-table-title">Category</p> */}
      <div className="category-item-pagination">
        {!categoryData?.length && !categoryLoading ? <CustomNoData />:
       <>
       {categoryLoading ? <div className="nativeLanguageScreenMainDiv"> <CustomSpin size={64} color="gray" />
         </div> :
         <div className="custom-card-item">
          {categoryData?.map((countryItem, index) => {
            return (
              <div className="pointer" key={index + 1}  onClick={()=>{
                categoryUpdate(countryItem?._id)
              }}>
                <CustomCardItem
                  icon={countryItem?.imageFile?.path}
                  title={countryItem.name}
                />
              </div>
            );
          })}
        </div>}
        <div className="category-pagination">
          <CustomPagination length={categoryData?.length} pageLength={pageLength}/>
        </div>
       </>
        }
        </div>
      </div>
     
    </div>
  );
};
