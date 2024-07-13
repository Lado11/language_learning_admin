// loadOptions.js

import axios from 'axios';

export async function loadOptions(_search, loadedOptions, { page ,name,categoryName}, dynamic,selected) {
    const LIMIT = 10;
    const token = localStorage.getItem("token");
    const URL = process.env.REACT_APP_BASE_URL;
    const start = page * LIMIT; // Calculate start index for pagination

    try {
        const searchQuery = (name === _search || categoryName === _search) ? '?' : _search != "" ? `?search=${_search}&` : '?';
        const response = await axios.get(
            `${URL}${dynamic}${searchQuery}skip=${start}&limit=${LIMIT}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const options = response.data.data.list.map((item) =>               
            ({
            value: item._id,
            label: item.nameEng ? item.nameEng : item?.name,
            name: item.name,
            image: item?.imageFile,
            nativeLanguages:item?.nativeLanguages,
        }));

        return {
            options: options,
            hasMore: options.length === LIMIT,
            additional: {
                page: page + 1,
            },
        };
    } catch (error) {
        console.error("Error fetching options:", error);
        return {
            options: [],
            hasMore: false,
        };
    }
};
