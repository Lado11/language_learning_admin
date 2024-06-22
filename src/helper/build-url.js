export function buildUrl(base, params) {
    let url = base;
    const queryParams = [];
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
      }
    });
  
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
    return url;
  }