import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryGetThunk, getCategoryGetData, getCategoryGetLoading } from '../../store/slices/category/get-category';
import { filesGetIdThunk, getfilesGetIdResponse } from '../../store/slices/files/get-id-files';
import { CustomAddNew, CustomCardItem, CustomNoData, CustomPagination, CustomSpin } from '../../components';
import { ConstPagiantion } from '../../constants/const-pagination';
import { page0, page6 } from '../../constants/constants';
import './category-screen.css';

export const CategoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryLoading = useSelector(getCategoryGetLoading);
  const categoryData = useSelector(getCategoryGetData);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    dispatch(categoryGetThunk(ConstPagiantion(page0, page6)));
  }, [dispatch]);

  useEffect(() => {
    // Preload image URLs
    if (categoryData?.data?.list?.length) {
      categoryData.data.list.forEach((item) => {
        fetchImage(item.imageFile);
      });
    }
  }, [categoryData]);

  const categoryUpdate = (id) => {
    localStorage.setItem('categoryId', id);
    navigate(`/category/${id}`);
  };

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };

  const categoryImageResponse = useSelector(getfilesGetIdResponse);

  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (categoryImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
      }));
    }
  }, [categoryImageResponse]);

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