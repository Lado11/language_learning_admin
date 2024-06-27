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
import { useEffect, useState } from "react";
import { CustomSpin } from "../../components/custom-spin/custom-spin";
import { page0, page6 } from "../../constants/constants";
import { ConstPagiantion } from "../../constants/const-pagination";
import {  filesGetIdThunk, getfilesGetIdResponse } from "../../store/slices/files/get-id-files";

export const CategoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryLoading = useSelector(getCategoryGetLoading);
  const categoryData = useSelector(getCategoryGetData);
  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);

  useEffect(() => {
    // Preload image URLs
    if (categoryData?.data?.list?.length) {
      categoryData.data.list.forEach((item) => {
        fetchImage(item.imageFile);
      });
    }
  }, [categoryData]);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };
  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (categoryImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
      }));
    }
  }, [categoryImageResponse]);

  
  useEffect(() => {
    dispatch(categoryGetThunk(ConstPagiantion(page0, page6)));
  }, [dispatch]);

const categoryUpdate = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <div className="nativeLanguageScreenMainDiv">
      <div>
        <CustomAddNew
          title="Add New Category"
          onClick={() => {
            navigate('/category-create');
          }}
        />
        <p className="category-title">Category</p>
        <div className="category-item-pagination">
          {!categoryData?.data?.list?.length && !categoryLoading ? (
            <CustomNoData />
          ) : (
            <>
              {categoryLoading ? (
                <div className="nativeLanguageScreenMainDiv">
                  <CustomSpin size={64} color="gray" />
                </div>
              ) : (
                <div className="custom-card-item">
                  {categoryData?.data?.list?.map((countryItem, index) => (
                    <div className="pointer" key={index + 1} onClick={() => categoryUpdate(countryItem._id)}>
                      <CustomCardItem icon={imageUrls[countryItem.imageFile]} title={countryItem.name} />
                    </div>
                  ))}
                </div>
              )}
              <div className="category-pagination">
                <CustomPagination length={categoryData?.data?.total} pageLength={page6} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};