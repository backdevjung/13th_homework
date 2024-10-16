import React from 'react'
import {
    fetchCats,
    Method,
    CatApiParams
} from './apifetch'

const catHeaders: Headers = new Headers();
catHeaders.append('Content-Type', 'application/json');

const catURLParams: URLSearchParams = new URLSearchParams();
catURLParams.append('size', 'med');
catURLParams.append('mime_types', 'jpg');
catURLParams.append('format', 'json');
catURLParams.append('has_breeds', 'true');
catURLParams.append('order', 'RANDOM');
catURLParams.append('page', '0');
catURLParams.append('limit', '1');

const catParams: CatApiParams = {
    method: 'GET',
    path: 'search',
    param: catURLParams,
    headers: catHeaders
}

const CatComponent = () => {
    console.log(fetchCats(catParams));
  return (
    <div>
          {JSON.stringify(fetchCats(catParams))}
    </div>
  )
}

export default CatComponent
