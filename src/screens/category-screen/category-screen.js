import { useNavigate } from "react-router-dom";
import {
  CustomCardItem,
  CustomNoData,
  CustomPagination,
} from "../../components";
import { CustomAddNew } from "../../components/custom-add-new/custom-add-new";
import "./category-screen.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetThunk, getCategoryGetData, getCategoryGetLoading } from "../../store/slices/category/get-category";
import { useEffect } from "react";
import { CustomSpin } from "../../components/custom-spin/custom-spin";
import { page0, page12 } from "../../constants/constants";
import { ConstPagiantion } from "../../constants/const-pagination";
import { filesGetIdThunk, getfilesGetIdResponse } from "../../store/slices/files/get-id-files";

export const CategoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryLoading = useSelector(getCategoryGetLoading);
  const categoryData = useSelector(getCategoryGetData)?.data?.list;
const catgeoryImageResponse = useSelector(getfilesGetIdResponse)
console.log(catgeoryImageResponse,"image resposne");
  useEffect(() => {
    dispatch(categoryGetThunk(ConstPagiantion(page0,page12)));
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
      <div className="category-item-pagination">
        {!categoryData?.length && !categoryLoading ? <CustomNoData />:
       <>
       {categoryLoading ? <div className="nativeLanguageScreenMainDiv"> <CustomSpin size={64} color="gray" />
         </div> :
         <div className="custom-card-item">
          {categoryData?.map((countryItem, index) => {
            // dispatch(filesGetIdThunk(countryItem?.imageFile))
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
          <CustomPagination length={categoryData?.length} pageLength={page12}/>
        </div>
       </>
        }
        </div>
      </div>
     
    </div>
  );
};
